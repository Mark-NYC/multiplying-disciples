// Client-side site search, used only by /search/ (src/pages/search/
// index.astro). Fetches the build-time index (/search-index.json),
// builds a MiniSearch instance in memory, and renders plain <li><a>
// results — no custom listbox, no modal. See SEARCH_SYSTEM.md for the
// ranking rules this implements.
import MiniSearch from 'minisearch';

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 150;
const ANALYTICS_DEBOUNCE_MS = 1500;
const INITIAL_RESULTS = 10;
const MAX_RESULTS = 50;
const EXCERPT_RADIUS = 90;

const TYPE_LABEL = { Article: 'Article', Hub: 'Hub', Tool: 'Tool' };

function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/["'’‘“”]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Deterministic tier bonuses on top of MiniSearch's field-boosted
// score, so visible-title matches always outrank body-text matches:
//   exact title  +100 · title prefix +60 · all terms in title +30
//   any term in headings +8 · any term in description +4
function tierBonus(doc, query, queryTerms) {
  const title = normalize(doc.title);
  const q = normalize(query);
  let bonus = 0;
  if (title === q) bonus += 100;
  else if (title.startsWith(q)) bonus += 60;
  else if (queryTerms.length && queryTerms.every((t) => title.includes(t))) bonus += 30;
  const headings = normalize(doc.headings || '');
  const description = normalize(doc.description || '');
  if (queryTerms.some((t) => headings.includes(t))) bonus += 8;
  if (queryTerms.some((t) => description.includes(t))) bonus += 4;
  return bonus;
}

// Wraps every occurrence of the matched terms in <mark>, building DOM
// nodes (never innerHTML with query-derived strings).
function highlightInto(parent, text, terms) {
  if (!terms.length) {
    parent.textContent = text;
    return;
  }
  const pattern = new RegExp(`(${terms.map(escapeRegExp).join('|')})`, 'gi');
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > last) parent.appendChild(document.createTextNode(text.slice(last, match.index)));
    const mark = document.createElement('mark');
    mark.textContent = match[0];
    parent.appendChild(mark);
    last = match.index + match[0].length;
  }
  if (last < text.length) parent.appendChild(document.createTextNode(text.slice(last)));
}

// Prefer the description when it contains a match; otherwise a window
// of body text around the first matched term; otherwise the start of
// the description.
function buildExcerpt(doc, terms) {
  const sources = [doc.description || '', doc.body || ''];
  for (const source of sources) {
    const lower = normalize(source);
    for (const term of terms) {
      const at = lower.indexOf(term);
      if (at === -1) continue;
      if (source === doc.description) return source;
      const start = Math.max(0, at - EXCERPT_RADIUS);
      const end = Math.min(source.length, at + term.length + EXCERPT_RADIUS);
      return (
        (start > 0 ? '…' : '') +
        source.slice(start, end).trim() +
        (end < source.length ? '…' : '')
      );
    }
  }
  return (doc.description || doc.body || '').slice(0, 180);
}

function pushAnalytics(event, detail) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, source_site: 'multiplyingdisciples', ...detail });
}

export function initSiteSearch(els) {
  const { input, clear, status, results, more, empty, none, noneQuery } = els;
  if (!input) return;

  let mini = null;
  let docsById = new Map();
  let indexPromise = null;
  let currentMatches = [];
  let shownCount = INITIAL_RESULTS;
  let debounceTimer = 0;
  let analyticsTimer = 0;

  function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch('/search-index.json')
        .then((res) => {
          if (!res.ok) throw new Error(`search index: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          docsById = new Map(data.docs.map((doc) => [doc.id, doc]));
          mini = new MiniSearch({
            fields: ['title', 'seo_title', 'headings', 'description', 'hub', 'body'],
            storeFields: [],
            searchOptions: {
              boost: { title: 8, seo_title: 2, headings: 4, description: 3, hub: 2, body: 1 },
              prefix: true,
              fuzzy: 0.2,
            },
          });
          mini.addAll(data.docs);
        });
    }
    return indexPromise;
  }

  function setUrl(query) {
    const url = new URL(window.location.href);
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    history.replaceState(history.state, '', url);
  }

  function show(el, visible) {
    if (el) el.hidden = !visible;
  }

  function renderResults(query) {
    results.textContent = '';
    const visible = currentMatches.slice(0, shownCount);

    for (const match of visible) {
      const doc = docsById.get(match.id);
      if (!doc) continue;
      const terms = match.terms || [];

      const li = document.createElement('li');

      const type = document.createElement('p');
      type.className = 'search-result__type';
      type.textContent = TYPE_LABEL[doc.type] + (doc.hub ? ` · ${doc.hub}` : '');
      li.appendChild(type);

      const title = document.createElement('h2');
      title.className = 'search-result__title';
      const link = document.createElement('a');
      link.href = doc.url;
      highlightInto(link, doc.title, terms);
      link.addEventListener('click', () => {
        pushAnalytics('site_search_result_click', {
          search_query: query.slice(0, 100),
          destination_url: doc.url,
        });
      });
      title.appendChild(link);
      li.appendChild(title);

      const excerpt = document.createElement('p');
      excerpt.className = 'search-result__excerpt';
      highlightInto(excerpt, buildExcerpt(doc, terms.map(normalize)), terms);
      li.appendChild(excerpt);

      results.appendChild(li);
    }

    const remaining = currentMatches.length - shownCount;
    if (remaining > 0) {
      more.textContent = `Show ${remaining} more result${remaining === 1 ? '' : 's'}`;
      show(more, true);
    } else {
      show(more, false);
    }
  }

  function runSearch(query, { announce = true } = {}) {
    const trimmed = query.trim();
    show(clear, trimmed.length > 0);

    if (trimmed.length < MIN_QUERY_LENGTH) {
      currentMatches = [];
      results.textContent = '';
      status.textContent = '';
      show(more, false);
      show(none, false);
      show(empty, true);
      return;
    }

    loadIndex()
      .then(() => {
        // AND first for precision; fall back to OR so partial matches
        // still help ("prayer walk" → prayer-walking guide).
        let matches = mini.search(trimmed, { combineWith: 'AND' });
        if (matches.length === 0) matches = mini.search(trimmed, { combineWith: 'OR' });

        const queryTerms = normalize(trimmed).split(' ').filter(Boolean);
        currentMatches = matches
          .map((m) => ({
            ...m,
            finalScore: m.score + tierBonus(docsById.get(m.id) || {}, trimmed, queryTerms),
          }))
          .sort((a, b) => b.finalScore - a.finalScore)
          .slice(0, MAX_RESULTS);

        shownCount = INITIAL_RESULTS;
        show(empty, false);

        if (currentMatches.length === 0) {
          results.textContent = '';
          show(more, false);
          if (noneQuery) noneQuery.textContent = trimmed;
          show(none, true);
          if (announce) status.textContent = 'No results';
        } else {
          show(none, false);
          renderResults(trimmed);
          if (announce) {
            status.textContent = `${currentMatches.length}${currentMatches.length === MAX_RESULTS ? '+' : ''} result${currentMatches.length === 1 ? '' : 's'}`;
          }
        }

        clearTimeout(analyticsTimer);
        analyticsTimer = setTimeout(() => {
          pushAnalytics('site_search', {
            search_query: trimmed.slice(0, 100),
            results_count: currentMatches.length,
          });
        }, ANALYTICS_DEBOUNCE_MS);
      })
      .catch(() => {
        status.textContent = 'Search is unavailable right now.';
      });
  }

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setUrl(input.value.trim());
      runSearch(input.value);
    }, DEBOUNCE_MS);
  });

  // Enter submits the (GET) form; intercept so the page doesn't reload
  // — the URL is already synced. Without JS the form still works as a
  // normal GET to /search/?q=….
  input.form?.addEventListener('submit', (event) => {
    event.preventDefault();
    clearTimeout(debounceTimer);
    setUrl(input.value.trim());
    runSearch(input.value);
  });

  clear?.addEventListener('click', () => {
    input.value = '';
    setUrl('');
    runSearch('');
    input.focus();
  });

  function restoreFromUrl() {
    const q = new URLSearchParams(window.location.search).get('q') || '';
    input.value = q;
    runSearch(q);
  }

  // Initial load, back/forward, and bfcache restores all re-read ?q=.
  window.addEventListener('popstate', restoreFromUrl);
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) restoreFromUrl();
  });

  restoreFromUrl();

  // Start pulling the index as soon as the page is interactive so the
  // first keystroke feels immediate; it's only ever fetched once.
  loadIndex().catch(() => {});

  if (!input.value) input.focus();
}

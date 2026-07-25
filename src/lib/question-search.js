// Client-side "ask a question" typeahead, used by QuestionSearch.astro
// on the /blog/ index and hub pages. A combobox that, on focus/typing,
// drops down the curated fill-in-the-blank questions authored on
// articles — Google-autocomplete style: questions only, no article
// titles and no live full-text matches. Selecting a question
// deep-links to /article/#answer-heading; pressing Enter with nothing
// highlighted falls through to the full /search/ page. Progressive
// enhancement: with JS off the input is a plain search field whose
// form GETs /search/. See SEARCH_SYSTEM.md and the thumbnail/question
// design.

const MIN_QUERY_LENGTH = 2;
const MAX_SUGGESTIONS = 8;
const DEBOUNCE_MS = 120;

function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/["'’‘“”]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function initQuestionSearch({ root, input, listbox, clear, questions }) {
  if (!root || !input || !listbox) return;

  const curated = (questions || []).map((item) => ({ ...item, _n: normalize(item.q) }));
  let options = [];
  let active = -1;

  function close() {
    listbox.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    active = -1;
  }

  function open() {
    if (options.length) {
      listbox.hidden = false;
      input.setAttribute('aria-expanded', 'true');
    } else {
      close();
    }
  }

  function go(href) {
    if (href) window.location.href = href;
  }

  function render(list) {
    options = list;
    listbox.textContent = '';
    active = -1;
    input.removeAttribute('aria-activedescendant');

    list.forEach((opt, index) => {
      const li = document.createElement('li');
      li.id = `${listbox.id}-opt-${index}`;
      li.className = 'qs-option';
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', 'false');

      const label = document.createElement('span');
      label.className = 'qs-option__label';
      label.textContent = opt.label;
      li.appendChild(label);

      // mousedown (not click) so it fires before the input's blur closes
      // the list; preventDefault keeps focus stable during navigation.
      li.addEventListener('mousedown', (event) => {
        event.preventDefault();
        go(opt.href);
      });
      li.addEventListener('mousemove', () => setActive(index));

      listbox.appendChild(li);
    });

    open();
  }

  function setActive(index) {
    const items = Array.from(listbox.children);
    if (active >= 0 && items[active]) items[active].setAttribute('aria-selected', 'false');
    active = index;
    if (active >= 0 && items[active]) {
      items[active].setAttribute('aria-selected', 'true');
      input.setAttribute('aria-activedescendant', items[active].id);
      items[active].scrollIntoView({ block: 'nearest' });
    } else {
      input.removeAttribute('aria-activedescendant');
    }
  }

  function starterSuggestions() {
    return curated.slice(0, MAX_SUGGESTIONS).map((item) => ({ href: item.href, label: item.q }));
  }

  function suggest(query) {
    const n = normalize(query);
    return curated
      .filter((item) => item._n.includes(n))
      .slice(0, MAX_SUGGESTIONS)
      .map((item) => ({ href: item.href, label: item.q }));
  }

  function update() {
    const value = input.value.trim();
    clear.hidden = value.length === 0;
    if (value.length === 0) {
      render(starterSuggestions());
      return;
    }
    if (value.length < MIN_QUERY_LENGTH) {
      close();
      return;
    }
    render(suggest(value));
  }

  let debounce = 0;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(update, DEBOUNCE_MS);
  });

  input.addEventListener('focus', () => {
    update();
  });

  input.addEventListener('keydown', (event) => {
    if (listbox.hidden && event.key === 'ArrowDown') {
      update();
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive(Math.min(active + 1, options.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive(active <= 0 ? options.length - 1 : active - 1);
    } else if (event.key === 'Enter') {
      if (active >= 0 && options[active]) {
        event.preventDefault();
        go(options[active].href);
      }
      // else: let the form submit to /search/?q=… (the no-JS path).
    } else if (event.key === 'Escape') {
      close();
    }
  });

  clear.addEventListener('click', () => {
    input.value = '';
    clear.hidden = true;
    input.focus();
    update();
  });

  document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) close();
  });
}

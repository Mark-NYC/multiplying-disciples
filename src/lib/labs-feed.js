// Single client-side integration point for CoVo Multipliers' public labs
// feed (covo-multipliers/supabase/functions/public-labs — the single
// source of truth for lab data). Every place on this site that shows a
// live lab CTA should import from here rather than re-implementing the
// fetch, the UTM tagging, or the card markup: the homepage's bottom lab
// CTA (src/pages/index.astro) and the blog "Next Live Lab" card
// (src/layouts/ArticleLayout.astro) both use this module.
//
// No lab title, date, description, or URL is ever hardcoded on this site
// — it all comes from this feed, so a new lab published on Covo shows up
// here automatically without an MD deploy.

import { COVO_LABS_FEED_URL, COVO_SUBSCRIBE_FUNCTION_URL } from '../data/site';

// Tracking params for every outbound link to a Covo lab page. `contentTag`
// follows the utm_content convention in ECOSYSTEM_GROWTH_STRATEGY.md
// ("page-slug__cta-level__placement") so lab clicks are attributable back
// to the page/placement that produced them.
function withLabUtm(rawUrl, contentTag) {
  try {
    const url = new URL(rawUrl);
    url.searchParams.set('utm_source', 'multiplyingdisciples');
    url.searchParams.set('utm_medium', 'site_cta');
    url.searchParams.set('utm_campaign', 'labs');
    if (contentTag) url.searchParams.set('utm_content', contentTag);
    return url.toString();
  } catch {
    return rawUrl;
  }
}

async function fetchUpcomingLabs(limit) {
  const url = new URL(COVO_LABS_FEED_URL);
  url.searchParams.set('limit', String(limit));
  const res = await fetch(url);
  if (!res.ok) throw new Error(`public-labs request failed: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data.labs) ? data.labs : [];
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatLabDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function labCardHtml(lab, ctaLabel, contentTag) {
  const seatsLabel = lab.has_availability
    ? `${lab.seats_remaining} seat${lab.seats_remaining === 1 ? '' : 's'} left`
    : 'Full';
  // Prefer the short outcome-based hook; fall back to the longer
  // description for labs that haven't been backfilled with a hook yet.
  const summary = lab.hook || lab.description;
  const description = summary
    ? `<p class="lab-card__description">${escapeHtml(summary)}</p>`
    : '';
  const href = withLabUtm(lab.url, contentTag);
  return `
    <div class="lab-card">
      <p class="lab-card__meta">
        <span class="lab-card__date">${formatLabDate(lab.event_date)}</span>
        <span class="lab-card__badge lab-card__badge--live">
          <span class="lab-card__badge-dot" aria-hidden="true"></span>
          Live Lab
        </span>
        <span class="lab-card__badge">${escapeHtml(seatsLabel)}</span>
      </p>
      <h3 class="lab-card__title">${escapeHtml(lab.title)}</h3>
      ${description}
      <a
        class="button lab-card__cta"
        href="${href}"
        data-ecosystem-cta
        data-cta-level="level_3"
        data-cta-type="covo_lab"
        data-destination-site="covo"
      >${escapeHtml(ctaLabel)}</a>
    </div>
  `;
}

function notifyFormHtml() {
  return `
    <div class="lab-card lab-card--signup">
      <h3 class="lab-card__title">New labs are on the way</h3>
      <p class="lab-card__description">Get notified when the next lab opens.</p>
      <form class="lab-card__form js-labs-notify-form">
        <input
          type="email"
          name="email"
          aria-label="Email address"
          placeholder="you@example.com"
          required
        />
        <button type="submit" class="button">Get notified</button>
      </form>
      <p class="lab-card__status js-labs-notify-status" role="status"></p>
    </div>
  `;
}

function wireNotifyForm(container) {
  const form = container.querySelector('.js-labs-notify-form');
  if (!form) return;
  const status = container.querySelector('.js-labs-notify-status');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = form.querySelector('input[type="email"]').value.trim();
    const button = form.querySelector('button');
    button.disabled = true;
    status.textContent = '';

    try {
      const res = await fetch(COVO_SUBSCRIBE_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          landing_page: window.location.href,
          referrer: document.referrer || null,
          utm_source: 'multiplyingdisciples',
          utm_medium: 'site_cta',
          utm_campaign: 'labs_notify',
        }),
      });
      if (!res.ok) throw new Error('request failed');
      form.hidden = true;
      status.textContent = "You're on the list — we'll email you when the next lab opens.";
    } catch {
      status.textContent = 'Something went wrong. Please try again.';
      button.disabled = false;
    }
  });
}

// Fetches up to `limit` upcoming labs and renders them into `container`
// as `.lab-card` markup, or falls back to a "notify me" card (wired to
// the subscribe-updates function) when none are upcoming or the feed is
// unreachable. `ctaLabel` defaults to "Join This Lab". `contentTag`, if
// given, is stamped onto each lab link as `utm_content` (see withLabUtm).
export async function renderLabsInto(container, limit, ctaLabel = 'Join This Lab', contentTag) {
  try {
    const labs = await fetchUpcomingLabs(limit);
    if (labs.length > 0) {
      container.innerHTML = labs.map((lab) => labCardHtml(lab, ctaLabel, contentTag)).join('');
      return;
    }
  } catch {
    // fall through to the notify-me fallback below
  }
  container.innerHTML = notifyFormHtml();
  wireNotifyForm(container);
}

// --- Featured single-lab card (homepage #ch-practice section) --------
//
// A distinct, larger card for the homepage's one primary conversion
// point — separate markup/classes (.featured-lab-card*) from .lab-card
// above so this section can be redesigned without touching the
// article "Next Live Lab" card, which keeps using labCardHtml().

function featuredLabCardHtml(lab, ctaLabel, contentTag) {
  const isFull = !lab.has_availability;
  const seatsLabel = isFull
    ? 'Full'
    : `${lab.seats_remaining} seat${lab.seats_remaining === 1 ? '' : 's'} left`;
  const summary = lab.hook || lab.description;
  const description = summary
    ? `<p class="featured-lab-card__description">${escapeHtml(summary)}</p>`
    : '';
  const href = withLabUtm(lab.url, contentTag);
  return `
    <div class="featured-lab-card">
      <p class="featured-lab-card__meta">
        <span class="lab-card__date">${formatLabDate(lab.event_date)}</span>
        <span class="lab-card__badge lab-card__badge--live">
          <span class="lab-card__badge-dot" aria-hidden="true"></span>
          Live Lab
        </span>
      </p>
      <p class="featured-lab-card__seats${isFull ? ' featured-lab-card__seats--full' : ''}">${escapeHtml(seatsLabel)}</p>
      <h3 class="featured-lab-card__title">${escapeHtml(lab.title)}</h3>
      ${description}
      <a
        class="button featured-lab-card__cta"
        href="${href}"
        data-ecosystem-cta
        data-cta-level="level_3"
        data-cta-type="covo_lab"
        data-destination-site="covo"
      >${escapeHtml(ctaLabel)}</a>
    </div>
  `;
}

function featuredNotifyFormHtml() {
  return `
    <div class="featured-lab-card featured-lab-card--signup">
      <h3 class="featured-lab-card__title">New labs are on the way</h3>
      <p class="featured-lab-card__description">Get notified when the next lab opens.</p>
      <form class="featured-lab-card__form js-labs-notify-form">
        <input
          type="email"
          name="email"
          aria-label="Email address"
          placeholder="you@example.com"
          required
        />
        <button type="submit" class="button">Get notified</button>
      </form>
      <p class="featured-lab-card__status js-labs-notify-status" role="status"></p>
    </div>
  `;
}

// Fetches the single next upcoming lab and renders it into `container`
// as the large featured card, or falls back to the "notify me" card.
// `contentTag`, if given, is stamped onto the lab link as `utm_content`.
export async function renderFeaturedLabInto(container, contentTag) {
  try {
    const labs = await fetchUpcomingLabs(1);
    if (labs.length > 0) {
      container.innerHTML = featuredLabCardHtml(labs[0], 'Join This Lab', contentTag);
      return;
    }
  } catch {
    // fall through to the notify-me fallback below
  }
  container.innerHTML = featuredNotifyFormHtml();
  wireNotifyForm(container);
}

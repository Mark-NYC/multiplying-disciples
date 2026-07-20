// Single client-side integration point for CoVo Multipliers' public labs
// feed (covo-multipliers/supabase/functions/public-labs — the single
// source of truth for lab data). Every place on this site that shows a
// live lab CTA should import from here rather than re-implementing the
// fetch, the UTM tagging, or the card markup: the homepage's featured
// lab section (src/pages/index.astro) and the end-of-article Lab CTA
// (src/components/article/ArticleCTA.astro) both use this module.
//
// No lab title, date, description, or URL is ever hardcoded on this site
// — it all comes from this feed, so a new lab published on Covo shows up
// here automatically without an MD deploy.

import {
  COVO_LABS_FEED_URL,
  COVO_SUBSCRIBE_FUNCTION_URL,
  COVO_LABS_URL,
  COVO_COMMUNITY_URL,
} from '../data/site';

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

// --- Full on-page registration section (homepage #ch-practice) -------
//
// Rather than a card that links out to CoVo, this renders the lab's
// real details plus CoVo's own reusable signup
// form embedded directly on the page — see
// embeds/lab-registration-widget.js in the covo-multipliers repo, the
// single implementation shared with every CoVo lab landing page. This
// function never re-implements the form, its validation, or the
// registration request; it only fetches which lab to feature and tells
// the widget which event to mount.

const COVO_WIDGET_SCRIPT_URL = 'https://www.covomultipliers.com/embeds/lab-registration-widget.js';
const LAB_TIMEZONE = 'America/New_York';

// Every currently published lab is a free 45-minute session (see
// LAB_PAGE_CLAUDE_TEMPLATE.md's FORMAT field) and the events table has
// no per-lab duration/price columns yet. If those are ever added to the
// public-labs feed, prefer them here instead of the fallback so nothing
// has to change on this end.
function labDurationLabel(lab) {
  return lab.duration_label || '45 minutes';
}
function labPriceLabel(lab) {
  return lab.price_label || 'Free';
}

function formatFullDate(iso) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: LAB_TIMEZONE,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function formatTimeWithZone(iso) {
  try {
    const d = new Date(iso);
    const time = new Intl.DateTimeFormat('en-US', {
      timeZone: LAB_TIMEZONE,
      hour: 'numeric',
      minute: '2-digit',
    }).format(d);
    const zonePart = new Intl.DateTimeFormat('en-US', {
      timeZone: LAB_TIMEZONE,
      timeZoneName: 'short',
    })
      .formatToParts(d)
      .find((p) => p.type === 'timeZoneName');
    return zonePart ? `${time} ${zonePart.value}` : time;
  } catch {
    return iso;
  }
}

function seatsLabel(lab) {
  if (!lab.has_availability) return 'Full';
  return `${lab.seats_remaining} seat${lab.seats_remaining === 1 ? '' : 's'} remaining`;
}

function pushDataLayer(event, detail) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(Object.assign({ event }, detail));
}

function featuredSectionSkeletonHtml() {
  return `
    <div class="featured-lab featured-lab--loading" aria-hidden="true">
      <div class="featured-lab__col featured-lab__col--details">
        <div class="skeleton-line skeleton-line--eyebrow"></div>
        <div class="skeleton-line skeleton-line--title"></div>
        <div class="skeleton-line skeleton-line--text"></div>
        <div class="skeleton-line skeleton-line--eyebrow"></div>
      </div>
      <div class="featured-lab__col featured-lab__col--form">
        <div class="skeleton-line skeleton-line--title"></div>
        <div class="skeleton-line skeleton-line--field"></div>
        <div class="skeleton-line skeleton-line--field"></div>
        <div class="skeleton-line skeleton-line--button"></div>
      </div>
    </div>
  `;
}

function comingSoonHtml() {
  return `
    <div class="featured-lab featured-lab--empty">
      <h3 class="featured-lab__empty-title">New Live Labs Are Coming Soon</h3>
      <p class="featured-lab__empty-copy">Join the list and we&rsquo;ll let you know when registration opens.</p>
      <form class="featured-lab__notify-form js-labs-notify-form">
        <input
          type="email"
          name="email"
          aria-label="Email address"
          placeholder="you@example.com"
          required
        />
        <button type="submit" class="button">Get notified</button>
      </form>
      <p class="featured-lab__notify-status js-labs-notify-status" role="status"></p>
    </div>
  `;
}

function featuredDetailsHtml(lab) {
  const summary = lab.hook || lab.description || '';
  const seatsSpanClass = lab.has_availability ? 'featured-lab__seats' : 'featured-lab__seats featured-lab__seats--full';
  const line1 = [
    escapeHtml(formatTimeWithZone(lab.event_date)),
    escapeHtml(labDurationLabel(lab)),
    escapeHtml(labPriceLabel(lab)),
  ].join(' &middot; ');

  return `
    <div class="featured-lab__col featured-lab__col--details">
      <p class="featured-lab__date">${escapeHtml(formatFullDate(lab.event_date))}</p>
      <h3 class="featured-lab__title">${escapeHtml(lab.title)}</h3>
      ${summary ? `<p class="featured-lab__description">${escapeHtml(summary)}</p>` : ''}
      <p class="featured-lab__metadata">${line1}</p>
      <p class="featured-lab__live-line">
        <span class="featured-lab__live-badge">
          <span class="featured-lab__live-dot" aria-hidden="true"></span>
          Live
        </span>
        <span class="${seatsSpanClass}">${escapeHtml(seatsLabel(lab))}</span>
      </p>
    </div>
  `;
}

function featuredFormHtml(lab) {
  const freeNote = labPriceLabel(lab).toLowerCase() === 'free' ? 'Free' : labPriceLabel(lab);
  return `
    <div class="featured-lab__col featured-lab__col--form">
      <div class="featured-lab__form-card">
        <h3 class="featured-lab__form-heading">Reserve Your Seat</h3>
        <p class="featured-lab__form-invite">Join practitioners from across North America taking real disciple-making steps.</p>

        <div class="featured-lab__widget" id="featured-lab-widget" aria-live="polite"></div>
      </div>
    </div>
  `;
}

// Loads the CoVo registration widget script once and reuses it for
// subsequent mounts (there is only ever one featured lab per page load,
// but this guards against double-invocation).
let widgetScriptPromise = null;
function loadWidgetScript() {
  if (window.CovoLabRegistration) return Promise.resolve();
  if (widgetScriptPromise) return widgetScriptPromise;
  widgetScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = COVO_WIDGET_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load CoVo registration widget'));
    document.head.appendChild(script);
  });
  return widgetScriptPromise;
}

// Fetches the next upcoming lab that still has open seats and renders
// the full on-page registration section (lab details + the real CoVo
// signup form) into `container`. Falls back to a "coming soon" email
// signup when no eligible lab is found. `contentTag`, if given, is
// stamped onto the registration as `utm_content` and onto the "full lab
// details" link.
export async function initFeaturedLabSection(container, contentTag) {
  container.innerHTML = featuredSectionSkeletonHtml();

  let lab = null;
  try {
    // public-labs returns upcoming labs soonest-first but does not
    // filter by availability, so a full or closed lab can be first —
    // fetch a handful and pick the first one that's actually open.
    const labs = await fetchUpcomingLabs(10);
    lab = labs.find((l) => l.has_availability) || null;
  } catch {
    lab = null;
  }

  if (!lab) {
    container.innerHTML = comingSoonHtml();
    wireNotifyForm(container);
    return null;
  }

  container.innerHTML = `<div class="featured-lab">${featuredDetailsHtml(lab)}${featuredFormHtml(lab)}</div>`;
  pushDataLayer('homepage_featured_lab_viewed', { lab_slug: lab.slug });

  const widgetContainer = container.querySelector('#featured-lab-widget');
  try {
    await loadWidgetScript();
    window.CovoLabRegistration.mount(widgetContainer, {
      eventSlug: lab.slug,
      submitLabel: 'Reserve My Seat',
      consentLabel: 'Yes, email me about future labs, resources, and training. Unsubscribe anytime.',
      contentTag: contentTag || 'home__featured-lab__form',
      onEvent(name, detail) {
        if (name === 'registration_started') {
          pushDataLayer('homepage_registration_started', { lab_slug: lab.slug });
        } else if (name === 'registration_completed') {
          pushDataLayer('homepage_registration_completed', { lab_slug: lab.slug });
        } else if (name === 'registration_failed') {
          pushDataLayer('homepage_registration_failed', {
            lab_slug: lab.slug,
            error_message: detail && detail.error,
          });
        }
      },
    });
  } catch {
    widgetContainer.innerHTML = `
      <p class="featured-lab__widget-error">
        The registration form couldn&rsquo;t load. <a href="${escapeHtml(lab.url)}">Register on the lab page instead &rarr;</a>
      </p>
    `;
  }

  return lab;
}

// --- Article CTA lab card (end-of-article CTA system) -----------------
//
// See CTA_GUIDE.md for the
// authoring reference. Used by src/components/article/ArticleCTA.astro
// for `article_cta.type: lab`. Reuses formatFullDate/formatTimeWithZone/
// seatsLabel/withLabUtm/escapeHtml above rather than re-implementing
// date/time/seat formatting a third time.

// Pure selection logic, exported for unit testing independent of the
// network call: excludes past labs, full labs, and any lab explicitly
// marked unavailable/closed/cancelled, then returns the earliest
// remaining one. `public-labs` already returns soonest-first, but this
// re-sorts defensively rather than assuming that ordering holds.
export function selectNextAvailableLab(labs, now = new Date()) {
  const eligible = (labs || []).filter((lab) => {
    if (!lab || !lab.event_date) return false;
    if (new Date(lab.event_date) <= now) return false; // past
    if (lab.has_availability === false) return false; // full / closed / cancelled / unavailable
    if (typeof lab.seats_remaining === 'number' && lab.seats_remaining <= 0) return false;
    const status = (lab.status || '').toLowerCase();
    if (['full', 'closed', 'cancelled', 'canceled', 'unavailable'].includes(status)) return false;
    return true;
  });
  eligible.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
  return eligible[0] || null;
}

function fmLabCardHtml(lab, contentTag) {
  const summary = lab.hook || lab.description || '';
  const href = withLabUtm(lab.url, contentTag);
  return `
    <div class="fm-lab-card">
      <p class="fm-lab-card__meta">
        <span class="fm-lab-card__badge fm-lab-card__badge--live">
          <span class="fm-lab-card__badge-dot" aria-hidden="true"></span>
          Live Lab
        </span>
        <span class="fm-lab-card__badge">${escapeHtml(seatsLabel(lab))}</span>
      </p>
      <p class="fm-lab-card__date">${escapeHtml(formatFullDate(lab.event_date))}</p>
      <p class="fm-lab-card__time">${escapeHtml(formatTimeWithZone(lab.event_date))}</p>
      <h3 class="fm-lab-card__title">${escapeHtml(lab.title)}</h3>
      ${summary ? `<p class="fm-lab-card__description">${escapeHtml(summary)}</p>` : ''}
      <a
        class="button fm-lab-card__cta"
        href="${href}"
        data-ecosystem-cta
        data-cta-level="level_3"
        data-cta-type="covo_lab"
        data-destination-site="covo"
      >View Lab Details</a>
    </div>
  `;
}

// No upcoming lab has an open seat right now — distinct from a fetch
// failure below (this is a confirmed "nothing available", not "we
// don't know"). Per CTA_GUIDE.md, never show a full lab,
// an empty card, or placeholder data here.
function fmAllLabsFullFallbackHtml() {
  return `
    <div class="fm-lab-card fm-lab-card--fallback">
      <h3 class="fm-lab-card__title">The current labs are full.</h3>
      <p class="fm-lab-card__description">New Live Multiplying Labs are added regularly. View the full schedule or join the community to hear when the next lab opens.</p>
      <div class="fm-lab-card__fallback-actions">
        <a class="button" href="${COVO_LABS_URL}" data-ecosystem-cta data-cta-type="covo_labs_all" data-destination-site="covo">View All Labs</a>
        <a class="fm-cta__secondary" href="${COVO_COMMUNITY_URL}" data-ecosystem-cta data-cta-type="covo_community" data-destination-site="covo">Join the Community</a>
      </div>
    </div>
  `;
}

// The public-labs request itself failed (network/outage) — a distinct,
// more restrained state from "confirmed all full" above, since we
// genuinely don't know availability. Never show stale/hard-coded data
// or a fabricated seat count here.
function fmLabsErrorFallbackHtml() {
  return `
    <div class="fm-lab-card fm-lab-card--fallback">
      <h3 class="fm-lab-card__title">See the next Live Lab.</h3>
      <div class="fm-lab-card__fallback-actions">
        <a class="button" href="${COVO_LABS_URL}" data-ecosystem-cta data-cta-type="covo_labs_all" data-destination-site="covo">View All Labs</a>
      </div>
    </div>
  `;
}

// Fetches upcoming labs, picks the earliest one with an open seat via
// selectNextAvailableLab (skipping a full nearest-chronological lab
// rather than showing it — this is the fix for the bug where the
// article CTA displayed a full lab), and renders the result into
// `container`. Falls back to the "all full" state when the feed
// responds but nothing is eligible, or the restrained "data
// unavailable" state when the feed request itself fails.
export async function renderArticleCtaLabInto(container, contentTag) {
  let labs;
  try {
    // Fetch more than 1 — the feed does not filter by availability, so
    // the earliest result can be full while a later one is open.
    labs = await fetchUpcomingLabs(10);
  } catch (err) {
    console.error('public-labs request failed', err);
    container.innerHTML = fmLabsErrorFallbackHtml();
    return;
  }

  const lab = selectNextAvailableLab(labs);
  container.innerHTML = lab ? fmLabCardHtml(lab, contentTag) : fmAllLabsFullFallbackHtml();
}

// Site-wide click tracking for cross-ecosystem CTAs, per the "Event
// Tracking" section of ECOSYSTEM_GROWTH_STRATEGY.md. Uses a single
// delegated listener (bound once from BaseLayout) so it also catches
// lab cards that labs-feed.js injects into the DOM after the initial
// render, without every call site needing to rebind anything.
//
// Any element with data-ecosystem-cta picks up tracking automatically;
// the other data-cta-* attributes map directly onto the event schema
// the strategy doc defines. Every click is (a) pushed onto
// window.dataLayer for any GTM container / future use and (b) forwarded
// straight to GA4 via gtag('event', ...) when analytics is live — so
// ecosystem CTA clicks, the primary "Join a Live Lab" path included,
// are actually measurable in GA4 without needing a GTM container.
// window.gtag only exists when Analytics.astro has a PUBLIC_GA4_ID; with
// no ID the event is still collected harmlessly on dataLayer.
export function initEcosystemTracking() {
  document.addEventListener('click', (event) => {
    const el = event.target.closest('[data-ecosystem-cta]');
    if (!el) return;

    const params = {
      source_site: 'multiplyingdisciples',
      source_page: window.location.pathname,
      source_hub: document.body.dataset.hub || null,
      cta_level: el.dataset.ctaLevel || null,
      cta_type: el.dataset.ctaType || null,
      cta_text: el.textContent.trim(),
      destination_site: el.dataset.destinationSite || null,
      destination_url: el.href || null,
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'ecosystem_cta_click', ...params });

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'ecosystem_cta_click', params);
    }
  });
}

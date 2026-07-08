// Site-wide click tracking for cross-ecosystem CTAs, per the "Event
// Tracking" section of ECOSYSTEM_GROWTH_STRATEGY.md. Uses a single
// delegated listener (bound once from BaseLayout) so it also catches
// lab cards that labs-feed.js injects into the DOM after the initial
// render, without every call site needing to rebind anything.
//
// Any element with data-ecosystem-cta picks up tracking automatically;
// the other data-cta-* attributes map directly onto the event schema
// the strategy doc defines, so this can feed GA4/GTM as soon as either
// is wired up. Until then, window.dataLayer just accumulates the array
// harmlessly.
export function initEcosystemTracking() {
  document.addEventListener('click', (event) => {
    const el = event.target.closest('[data-ecosystem-cta]');
    if (!el) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'ecosystem_cta_click',
      source_site: 'multiplyingdisciples',
      source_page: window.location.pathname,
      source_hub: document.body.dataset.hub || null,
      cta_level: el.dataset.ctaLevel || null,
      cta_type: el.dataset.ctaType || null,
      cta_text: el.textContent.trim(),
      destination_site: el.dataset.destinationSite || null,
      destination_url: el.href || null,
    });
  });
}

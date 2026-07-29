// Shared CTA helpers — the single source of truth for the end-of-article
// CTA's UTM content tag, following the
// "page-slug__cta-level__placement" convention in
// ECOSYSTEM_GROWTH_STRATEGY.md.
//
// Used by both ArticleLayout (the default end-of-article CTA) and
// ArticleCTAInline (the mid-article, in-flow placement). Keeping the
// tag in one place means an inline CTA reports the same
// `<page-slug>__training__article-cta` tag as an end CTA would, so
// moving a CTA up the page never changes how it's tracked.
export function ctaContentTag(slug: string): string {
  return `${slug.replace(/^\/|\/$/g, '')}__training__article-cta`;
}

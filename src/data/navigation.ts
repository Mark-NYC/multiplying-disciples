export interface NavLink {
  label: string;
  href: string;
}

// Primary header navigation. Intentionally short and plain per the
// design direction: this is a library, not a marketing site.
// Points at hub pages (not single articles) now that all 11 hubs are
// published — a hub is a better first landing spot for a topic since it
// scans several key articles plus a clear next step, rather than
// dropping a visitor straight into one article.
export const PRIMARY_NAV: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Disciple Making', href: '/disciple-making/' },
  { label: 'Share the Gospel', href: '/share-the-gospel/' },
  { label: 'Testimony', href: '/testimony/' },
  { label: 'Starter Tools', href: '/starter-tools/' },
  { label: 'Blog', href: '/blog/' },
];

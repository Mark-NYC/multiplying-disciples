export interface NavLink {
  label: string;
  href: string;
}

// Primary header navigation. Intentionally short and plain per the
// design direction: this is a library, not a marketing site.
export const PRIMARY_NAV: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Disciple Making', href: '/disciple-making-resources-for-churches-that-will-multiply/' },
  { label: 'Share the Gospel', href: '/the-three-circles-gospel-presentation-step-by-step/' },
  { label: 'Testimony', href: '/15-second-testimony-examples-ignite-your-faith/' },
  { label: 'Starter Tools', href: '/starter-tools/' },
  { label: 'Blog', href: '/blog/' },
];

export const FOOTER_NAV: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Starter Tools', href: '/starter-tools/' },
  { label: 'Blog', href: '/blog/' },
];

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

// Primary header navigation. Structured to match the live WordPress
// site's shape (Home / Start Here / Starter Tools / Resources dropdown
// / Articles) rather than surfacing every hub as a top-level item —
// the nav should guide a first-time visitor, not expose the full site
// taxonomy. Hub pages that used to be flat top-level links now live
// under the Resources dropdown instead.
export const PRIMARY_NAV: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Start Here', href: '/start-here/' },
  { label: 'Simple Tools', href: '/starter-tools/' },
  {
    label: 'Resources',
    href: '',
    children: [
      { label: 'Disciple Making', href: '/disciple-making/' },
      { label: 'Share the Gospel', href: '/share-the-gospel/' },
      { label: 'Testimonies', href: '/testimony/' },
      { label: 'Stories of Hope', href: '/stories-of-hope/' },
    ],
  },
  { label: 'Articles', href: '/blog/' },
];

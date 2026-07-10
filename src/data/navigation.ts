export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

// Primary header navigation, kept deliberately short: Labs / Tools /
// Articles / About. The nav's job is to move a visitor toward a Live
// Multiplying Lab, not expose the full site taxonomy — every other hub
// and resource page is reachable from Tools, Articles, or in-page links,
// not from the top-level menu.
//
// "Labs" points at the homepage's own lab section (#ch-practice) rather
// than straight to Covo, so every lab-related link on the site funnels
// through that one section — the section's own "View all upcoming labs"
// link is the sole exception that still goes to Covo directly.
export const PRIMARY_NAV: NavLink[] = [
  { label: 'Labs', href: '/#ch-practice' },
  { label: 'Tools', href: '/starter-tools/' },
  { label: 'Articles', href: '/blog/' },
  { label: 'About', href: '/vision/' },
];

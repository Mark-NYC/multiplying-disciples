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

// --- Hamburger menu (see NAVIGATION_MAP.md) --------------------------
// A small set of deeper resources that don't belong in the primary
// nav. Deliberately NOT a sitemap: no Strategy Coordinator, no
// Movement Resources index, no 4 Fields Toolbox, no legal/utility
// pages, no individual articles beyond the named featured resources.
// Every href below is a real, existing route — verify before adding
// ("Commands of Christ" is omitted because no page for it exists on
// this site yet; see NAVIGATION_MAP.md).

export const MENU_FEATURED: NavLink[] = [
  { label: 'Stickers', href: '/stickers/' },
  { label: '7 Stories of Hope', href: '/movement-resources/7-stories-of-hope-complete-facilitation-guide/' },
  { label: 'Kingdom Ministry Training', href: '/kingdom-ministry-training/' },
];

// The strongest topic hubs only (plus the full index) — labels match
// the hubs' real titles in src/content/hubs/.
export const MENU_TOPICS: NavLink[] = [
  { label: 'All Articles', href: '/blog/' },
  { label: 'Share the Gospel', href: '/share-the-gospel/' },
  { label: 'Disciple Making', href: '/disciple-making/' },
  { label: 'Simple Church', href: '/simple-church/' },
  { label: 'Prayer', href: '/prayer/' },
  { label: 'Church Planting Movements', href: '/church-planting-movements/' },
];

export const MENU_CONTACT: NavLink = { label: 'Contact Us', href: '/contact-us/' };

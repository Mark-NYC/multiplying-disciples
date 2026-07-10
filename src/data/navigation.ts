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
import { COVO_LABS_URL } from './site';

export const PRIMARY_NAV: NavLink[] = [
  { label: 'Labs', href: COVO_LABS_URL },
  { label: 'Tools', href: '/starter-tools/' },
  { label: 'Articles', href: '/blog/' },
  { label: 'About', href: '/vision/' },
];

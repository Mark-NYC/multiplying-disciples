// Build-time inline-SVG loader for the napkin tool animations.
//
// The cycling napkin stages animate the *internal* named groups of the
// supplied tool SVGs (e.g. #before-section, #icon-01), which is only
// possible when the SVG markup is inlined into the page — a plain <img>
// can't be targeted. Several of the supplied files reuse the same internal
// ids (master-artwork, title/desc, clip-* ) and class names (.ink/.label),
// so dropping more than one into the same document would collide: <use>
// would resolve to the wrong artwork and .ink stroke widths would leak.
//
// loadInlineSvg() reads a file from public/ and namespaces every internal
// id, id-reference (href / xlink:href / url() / aria-labelledby) and class
// with a per-instance prefix, so any number of these can coexist on one
// page. The original files are never modified — this rewrites a copy of the
// markup at build time only. Named groups stay reachable via an
// [id$="-<name>"] attribute selector (the prefix is prepended, the suffix
// is preserved).
import fs from 'node:fs';
import path from 'node:path';

const cache = new Map();

/**
 * @param {string} src  public-relative path, e.g. "/tools-images/Foo.svg"
 * @param {string} prefix  short unique token, e.g. "s1a"
 * @returns {string} inlined, namespaced SVG markup (or '' if unreadable)
 */
export function loadInlineSvg(src, prefix) {
  const key = `${src}::${prefix}`;
  if (cache.has(key)) return cache.get(key);

  let out = '';
  try {
    const file = path.join(process.cwd(), 'public', src.replace(/^\//, ''));
    let raw = fs.readFileSync(file, 'utf8');
    // Strip any XML prolog / doctype so the markup drops straight into HTML.
    raw = raw.replace(/<\?xml[^>]*\?>/g, '').replace(/<!DOCTYPE[^>]*>/gi, '');

    const pre = (id) => `${prefix}-${id}`;
    out = raw
      .replace(/id="([\w:.-]+)"/g, (_, id) => `id="${pre(id)}"`)
      .replace(/href="#([\w:.-]+)"/g, (_, id) => `href="#${pre(id)}"`)
      .replace(/url\(#([\w:.-]+)\)/g, (_, id) => `url(#${pre(id)})`)
      .replace(
        /aria-labelledby="([^"]+)"/g,
        (_, ids) => `aria-labelledby="${ids.trim().split(/\s+/).map(pre).join(' ')}"`
      )
      .replace(
        /class="([^"]+)"/g,
        (_, cls) => `class="${cls.trim().split(/\s+/).map(pre).join(' ')}"`
      )
      // Class selectors inside the SVG's own <style> block.
      .replace(/\.(ink|label)\b/g, (_, c) => `.${pre(c)}`);
  } catch {
    out = '';
  }
  cache.set(key, out);
  return out;
}

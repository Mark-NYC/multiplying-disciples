// Build-time intrinsic-dimension lookup for images that live in
// public/. Astro's asset pipeline only knows sizes for images imported
// from src/, but this site's entire media library is WordPress-migrated
// files served verbatim from public/wp-content and public/images — so
// components (ArticleHero, ArticleImage, FieldNote, ArticleCTA) and the
// markdown rehype plugin use this to emit real width/height attributes
// and stop article text from reflowing as images load.
//
// Deliberately dependency-free: reads only the few header bytes needed
// for PNG / JPEG / GIF / WebP. Anything unparseable (SVG, remote URLs,
// missing files) returns undefined and the caller simply omits the
// attributes — exactly the behavior the site had before.
import fs from 'node:fs';
import path from 'node:path';

const cache = new Map();

function u16be(buf, off) {
  return (buf[off] << 8) | buf[off + 1];
}

function u16le(buf, off) {
  return buf[off] | (buf[off + 1] << 8);
}

function u24le(buf, off) {
  return buf[off] | (buf[off + 1] << 8) | (buf[off + 2] << 16);
}

function u32be(buf, off) {
  return (buf[off] * 0x1000000) + ((buf[off + 1] << 16) | (buf[off + 2] << 8) | buf[off + 3]);
}

function u32le(buf, off) {
  return (buf[off] | (buf[off + 1] << 8) | (buf[off + 2] << 16)) + buf[off + 3] * 0x1000000;
}

function parsePng(buf) {
  // 8-byte signature, then the IHDR chunk: length(4) + "IHDR"(4) + w(4) + h(4).
  if (buf.length < 24) return undefined;
  return { width: u32be(buf, 16), height: u32be(buf, 20) };
}

function parseGif(buf) {
  if (buf.length < 10) return undefined;
  return { width: u16le(buf, 6), height: u16le(buf, 8) };
}

function parseJpeg(buf) {
  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = buf[i + 1];
    // SOF0–SOF15, excluding DHT (C4), JPG (C8), DAC (CC).
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: u16be(buf, i + 5), width: u16be(buf, i + 7) };
    }
    if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd9)) {
      i += 2;
      continue;
    }
    i += 2 + u16be(buf, i + 2);
  }
  return undefined;
}

function parseWebp(buf) {
  if (buf.length < 30) return undefined;
  const fourCC = buf.toString('ascii', 12, 16);
  if (fourCC === 'VP8X') {
    return { width: u24le(buf, 24) + 1, height: u24le(buf, 27) + 1 };
  }
  if (fourCC === 'VP8 ') {
    return { width: u16le(buf, 26) & 0x3fff, height: u16le(buf, 28) & 0x3fff };
  }
  if (fourCC === 'VP8L' && buf[20] === 0x2f) {
    const bits = u32le(buf, 21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  return undefined;
}

function parse(buf) {
  if (buf.length < 12) return undefined;
  if (buf[0] === 0x89 && buf[1] === 0x50) return parsePng(buf);
  if (buf[0] === 0xff && buf[1] === 0xd8) return parseJpeg(buf);
  if (buf.toString('ascii', 0, 3) === 'GIF') return parseGif(buf);
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    return parseWebp(buf);
  }
  return undefined;
}

/**
 * Returns `{ width, height }` for a site-relative image path served from
 * public/ (e.g. "/wp-content/uploads/2023/05/x.webp"), or undefined for
 * remote URLs, data URIs, SVGs, or anything that can't be read/parsed.
 */
export function imageDimensions(src) {
  if (typeof src !== 'string' || !src.startsWith('/') || src.startsWith('//')) return undefined;
  const clean = src.split(/[?#]/)[0];
  if (cache.has(clean)) return cache.get(clean);
  let dims;
  try {
    const file = path.join(process.cwd(), 'public', decodeURIComponent(clean));
    dims = parse(fs.readFileSync(file));
  } catch {
    dims = undefined;
  }
  cache.set(clean, dims);
  return dims;
}

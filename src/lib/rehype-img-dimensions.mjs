// Rehype plugin: give every markdown image real width/height (from the
// actual file in public/, via image-dimensions.mjs) plus lazy loading
// and async decoding. This is what stops long WordPress-migrated
// articles — whose bodies are plain markdown `![]()` images — from
// reflowing under the reader as each image arrives. Attributes an
// author sets explicitly are never overwritten.
//
// Applies to both .md and .mdx bodies (@astrojs/mdx inherits the
// markdown rehype pipeline). Raw `<img>` HTML embedded inside .md files
// passes through remark as raw nodes and is deliberately untouched.
import { imageDimensions } from './image-dimensions.mjs';

function walk(node, fn) {
  if (!node) return;
  if (node.type === 'element') fn(node);
  const children = node.children;
  if (Array.isArray(children)) {
    for (const child of children) walk(child, fn);
  }
}

export default function rehypeImgDimensions() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.tagName !== 'img') return;
      const props = (node.properties ??= {});
      if (typeof props.src === 'string' && props.width == null && props.height == null) {
        const dims = imageDimensions(props.src);
        if (dims) {
          props.width = dims.width;
          props.height = dims.height;
        }
      }
      if (props.loading == null) props.loading = 'lazy';
      if (props.decoding == null) props.decoding = 'async';
    });
  };
}

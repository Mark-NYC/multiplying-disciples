# Media URLs to Preserve

WordPress media (PDFs, images) can rank in Google Images or get direct
impressions/clicks, and other pages/sites may hotlink to the exact path.
Old `/wp-content/uploads/...` paths must be preserved exactly, or 301
redirected — never just dropped.

## How this works in Astro

Static files placed under `public/` are served at the same path relative
to the site root. So a file at:

```
public/wp-content/uploads/2023/04/Church-Waffle-English-04-2023.pdf
```

is served at:

```
https://multiplyingdisciples.us/wp-content/uploads/2023/04/Church-Waffle-English-04-2023.pdf
```

— identical to the WordPress URL. No redirect needed if the file is
physically present at that path.

## Known media files (from the migration brief)

None of these files have been supplied to this repo yet — this
environment has no network access to fetch them from the live site. They
are documented here so nothing gets missed; see `/imports/README.md` for
how to supply them.

| Original URL | Used by | Status |
|---|---|---|
| `/wp-content/uploads/2023/04/Church-Waffle-English-04-2023.pdf` | Unknown — not confirmed which page(s) link to this. | Not supplied |
| `/wp-content/uploads/2025/01/12-Disciples-of-Jesus-in-Order-Called-with-Bible-References.webp` | `/discover-the-12-disciples-of-jesus-christ/` (likely a hero/inline image) | Not supplied |
| `/wp-content/uploads/2025/01/12-Disciples-of-Jesus-in-Order-Called.webp` | `/discover-the-12-disciples-of-jesus-christ/` (likely a hero/inline image) | Not supplied |

## Process once files are supplied

1. Drop files into `imports/media/` preserving their original
   year/month subfolder structure (e.g. `imports/media/2025/01/...webp`).
2. Move (don't re-encode or rename) into
   `public/wp-content/uploads/<year>/<month>/<filename>`.
3. Update the article's frontmatter/body to reference the local path.
4. Mark the row above as "Preserved" and cross-reference in
   `URL_INVENTORY.md`.

## If a media URL truly cannot be preserved

Document it in `REDIRECTS.md` with a planned 301 from the old path to
wherever the asset now lives. Do not let a media URL 404.

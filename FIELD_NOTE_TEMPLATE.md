# Field Note authoring template

Copy this into a new file at `src/content/field-notes/<your-id>.md`,
fill it in, and reference it from an article with
`<FieldNote id="your-id" />` (see `ARTICLE_DESIGN_SYSTEM.md`).

The filename (without `.md`) is the id. Use something short and
descriptive, e.g. `queens-conversation-box-01.md`.

**A Field Note with `approved: false` (or missing entirely) never
renders anywhere on the live site — it's safe to save a draft here
before it's cleared for public use.**

---

Fill in the fields below, then save as YAML frontmatter + a body
(exactly like every other piece of content on this site):

```markdown
---
number: ""            # optional, e.g. "014" — omit for no number
location: ""          # optional, e.g. "Jackson Heights, Queens"
date: ""              # optional, free text, e.g. "Spring 2025"
headline: ""          # optional, short headline for the note
image: ""             # optional, site-relative image path
image_alt: ""         # required if image is set
image_caption: ""     # optional
attribution: ""       # optional, e.g. "— Lab participant" or a name if approved for use
related_tool: ""      # optional, site-relative path to a tool page
related_article: ""   # optional, site-relative path to another article
approved: false       # MUST be true to render publicly — leave false while drafting
---

Story text goes here, as plain markdown. Keep it short — a Field Note
is a few sentences to a short paragraph, not a full article.
```

## Rules

- **Never fill this in with a fictional or composite story.** Only a
  real, specific thing that actually happened, that the people
  involved (or the organization) have approved to publish.
- Don't infer specific outcomes, locations, dates, baptisms, or
  numbers from a generic stock/example photo — if you don't know it's
  true, don't write it.
- Leave `approved: false` until someone with authority to approve real
  stories for public use has actually signed off.
- `story` text, `location`, `date`, `headline`, `image`, `attribution`,
  `related_tool`, and `related_article` are all optional except the
  body text itself — a Field Note can be as minimal as a location and
  a sentence, or as full as the example in
  `ARTICLE_DESIGN_SYSTEM.md`.

## Example (filled in, still unapproved)

```markdown
---
number: "014"
location: "Jackson Heights, Queens"
date: "Spring 2025"
headline: "Three friends practiced before they used it for real"
attribution: "— Lab participant"
approved: false
---

Three people practiced the Conversation Box with each other in a lab
before any of them used it in a real conversation in their
neighborhood that same week.
```

Flip `approved: true` only once this is a real story someone has
actually approved for publication.

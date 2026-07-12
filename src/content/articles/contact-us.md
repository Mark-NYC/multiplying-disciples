---
title: "Connect"
description: "Get in touch with Multiplying Disciples — connect with local believers, get trained to make disciples, or learn more about Jesus."
slug: "/contact-us/"
canonical: "https://multiplyingdisciples.us/contact-us/"
related_articles: []
related_tools: []
exclude_from_blog: true
status: "migrated"
migration_priority: "tier-3"
original_url: "https://multiplyingdisciples.us/contact-us/"
notes: >
  Migrated from WordPress post_id 2181 (page). Special inspection per
  Phase 7B Batch 6 instructions: this is a utility contact page, not a
  normal article. The entire visible content was an H1 "Connect"
  heading followed by a Brevo/Sendinblue subscription-form embed
  (First Name, Email, Country, Zip Code, and an "I am interested in..."
  checkbox group), plus ~250 lines of embedded CSS/JS and reCAPTCHA —
  the same Brevo form embed already converted to a plain CTA on
  /content-vs-systems-the-game-changer-for-leadership-development/ in
  Phase 7B Batch 5. The Astro project has no form-handling
  infrastructure (confirmed: no server endpoints or client-side form
  JS anywhere in src/), so the form's interactive behavior could not be
  migrated directly and was not reproduced. Per the batch instructions,
  the surrounding intent (an invitation to connect) is preserved and
  the form is replaced with a simple, temporary mailto: fallback
  (contact@multiplyingdisciples.us — the same address already used as
  a real mailto: link on /privacy-policy/ in Batch 4). No hub
  assignment, no tool CTA, no related_articles (none were present in
  the original and none are appropriate for a bare contact page). Set
  exclude_from_blog: true, same reasoning as /privacy-policy/ in Batch
  4 — a utility page, not blog content. No media referenced.
---

Want to connect with local believers, get trained to make disciples, or learn more about Jesus? We'd love to hear from you.

*The original online form on this page (built on a third-party subscription-form service) could not be migrated directly to this new site. Until a replacement contact form is built, please reach out by email:*

[contact@multiplyingdisciples.us](mailto:contact@multiplyingdisciples.us)

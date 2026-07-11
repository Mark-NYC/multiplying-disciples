---
# DEVELOPMENT-ONLY EXAMPLE — exists only to verify FieldNote styling
# during development. approved is false on purpose: FieldNote silently
# renders nothing for any note where approved !== true, so this can
# never appear on the live site. Do not flip this to true — it is not
# a real, approved story. Copy FIELD_NOTE_TEMPLATE.md to author a real
# one instead.
number: "001"
location: "Example City, ST"
date: "Example"
headline: "This is a styling preview, not a published story"
image_alt: ""
attribution: ""
approved: false
---

This paragraph exists only so a developer can temporarily flip
`approved: true` on a local branch to see how the FieldNote component
renders real story text — then flip it back before committing. It is
never shipped live.

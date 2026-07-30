# PODCAST_EPISODE_MAP.md

The populated companion to PODCAST_INTEGRATION_STRATEGY.md — the rubric
(§2), scoring model (§4), and master matrix (§7) from that doc, **run
against real episode data**.

## Data provenance & scope

Source: the H3X rss.app feed export (`H3X__RSS_Viewer.pdf`), text
extracted verbatim — **no episode content is guessed**. This export
carries the **most recent 25 episodes** (≈"1 day ago" → "5 months
ago"). rss.app's free feed truncates to a recent window; it is **not**
the full ~257-episode archive. The remaining ~232 episodes (including
#230 "Take or Toss," the testimony/field-story episodes, and the
Four-Fields teaching episodes referenced elsewhere) need the full
**anchor.fm** feed — the CI-cache Action in PODCAST_INTEGRATION_STRATEGY
§6 is how we capture all of them.

Hosts observed: **Mark** and **Dave**, with recurring guests **Marcus**,
**Chuck Wood**, **Dave Miller** (E-E-A-T signal — real practitioners).

### What this real sample confirms about the thesis

Of 25 episodes, **23 are dispositions A/B/D** (embed / improve / split
into existing articles) and only **2 are (C) new-article candidates**;
**1** trends toward (E) podcast-only. That is the strategy's core claim,
now evidenced: **the podcast overwhelmingly deepens existing articles —
it does not justify one new page per episode.**

---

## 1. Per-episode classification (Step 2, populated)

Legend: **Disp.** = A embed · B improve · C new article · D split · E
podcast-only. **Outputs**: 🔊 embed · ❓ FAQ entry · 📝 Field Note.

| # | Episode (recency) | Disp. | Home article(s) — real slugs | Search intent supported | Outputs |
|--|--|--|--|--|--|
| 1 | **You Can't Recruit the Leaders You Need** (1d) | B | `5-surprising-ways-to-attract-multiplying-leaders`, `jesus-the-leader-...` | "how to raise up / find leaders" | 🔊❓ |
| 2 | **If You Don't Know When to Stop, You Don't Understand the Work** (1w) | B | `how-to-train-disciples` (the "Leave" of MAWL), `how-to-make-disciples` | "when is a disciple ready to lead" | 🔊❓ |
| 3 | **Charisma Can Fill a Room. Faithfulness Carries a Movement.** (2w) | B | `the-secret-ingredient-of-trustworthy-leaders`, CPM pillar / `the-power-of-multiplication-...` | "faithful vs charismatic leaders" | 🔊❓ |
| 4 | **Why "Just Make Disciples" Isn't Enough** (3w) | D | `how-to-make-disciples` + `what-is-a-simple-church-...` + `four-fields-of-kingdom-growth` | "disciple-making vs church planting" | 🔊❓ |
| 5 | **The Genius of The Two Church Model** (≈3w) | B | `what-is-a-simple-church-...`, `how-to-train-disciples` | "how to learn church by doing" | 🔊 |
| 6 | **We Are Reading The New Testament Backwards** (4w) | B | `understanding-biblical-discipleship-...`, `unleashing-the-movement-...` (Paul/Ephesus) | "read NT as a movement story" | 🔊 |
| 7 | **Leaders Grow Through Time With in The Boat** (1mo) | A | `how-to-train-disciples` (withness) | "learning ministry by doing it together" | 🔊📝 |
| 8 | **The Rhythms of a Multiplier Can't Be Hacked** (1mo) | B | `the-3-core-habits-of-a-disciple`, `how-to-make-disciples` | "daily rhythms/habits of a disciple-maker" | 🔊📝 |
| 9 | **Why We Do Scripture Deep Dives (And How to Run One)** (1mo) | B | `three-thirds` (the Word third), `understanding-biblical-discipleship-...` | "how to run a discovery Bible study / deep dive" | 🔊❓ |
| 10 | **The 12 Habits of Highly Effective Disciples** (1mo) | B | `the-3-core-habits-of-a-disciple` (exact-fit), `understanding-biblical-discipleship-...` | "habits of a disciple" (Acts 2:36–47) | 🔊❓ |
| 11 | **You Want Lost to Leader. But What's the Path?** (2mo) | **C** | *(new)* "The Lost-to-Leader Pathway" + interim: `how-to-make-disciples`, Clear Pathway | "how someone goes from lost to leader" | 🔊❓ |
| 12 | **Disciple Making Collapses When Scripture Stops Being Foundational** (2mo) | B | `understanding-biblical-discipleship-...`, `what-are-the-commands-of-christ` | "role of Scripture in discipleship" | 🔊❓ |
| 13 | **Are You Innovating Your Way Out of Disciple-Making Success?** (2mo) | B | `understanding-biblical-discipleship-...` / `how-to-make-disciples` | "what does disciple-making success look like" | 🔊❓ |
| 14 | **Your Job is Not in The Way of Your Calling** (2mo) | **C** | *(new)* "Co-Vocational / Marketplace Disciple-Making" + `sharing-your-testimony-at-work-or-in-church` | "faith and work / marketplace ministry" | 🔊❓ |
| 15 | **The Missing Piece Between Good Tools and Real Multiplication** (3mo) | A | `content-vs-systems-...` | "why training doesn't produce multiplication" | 🔊📝 |
| 16 | **You Cannot Follow What You Cannot See** (3mo) | B | `how-to-train-disciples` (model/withness) | "why modeling beats explanation" | 🔊 |
| 17 | **Movement or Movements? The Question That Exposes Your Heart** (4mo) | A | `breaking-down-barriers-...-objections` / CPM pillar | "burnout in movement work" | 🔊📝 |
| 18 | **The NYPD Chief Who Jumped the Fence** (4mo) | A | `setting-the-stage-...-muddy-boots-...` ⚠️ *(merge candidate → Clear Pathway; confirm before embedding)*, `the-secret-ingredient-of-trustworthy-leaders` | "leaders fall to the level of their habits" | 🔊📝 |
| 19 | **You're Overestimating This Year. Underestimating the Next Three.** (4mo) | B | `the-3-core-habits-of-a-disciple`, `4-stages-of-movement-...` | "realistic multiplication timeline" | 🔊 |
| 20 | **Tribes: A Too Often Missing Layer in Movements** (4mo) | D | CPM pillar + `what-is-a-simple-church-...` + `discover-the-12-disciples-...` (Jesus formed a tribe in the Twelve) | "tribe / oikos layer in movements" | 🔊❓ |
| 21 | **The Two Barriers Quietly Killing Your Momentum** (4mo) | B | `how-to-spot-a-lone-wolf-...`, `finding-persons-of-peace-...` | "stewarding networks vs chasing opportunities" | 🔊 |
| 22 | **You Don't Have a Vision Problem. You Have a Habit Problem.** (5mo) | B | `the-3-core-habits-of-a-disciple` | "why vision fails without habits" | 🔊❓ |
| 23 | **Gen Z. They'll Talk About Jesus. Then They Ghost You.** (5mo) | A | `finding-persons-of-peace-...`, `how-to-evangelize-...` | "following up with spiritually open people" | 🔊📝 |
| 24 | **How to Actually Have Spiritual Conversations** (5mo) | B | `how-to-evangelize-...`, `how-to-share-the-gospel`, `the-three-circles-...` | "how to start a gospel conversation" | 🔊 + **tool** |
| 25 | **19 Minutes to Stop Guessing What Matters Most in 2026** (5mo) | E→A | `action-plan` / `4-1-1` (if kept) | "focus on the right activity by phase" | (link only) |

**Note on episode 24 — a tool gap it exposes:** the episode teaches the
**Conversation Box** at `conversationquadrant.com` — a live CoVo tool
**not featured anywhere on the Multiplying Disciples site.** Add it to
the gospel cluster's tool set (it pairs naturally with 3 Circles) and to
`/starter-tools/`. This is a "podcast reveals a missing asset" find, per
strategy §3.

---

## 2. Evergreen scoring (Step 4, populated)

`IPS = 0.20·Evergreen + 0.20·Search + 0.15·AI-cite + 0.15·OrigExp +
0.10·Story + 0.10·Practical + 0.10·Strengthens`. Sorted high → low.

| Rank | # | Episode | Ev | Se | AI | OE | St | Pr | Str | **IPS** | Tier |
|--|--|--|--|--|--|--|--|--|--|--|--|
| 1 | 8 | Rhythms of a Multiplier | 9 | 7 | 7 | 8 | 7 | 8 | 9 | **7.85** | T1 |
| 2 | 10 | 12 Habits of Highly Effective Disciples | 9 | 8 | 8 | 7 | 4 | 8 | 9 | **7.75** | T1 |
| 3 | 11 | Lost to Leader — What's the Path? | 9 | 8 | 7 | 8 | 4 | 8 | 8 | **7.65** | T1 |
| 4 | 24 | How to Actually Have Spiritual Conversations | 9 | 8 | 7 | 7 | 4 | 9 | 8 | **7.60** | T1 |
| 5 | 20 | Tribes: The Missing Layer | 9 | 7 | 8 | 8 | 5 | 6 | 7 | **7.40** | T1 |
| 6 | 14 | Your Job Is Not in the Way of Your Calling | 9 | 8 | 7 | 8 | 4 | 6 | 6 | **7.25** | T1 |
| 7 | 1 | You Can't Recruit the Leaders You Need | 8 | 7 | 7 | 8 | 4 | 7 | 8 | **7.15** | T1 |
| 8 | 3 | Charisma vs Faithfulness | 9 | 6 | 8 | 7 | 4 | 6 | 8 | **7.05** | T1 |
| 9 | 7 | Leaders Grow in the Boat | 7 | 5 | 6 | 9 | 9 | 7 | 7 | **6.95** | T2 |
| 10 | 4 | Why "Just Make Disciples" Isn't Enough | 8 | 7 | 7 | 7 | 3 | 7 | 8 | **6.90** | T2 |
| 11 | 17 | Movement or Movements? | 8 | 5 | 7 | 9 | 7 | 5 | 6 | **6.80** | T2 |
| 12 | 9 | Scripture Deep Dives | 8 | 6 | 6 | 7 | 4 | 9 | 7 | **6.75** | T2 |
| 13 | 2 | If You Don't Know When to Stop | 8 | 6 | 7 | 7 | 3 | 7 | 8 | **6.70** | T2 |
| 14 | 22 | Vision Problem vs Habit Problem | 8 | 6 | 7 | 6 | 3 | 7 | 8 | **6.55** | T2 |
| 15 | 5 | The Genius of the Two Church Model | 7 | 6 | 6 | 7 | 4 | 8 | 7 | **6.45** | T2 |
| 16 | 15 | The Missing Piece (immersion debrief) | 7 | 5 | 6 | 8 | 6 | 6 | 7 | **6.40** | T2 |
| 17 | 12 | Scripture Stops Being Foundational | 8 | 6 | 7 | 6 | 3 | 6 | 7 | **6.35** | T2 |
| 18 | 23 | Gen Z Will Ghost You | 6 | 6 | 6 | 8 | 5 | 6 | 6 | **6.20** | T2 |
| 19 | 18 | NYPD Chief / Muddy Boots | 6 | 5 | 6 | 6 | 8 | 6 | 6 | **6.00** | T2 |
| 20 | 16 | You Cannot Follow What You Cannot See | 7 | 5 | 6 | 7 | 4 | 6 | 6 | **5.95** | T3 |
| 21 | 13 | Innovating Out of Success | 7 | 5 | 7 | 7 | 3 | 5 | 6 | **5.90** | T3 |
| 22 | 19 | Overestimate the Year | 7 | 5 | 6 | 6 | 3 | 6 | 6 | **5.70** | T3 |
| 22 | 21 | The Two Barriers | 7 | 5 | 6 | 6 | 3 | 6 | 6 | **5.70** | T3 |
| 24 | 6 | Reading the NT Backwards | 7 | 5 | 6 | 6 | 3 | 5 | 6 | **5.60** | T3 |
| 25 | 25 | 19 Minutes for 2026 | 4 | 4 | 5 | 5 | 2 | 6 | 4 | **4.30** | E |

**Top of the recent catalog (would be Top-20 candidates once the full
archive is scored):** episodes 8, 10, 11, 24, 20, 14, 1, 3 — all IPS ≥
7.0. They cluster hard around **habits/rhythms**, the **lost-to-leader
pathway**, **leadership formation**, and **gospel conversations** — a
map of where the podcast is strongest right now.

---

## 3. Cross-cutting strategic findings (Step 3, from real data)

1. **A cornerstone is missing: "The Lost-to-Leader Pathway."** The theme
   recurs across episodes 11, 1, 3, 8, 16 and CoVo already ships
   `from-lost-to-leader.html`. There is **no** MD article owning this
   pathway. This is the single highest-value **(C) new article** the
   recent catalog reveals — build it as the spine that connects
   evangelism → discipleship → training → leadership, with 4–5 episodes
   embedded along its stages. Highest ROI new page.

2. **"Habits/rhythms of a disciple" is a pillar waiting to happen.**
   Episodes 8, 10, 19, 22 all press the same evergreen head term.
   `the-3-core-habits-of-a-disciple` should be promoted to pillar-grade
   and become the anchor for all four embeds + an FAQ block. Cheap,
   high-authority consolidation.

3. **The weakest cluster (Disciple Training) gets rich real support.**
   Episodes 2, 5, 7, 15, 16 are all "withness / MAWL / see-it-lived"
   teaching — exactly the Training cluster's query family. This is the
   audio that finally lets the Training hub + pillar (strategy §6 item
   4) launch with practitioner evidence instead of theory.

4. **A second (C) candidate: Co-Vocational / Marketplace disciple-
   making** (episode 14, plus the recurring "co-vocational lifestyle"
   framing throughout). No MD home; real search demand ("faith and
   work"); on-brand for CoVo. Pair with
   `sharing-your-testimony-at-work-or-in-church`.

5. **Tool gap — the Conversation Box** (`conversationquadrant.com`,
   episode 24) is live but absent from the MD site. Add to the gospel
   cluster and `/starter-tools/`.

6. **Field-Note harvest (approve, then wire in):** episode 7 (the "in
   the boat" NYC→CT trip), 15 (NY Covo Immersion), 17 (three leaders'
   burnout stories), 23 (Gen Z on the ground in NY/OKC), 18 (NYPD chief
   illustration). Five real stories → five Field Notes for the
   currently-empty Field-Note column of the heatmap.

7. **Merge dependency:** episode 18's best home is the Muddy Boots
   article, which is slated to **merge into Clear Pathway**
   (CONTENT_GRAPH.md). Resolve that merge *before* embedding, or the
   embed lands on a disappearing page.

---

## 4. Master matrix rows (Step 7, populated for the recent 25)

Episode · Existing Article (real slug) · New Article? · Hub · Cluster ·
CTA · Embed Priority · Evergreen (IPS) · Notes.

| Episode | Existing Article | New? | Hub / Cluster | CTA today | Priority | IPS | Notes |
|--|--|--|--|--|--|--|--|
| Rhythms of a Multiplier | `the-3-core-habits-of-a-disciple` | no | disciple-making | lab | **P1** | 7.85 | Topgolf-prayer story → Field Note |
| 12 Habits | `the-3-core-habits-of-a-disciple` | no | disciple-making | lab | **P1** | 7.75 | Acts 2 exegesis → FAQ + PullQuote |
| Lost to Leader | *(build)* Lost-to-Leader Pathway | **yes** | disciple-training | tool→KMT | **P1** | 7.65 | New cornerstone; embed across stages |
| Spiritual Conversations | `how-to-evangelize-...` | no | share-the-gospel | tool | **P1** | 7.60 | Adds Conversation Box tool |
| Tribes | CPM pillar + `what-is-a-simple-church-...` | no | CPM / simple-church | community | **P1** | 7.40 | Feeds the oikos gap |
| Your Job / Calling | *(build)* Co-Vocational Disciple-Making | **yes** | disciple-making | lab | **P1** | 7.25 | On-brand for CoVo |
| Recruit Leaders | `5-surprising-ways-to-attract-multiplying-leaders` | no | CPM | community | **P1** | 7.15 | Answers "how do people discover they're leaders" |
| Charisma vs Faithfulness | `the-secret-ingredient-of-trustworthy-leaders` | no | CPM | community | P2 | 7.05 | "Leaders = missing link" pull-quote |
| Leaders in the Boat | `how-to-train-disciples` | no | disciple-training | lab | P2 | 6.95 | Story → Field Note |
| Just Make Disciples | split: make-disciples / simple-church / four-fields | no | multiple | lab | P2 | 6.90 | Split (D) |
| Movement or Movements | `breaking-down-barriers-...-objections` | no | CPM | community | P2 | 6.80 | Burnout stories → Field Note |
| Scripture Deep Dives | `three-thirds` | no | simple-church | lab | P2 | 6.75 | "How to run one" → FAQ |
| When to Stop | `how-to-train-disciples` | no | disciple-training | lab | P2 | 6.70 | MAWL "Leave" → FAQ |
| Vision vs Habit | `the-3-core-habits-of-a-disciple` | no | disciple-making | lab | P2 | 6.55 | 3rd embed on the habits pillar |
| Two Church Model | `what-is-a-simple-church-...` | no | simple-church | community | P2 | 6.45 | |
| Missing Piece / Immersion | `content-vs-systems-...` | no | disciple-training | lab | P2 | 6.40 | Immersion → Field Note |
| Scripture Foundational | `understanding-biblical-discipleship-...` | no | disciple-making | lab | P2 | 6.35 | Wesleyan Quadrilateral → FAQ |
| Gen Z Ghosts You | `finding-persons-of-peace-...` | no | share-the-gospel | tool | P2 | 6.20 | Ground story → Field Note |
| NYPD Chief | Muddy Boots ⚠️/Clear Pathway | no | four-fields | lab | P3 | 6.00 | Resolve merge first |
| Cannot Follow / See | `how-to-train-disciples` | no | disciple-training | lab | P3 | 5.95 | |
| Innovating Out of Success | `understanding-biblical-discipleship-...` | no | disciple-making | lab | P3 | 5.90 | Reframe → FAQ |
| Overestimate the Year | `4-stages-of-movement-...` | no | CPM | community | P3 | 5.70 | |
| Two Barriers | `how-to-spot-a-lone-wolf-...` | no | CPM | community | P3 | 5.70 | |
| NT Backwards | `unleashing-the-movement-...` (Paul) | no | CPM | community | P3 | 5.60 | |
| 19 Minutes for 2026 | `action-plan` | no | utility | none | E | 4.30 | Podcast-only; date-bound |

---

## 5. Suggested embed intros (Step 2 field) — the P1 set

Drop-in copy for the `PodcastEmbed` once it exists (strategy §1a).
Written in the site's editorial voice: no hype, names the payoff.

- **`the-3-core-habits-of-a-disciple` (Rhythms of a Multiplier):**
  "The habits below aren't a checklist to add to a busy week. In this
  episode, Mark and Dave trace how multiplying rhythms actually get
  *caught* — through Levi's table, a delivery route, and prayer at a
  Topgolf — and why classroom teaching alone never forms a disciple-
  maker."

- **`the-3-core-habits-of-a-disciple` (12 Habits):**
  "Walking through Acts 2:36–47, this episode reframes the question from
  *what should I do?* to *who am I becoming?* — the identity-devotion-
  overflow pattern that turned the first believers into a multiplying
  church."

- **Lost-to-Leader Pathway (new article, episode 11):**
  "Most leaders want to see lost people become disciple-makers but lose
  the thread between desire and next step. Here Mark and Dave name the
  two barriers — not knowing where to start, and not knowing what to do
  next — and answer the fear that a pathway is 'too mechanical.'"

- **`how-to-evangelize-...` (Spiritual Conversations):**
  "If your honest blocker isn't belief but *starting the conversation*,
  this episode walks through the Conversation Box — a repeatable way to
  move from small talk to a gospel conversation without needing to be a
  natural evangelist."

- **CPM pillar / `what-is-a-simple-church-...` (Tribes):**
  "Between personal faith and citywide mission sits a layer most
  movements skip: the tribe. This episode unpacks the biblical and
  sociological pattern — Jesus forming the Twelve, the early church
  meeting house to house — behind movements that actually take root."

- **`5-surprising-ways-to-attract-multiplying-leaders` (Recruit
  Leaders):** "You can't recruit the leaders you need — Jesus didn't.
  This episode shows the harder, more durable path: do the work, open
  your life, and let the right people recognize themselves in it."

---

## 6. Immediate next actions

1. **Get the full archive.** Ship the anchor.fm CI-cache Action
   (strategy §6 item 1–2); rss.app only gave us the last 25. Re-run this
   map against all ~257 → full Top-20 + complete matrix.
2. **Build the `PodcastEmbed` mechanism** — still the one hard blocker
   on every 🔊 above.
3. **Two new cornerstones:** Lost-to-Leader Pathway; Co-Vocational
   Disciple-Making.
4. **Promote `the-3-core-habits-of-a-disciple` to a habits pillar** and
   wire in the four habits/rhythms embeds + FAQ.
5. **Approve 5 Field Notes** (episodes 7, 15, 17, 18, 23).
6. **Add the Conversation Box tool** to the gospel cluster and
   `/starter-tools/`.
7. **Resolve the Muddy Boots → Clear Pathway merge** before embedding
   episode 18.

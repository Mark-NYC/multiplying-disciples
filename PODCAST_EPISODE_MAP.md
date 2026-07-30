# PODCAST_EPISODE_MAP.md

The populated companion to PODCAST_INTEGRATION_STRATEGY.md — the rubric
(§2), scoring model (§4), and master matrix (§7) from that doc, run
against the **full H3X catalog**.

## Data provenance & scope

Source: the complete anchor.fm RSS feed, captured to the repo by the
`Cache H3X Podcast Feed` GitHub Action (in `covo-multipliers`) and copied
here as **`imports/h3x-feed.json`** for reproducibility. **261 items**
(≈257 episodes + a trailer and a couple of intros), spanning **11 Apr
2021 → 28 Jul 2026**. No episode content is guessed — descriptions are
verbatim from the feed.

Per-episode data for **all 261** lives in **`PODCAST_EPISODE_CATALOG.csv`**
(title, date, word count, voice, cluster, disposition, the seven
dimension scores, IPS, tier, and a description excerpt). That CSV is the
"spreadsheet-style master matrix" (Step 7) at full scale; this document
is the editorial layer on top of it.

**On the scores:** the CSV's IPS is a **transparent algorithmic
first-pass** — each dimension is a keyword/signal proxy over the cleaned
show notes (see `scratchpad/analyze.py` logic, summarized in §4 of the
strategy doc). It is a *ranking aid, not a verdict*: scores compress
(4.25–7.2) because every episode is competently produced. The Top-20
below is **hand-curated** from the high-IPS candidates with real
editorial judgment, not lifted raw from the sort.

---

## 1. Full-catalog shape (Step 1 / Step 3)

**Voice:** 221 host episodes · **38 named-guest interviews** · 2 solo.

**Primary cluster (heuristic tag; `cpm_leadership` is over-weighted by
its large keyword set, but the direction is real):**

| Cluster | Episodes | Site traffic rank |
|---|--:|---|
| CPM / Leadership / Movement | ~144 | #4 (deepest library, no center) |
| Making Disciples | ~45 | #6 |
| Disciple Training | ~38 | #8 (weakest, business-critical) |
| Sharing the Gospel | ~17 | #1 (best CTR) |
| Prayer & the Field (incl. co-vocational) | ~12 | #7 |
| Simple Church | ~5 | #3 |
| **Testimony** | **~0** | **#2 (17.5k impr., model cluster)** |
| **Meet Jesus (12 Disciples etc.)** | **~0** | **#5 (116k impr., the front door)** |

### The single most important finding: catalog ↔ traffic mismatch

**The podcast is strongest exactly where the site is weakest for
traffic, and silent exactly where the site's traffic lives.**

- **~55% of the catalog is CPM/leadership/movement** — the site's
  deepest but *centerless, low-per-page-traffic* library. The audio to
  finally build the **CPM pillar** and make MD the most authoritative,
  practitioner-backed CPM site on the web is already recorded, many
  times over. This is the biggest consolidation opportunity on the site.
- **The two biggest traffic assets have no matching episode.** 12
  Disciples (116k impr.) and the Testimony triangle (17.5k impr.) can't
  be "deepened by the matching episode" — there basically isn't one.
  **Do not wait on the podcast to fix their CTR/conversion; that's an
  on-page job** (title/meta pass, Field Notes), per TOPICAL_AUTHORITY.md.
- **Testimony is a genuine content gap in the catalog, not just the
  site.** Worth a prompt: record 1–2 testimony-teaching episodes (or
  mine the field-story episodes below as testimony *examples*).

---

## 2. Top-20 Evergreen Episodes (Step 4, hand-curated)

Chosen for evergreen value **and** a clear article home, deliberately
spread across clusters (not stacked on the biggest vein). Disposition:
A embed · B improve · C new article · D split; 📝 = also a Field Note.

| # | Episode | Disp. | Home (real slug) | Why it's Top-20 |
|--:|--|--|--|--|
| 1 | **The One Hebrew Word That Will Change How You See Work** | C | *(new)* Co-Vocational Disciple-Making | Definitional, AI-citable anchor for the co-vocational cornerstone |
| 2 | **Cookies, Clinics, and Calling: A CoVocational Kingdom Story** | A📝 | *(new)* Co-Vocational + `finding-persons-of-peace-...` | Flagship co-vocational field story |
| 3 | **The Rise of Covo Multipliers: Priscilla & Aquila Blueprint** | B | *(new)* Co-Vocational (pairs w/ CoVo `aquila-and-priscilla-pattern.html`) | Names the biblical pattern the whole brand is built on |
| 4 | **How to Host a Lost and Found Party** | B | `how-to-evangelize-...`, `how-to-share-the-gospel` | Reproducible hospitality→outreach; evergreen + practical |
| 5 | **The Rhythms of a Multiplier Can't Be Hacked** | B📝 | `the-3-core-habits-of-a-disciple` | Habits-pillar anchor; Topgolf-prayer story |
| 6 | **The 12 Habits of Highly Effective Disciples** | B | `the-3-core-habits-of-a-disciple` | Acts 2 exegesis → FAQ + pull-quote |
| 7 | **Why We Do Scripture Deep Dives (And How to Run One)** | B | `three-thirds`, `understanding-biblical-discipleship-...` | The Discovery-Bible-Study method, practical |
| 8 | **We Are Reading The New Testament Backwards** | B | `understanding-biblical-discipleship-...` | Paradigm frame; high AI-citation |
| 9 | **Charisma Can Fill a Room. Faithfulness Carries a Movement.** | B | `the-secret-ingredient-of-trustworthy-leaders` | "Leaders are the missing link" pull-quote |
| 10 | **Acts And The Movement of God — with Steve Addison** | B | `disciple-making-movement-dmm-...` / CPM pillar | **E-E-A-T**: a leading DMM author on the record |
| 11 | **What Actually Starts Movements — with Emmanuel Prinz** | B | `disciple-making-movement-dmm-...` | **E-E-A-T**: movement *researcher* → citable |
| 12 | **Tribe Is the Model** (+ "Tribes: A Missing Layer") | D | CPM pillar + `what-is-a-simple-church-...` + oikos gap | Original framework; feeds the missing oikos triangle |
| 13 | **Jesus: a Master Class in Leadership Development** | B | `jesus-the-leader-...` | The best fit for the Meet-Jesus cluster |
| 14 | **What Paul Did Daily for Two Years in Asia Minor** | B | `unleashing-the-movement-...` (Paul/Ephesus) | Direct match to the Ephesus article |
| 15 | **The Apostolic Challenge: Start, Strengthen, Sustain** | B | `apostles-meaning-...`, `unlocking-the-power-of-apest` | Reproducible apostolic framework |
| 16 | **What is a Strategy Coordinator?** (+ "Stewarding Multiplication as an SC") | B | `movement-resources-strategy-coordinator` | That page already links episodes — upgrade to embeds |
| 17 | **How Jesus Multiplied Muddy Boots Leaders** | D | Muddy Boots ⚠️→ Clear Pathway | Resolve the merge first (CONTENT_GRAPH.md) |
| 18 | **Leaders Grow Through Time With in The Boat** | A📝 | `how-to-train-disciples` (withness/MAWL) | NYC→CT trip story; training cluster |
| 19 | **How Prophecy & Healing Led Me to the Mission Field — David Campbell** | A📝 | Testimony cluster + `finding-persons-of-peace-...` | Flagship field testimony (Berlin/Muslims) |
| 20 | **Strategic Persistence: Plan for Decades, Live for Today** | B | `4-stages-of-movement-...` | Long-obedience frame for the movement timeline |

---

## 3. Proven veins & how to consolidate them (Step 3 / Step 6)

1. **Co-Vocational / Marketplace — the #1 new-content signal (17+
   episodes).** One Hebrew Word · Cookies, Clinics & Calling · Margin Is
   Your Superpower · Your Job Is Not in the Way · The Priscilla & Aquila
   Pattern · Rise of Covo Multipliers · Reproducing Business Modeling
   CoVo · Redeeming Time Through Hubs · Urban Rebar (Live/Work/Play).
   The site has **no** article; CoVo already ships
   `aquila-and-priscilla-pattern.html`; the brand is literally
   *co-vocational*. **Build the "Co-Vocational / Marketplace
   Disciple-Making" cornerstone** and embed 4–6 of these across its
   sections. Highest-ROI new page in the catalog.

2. **The CPM library finally gets its center.** ~144 movement/leadership
   episodes, plus named-expert interviews (Addison ×2, Prinz, Don Dent,
   Broodryk), are the evidence base for the **missing CPM pillar**
   (TOPICAL_AUTHORITY.md #4). Write the pillar; roll the movement
   articles up to it; embed the expert interviews for E-E-A-T.

3. **E-E-A-T reservoir — 32+ named-guest interviews.** Steve Addison
   (movements.net), Emmanuel Prinz (researcher), Don Dent (apostolic
   scholar), David Campbell (Berlin), David Broodryk, Bud Houston, Guy
   Caskey, Rodger Shull, Haylee Belcher, and a recurring cast (Nate,
   Marcus, Chuck Wood, Dave Miller). None appear on the site today.
   These make MD's movement content *citable*; prioritize them as embeds
   and Field-Note sources.

4. **"From Addition to Multiplication" — an 8-part teaching series**
   (Broken Image · Glory of God in the Gospel · Jesus Is the Center ·
   The Emmaus Road · Glory Chasers · Global Phenomenon · The Simple
   Question · You Don't Have to Save the World). Individually low IPS,
   but **as a set** it's a natural multi-embed for
   `the-power-of-multiplication-...` or a short evergreen "Addition to
   Multiplication" explainer with the series embedded in order.

5. **Direct 1:1 matches to existing articles** (upgrade links →
   embeds): "5 Ways to Attract Multiplying Leaders with Mark" →
   `5-surprising-ways-to-attract-multiplying-leaders`; "Muddy Boots
   Leadership" → Muddy Boots/Clear Pathway; "What is a Strategy
   Coordinator?" → `movement-resources-strategy-coordinator` (already
   links bit.ly episodes).

6. **Field-Note harvest (approve, then wire in):** David Campbell
   (Berlin), Cookies/Clinics/Calling, Leaders in the Boat (NYC→CT),
   NYPD Chief, the immersion debriefs, Rodger Shull "byways," and the
   many "Reaching [city/people]" interviews — dozens of real,
   approvable proof-of-practice stories for the currently-empty
   Field-Note column.

---

## 4. Coverage heatmap (Step 5, full-catalog counts)

`A`=Article `P`=Podcast supply in catalog `T`=Tool `L`=Lab `F`=Field
Note `V`=Video. 🟩 strong · 🟨 partial · 🟥 weak/none.

| Topic | A | P (catalog) | T | L | F | V | Priority |
|---|--|--|--|--|--|--|--|
| CPM / Leadership | 🟩 | 🟩 **~144 eps** | 🟩 | 🟨 | 🟥 | 🟥 | **P1** — build pillar, consolidate |
| Making Disciples | 🟨 | 🟩 ~45 | 🟩 | 🟩 | 🟥 | 🟥 | **P1** — habits pillar |
| Disciple Training | 🟥 | 🟩 ~38 | 🟨 | 🟨 | 🟥 | 🟥 | **P1** — hub+pillar, business-critical |
| Sharing the Gospel | 🟩 | 🟨 ~17 | 🟩 | 🟩 | 🟥 | 🟥 | P2 — add Conversation Box tool |
| Co-Vocational / Field | 🟥 | 🟩 ~17 | 🟨 | 🟨 | 🟥 | 🟥 | **P1** — new cornerstone |
| Simple Church | 🟨 | 🟨 ~5 | 🟩 | 🟨 | 🟥 | 🟥 | P2 |
| Testimony | 🟩 | 🟥 **~0** | 🟩 | 🟩 | 🟨 | 🟥 | on-page fix; consider recording |
| Meet Jesus | 🟩 | 🟥 **~0 (12-Disciples); 🟨 leadership-of-Jesus** | 🟨 | 🟥 | 🟥 | 🟥 | on-page CTR fix |

---

## 5. Suggested embed intros — the new-cornerstone + habits set

Drop-in copy for the `PodcastEmbed` once it exists (strategy §1a),
site voice, no hype.

- **Co-Vocational cornerstone (One Hebrew Word):** "Before 'work' and
  'ministry' were ever two categories, Scripture used one word for both.
  This episode traces how recovering that single idea reframes your job
  from an obstacle to your calling into the main field God has already
  given you."

- **Co-Vocational cornerstone (Priscilla & Aquila):** "The pattern
  underneath 'co-vocational' isn't new — it's Priscilla and Aquila:
  tentmakers whose business, home, and mission were one life. Here's why
  that blueprint scales when programs don't."

- **`the-3-core-habits-of-a-disciple` (Rhythms of a Multiplier):** "The
  habits below aren't a checklist to add to a busy week. Mark and Dave
  trace how multiplying rhythms get *caught* — Levi's table, a delivery
  route, prayer at a Topgolf — and why classroom teaching alone never
  forms a disciple-maker."

- **`disciple-making-movement-dmm-...` (Steve Addison / Emmanuel
  Prinz):** "We put the movement research to practitioners who live it.
  {Addison / Prinz} on what actually starts a movement — and the quiet
  things that stop one."

---

## 6. Immediate next actions

1. **Build the `PodcastEmbed` mechanism** (strategy §1a) — still the one
   hard blocker on every embed above.
2. **Two new cornerstones, evidence-backed:** Co-Vocational /
   Marketplace Disciple-Making (17+ eps); the CPM pillar (~144 eps).
3. **Promote `the-3-core-habits-of-a-disciple` to a habits pillar** and
   wire in the rhythms/habits embeds + FAQ.
4. **Wire the Top-20 into their homes**, expert interviews first
   (E-E-A-T), starting with the direct 1:1 matches in §3.5.
5. **Approve the first wave of Field Notes** from §3.6.
6. **Add the Conversation Box tool** (`conversationquadrant.com`) to the
   gospel cluster and `/starter-tools/`.
7. **Editorial review of `PODCAST_EPISODE_CATALOG.csv`** — the
   first-pass scores/dispositions for all 261 are a starting point;
   promote/demote as you confirm.

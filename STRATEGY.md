# Roger — Strategy

## What Roger Is

Roger is an AI film and TV recommendation companion that lives in WhatsApp. You don't download an app. You don't join a group. You just text a number — and Roger is there.

The core insight: recommendations happen naturally in conversation. Mid-couch, at dinner, in a text thread. Not in apps. Not in feeds. Roger meets people exactly where that already happens.

---

## The One-Liner

**Tell Roger what you watched. He'll let the right friends know.**

---

## The Core Loop

1. You text Roger about something you watched
2. Roger understands what you loved — and why
3. Roger knows your circle's taste from past conversations
4. Roger nudges the right friend, in their own 1:1, at the right moment
5. No sharing step. No feed. The recommendation finds them.

This is the magic. The user saves a step they didn't know they could skip.

---

## The Circle

The circle is Roger's mental model of your world — the people whose taste he knows, whose opinions you trust, whose recommendations land differently than a stranger's on Letterboxd.

Roger builds this through conversation, not configuration. No one fills out a profile. No one rates 50 films to get started. Roger listens, remembers, and connects the dots over time.

The circle is a trust layer, not a feature. It's what makes Roger's nudges feel personal rather than algorithmic.

---

## Roger's Personality

Roger is named after Roger Ebert — the most trusted voice in film criticism. Not because he's a critic, but because he made you *feel* something about a film before you'd seen it.

- Warm, never gushing
- Concise, never clipped
- Knowledgeable without being a snob
- Listens more than he talks
- Signature acknowledgement: **"Roger that."**

Roger never prompts you to rate things. Never asks you to fill in your taste profile. He picks it up naturally — the way a good friend would.

"Roger that" is reserved. It's Roger's confirmation that he's acting on something — passing a recommendation to a friend, noting a preference, taking something on board. It is never used as a conversation opener, a filler phrase, or a reflexive acknowledgement. Overusing it kills it. It should land with weight when it appears.

---
## Voice guidance
Roger's opening is an invitation, not a question. He doesn't ask "what have you been watching?" — he's simply ready when you are. A warm, minimal greeting that signals he's listening is enough.
When a user shares something, Roger responds with a single short reaction — one sentence, maybe two. He doesn't review the film. He doesn't explain why it's good. He acknowledges it in a way that shows he gets it, then moves on. The response should feel like a nod from someone with great taste, not a pull quote from a critic.

When asked a follow-up like "why?" or "what do you think?", Roger adds something new — a fresh angle, a connection, a detail he noticed. He never repeats himself. Repetition breaks the illusion of intelligence immediately.
Roger's response length rule: if it doesn't fit in a text bubble, it's too long.



---

## Product Principles

**Meet people where they are.**
WhatsApp has 2B+ users. The conversation is already happening there. Roger doesn't ask anyone to change their behaviour — he shows up inside it.

**No onboarding rituals.**
No community to join. No app to download. No friends to invite before it works. You text Roger. That's it.

**Taste memory through conversation.**
Preferences emerge from what you say naturally — not from explicit ratings, sliders, or genre checkboxes.

**The recommendation finds you.**
Roger removes the sharing step entirely. You tell Roger. Roger tells the right person. The loop closes without friction.

**Simplicity over features.**
Every addition must serve trust and naturalness. If it adds friction, it doesn't ship.

**Roger never asks why.**
Roger infers taste from what you say naturally — tone, word choice, what you mention unprompted. Taste memory builds passively. The moment Roger asks "what did you like about it?" he becomes a form, not a friend.

**Roger is in service of you.**
Roger waits for a clear positive signal before nudging anyone. "I watched X" is not enough — "loved it", "really good", "worth watching" are. If sentiment is absent, Roger asks "how was it?" — the one question he's allowed, because it's human and in your service. Once he has a positive signal, he acts. He never assumes. He never has his own agenda.

---

## What Roger Is Not

- Not an app
- Not a WhatsApp Community or group to manage
- Not a feed or broadcast channel
- Not an algorithmic engine that profiles you explicitly
- Not a ratings system
- Not a social network

---

## Architecture & Stack

| Layer | Tool |
|-------|------|
| Delivery surface | WhatsApp (1:1 DM via WhatsApp Business API) |
| Phone number | Twilio virtual number |
| AI brain | Claude API (`claude-sonnet-4-20250514`) |
| Film & TV data | TMDB |
| Database | Supabase |
| Backend | Node.js |
| Deployment | Railway |
| Meta account | WhatsApp Business API via Meta Cloud API |

---

## POC Scope

**In scope**
- 1:1 WhatsApp DM with Roger
- Natural conversation — tell Roger what you watched
- Roger matches recommendation to the right circle member by taste
- Roger nudges that person in their own 1:1
- Taste memory built from conversation history
- Weekly Sunday digest (optional, v1)

**Explicitly parked — post-POC**
- Affiliate links via JustWatch
- Freemium tier / paywall
- Weekly digest as a premium feature
- Member limits or access controls
- Ratings or explicit profiling UI

---

## Demo Scope

The POC demo simulates the core loop with three users:

- **Jeff** — slow-burn thrillers, prestige drama, A24
- **Sarah** — romantic comedies, feel-good indie, British TV
- **Ara** — sci-fi, action, blockbusters, Marvel

**Demo tagline:**
"Tell Roger what you watched. He'll find the right person to tell."

Two-panel WhatsApp-style UI: Jeff's 1:1 on the left, the matched friend's 1:1 on the right. Jeff tells Roger what he watched. Roger decides who'd love it. The right panel updates with the nudge.

**Errors never reach the chat UI.**
API failures must never surface as Roger messages. Fail silently or show a subtle non-Roger indicator. Roger's voice is never used for error states.

The circle panel must always respond to a positive signal. When Roger receives a recommendation with any positive sentiment, the right panel must activate — highlighting the matched friend and showing the nudge Roger sends them. If the nudge doesn't appear, the core loop is invisible and the demo fails its only job.

**Trigger logic:**
Don't wait for the full conversation to resolve. As soon as Roger identifies a positive recommendation signal, fire the nudge to the right panel in parallel — not after.

**Design reference:** `DESIGN.md` — Section 10 for all Roger-specific tokens.

---

## Data Sources

### Primary: TMDB (The Movie Database)

TMDB is the data backbone for Roger. Free, comprehensive, and well-maintained.

| Capability | TMDB API Endpoint |
|------------|-------------------|
| Film & TV metadata | `/movie/{id}`, `/tv/{id}` |
| Search by title | `/search/movie`, `/search/tv` |
| Genres, ratings, descriptions | Included in base metadata |
| Cast & crew | `/movie/{id}/credits` |
| Posters & imagery | Image base URL + file path |
| Streaming availability by region | `/movie/{id}/watch/providers` |
| Trending titles | `/trending/all/week` |
| Recommendations by title | `/movie/{id}/recommendations` |

**API key:** Free tier at [themoviedb.org](https://www.themoviedb.org/) — more than sufficient for POC scale.

### Streaming Availability

TMDB's Watch Providers endpoint returns streaming availability per country via JustWatch data. This covers:

- Netflix, Apple TV+, Disney+, Max, Prime Video, Hulu, Peacock and more
- Rent/buy options alongside subscription streaming
- Region-aware (US by default for POC)

This means Roger can tell a friend not just *what* to watch — but *where* to watch it right now.

### Demo Data Strategy

For the demo, seed 15–20 hand-picked titles with taste profiles baked in — no live API calls needed. This keeps the demo fast, focused, and reliable.

Suggested seed titles by taste profile:

**Jeff** (slow-burn thrillers, prestige drama, A24)
- Sinners, The Brutalist, Succession, Severance, All Quiet on the Western Front

**Sarah** (romantic comedies, feel-good indie, British TV)
- Anyone But You, Flora and Son, Fleabag, The Holiday, Heartstopper

**Marcus** (sci-fi, action, blockbusters, Marvel)
- Dune Part Two, Deadpool & Wolverine, Interstellar, Andor, The Dark Knight

### Post-POC Data Roadmap

- Live TMDB API calls for real-time search and metadata
- JustWatch affiliate links on streaming provider recommendations (monetisation)
- TMDB trending endpoint to surface timely recommendations
- Expand to international streaming availability

---

## Why This Wins

Recommendations are the last social behaviour that hasn't been productised well. Every streaming service has an algorithm. Nobody trusts it. What people trust is a friend saying *"you have to watch this."*

Roger is that friend — at scale, with taste memory, delivered in the place the conversation was already happening.

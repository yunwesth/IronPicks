# IronPicks — App Development Budget

**App:** IronPicks — Fan Pick'em Game for the Lehigh Valley IronPigs  
**Platform:** Web app (Expo Web — fans scan seat QR → website opens in browser)  
**Auth:** Email magic link (Supabase Auth, no password needed)  
**Current Status:** ~60% complete (UI done, backend not yet integrated)  
**Date:** April 2026

---

## Summary

| Category | Cost |
|---|---|
| Development | $6,000–$7,500 |
| Infrastructure — Year 1 | $12 |
| QR Code printing | $50–$100 |
| **Total (Launch)** | **$6,100–$7,600** |
| Ongoing Monthly | ~$0 (free tiers) |

---

## How It Works

1. Printed QR code on each seat → fan scans → `ironpicks.com` opens in browser
2. Fan enters email → Supabase sends magic link → one tap → in the app
3. Fan makes picks on live at-bats, earns IronPigs Bucks
4. Redemption screen shows a QR code → staff scans or visually verifies at concessions

---

## Development (Remaining Work)

**Rate: $55/hr** — offshore or remote freelancer comfortable with Supabase + React

| Task | Hours | Cost |
|---|---|---|
| Supabase Auth — email magic link sign-in | 12 | $660 |
| Wire picks to database + live polling (fetch every 5s, no Realtime complexity) | 20 | $1,100 |
| Edge Function: `resolve-pick` (validate outcome, update wallet + streak) | 15 | $825 |
| Edge Function: `sync-game-state` (poll MLB API every 30s, push updates) | 15 | $825 |
| Edge Function: `redeem-reward` (validate BB balance, mark redemption) | 10 | $550 |
| MLB Stats API — replace mock data with live schedule + game feed | 15 | $825 |
| Expo Web compatibility fixes | 8 | $440 |
| Deploy to Vercel + connect domain | 3 | $165 |
| Testing (internal — IronPigs staff plays through it) | 8 | $440 |
| **Total** | **106 hrs** | **$5,830** |

Add 10% contingency: **~$6,400**

---

## Infrastructure — Year 1

| Service | Plan | Cost |
|---|---|---|
| Supabase | Free tier (sufficient for first season) | $0 |
| Vercel (web hosting) | Hobby — free | $0 |
| Domain (`ironpicks.com` or similar) | — | $12/yr |
| **Total** | | **$12/yr** |

> Supabase free tier includes 500MB database, 2GB bandwidth, and 500 concurrent connections — more than enough for a minor-league fanbase. Upgrade to Pro ($25/mo) only if needed.

---

## QR Codes

No technology cost. Print `ironpicks.com` as a QR on card stock and attach to each seat back or seatback card. One-time print job.

| Item | Cost |
|---|---|
| QR design + print (all seats) | $50–$100 |

---

## What Was Cut to Hit This Number

| Cut Item | Reason |
|---|---|
| SMS / phone auth | Email magic link is free; SMS costs ~$150/season |
| Push notifications | Fans are already at the stadium |
| Supabase Realtime | Simple 5s polling works fine and is easier to build |
| Staff verification app | Staff visually checks redemption screen |
| Analytics | Add after launch when there are real users |
| Paid QA contractor | IronPigs staff self-tests before launch |
| Contingency buffer | Kept minimal at 10% |

---

## Ongoing Monthly (Post-Launch)

**~$0/month** on free tiers for the first season. If user growth demands it, Supabase Pro is $25/month.

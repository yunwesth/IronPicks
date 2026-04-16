# IronPicks — App Development Budget

**App:** IronPicks — Fan Pick'em Game for the Lehigh Valley IronPigs  
**Platform:** Web app (Expo Web — fans scan seat QR → website opens in browser)  
**Auth:** Email magic link (Supabase Auth, no password needed)  
**Scale Assumption:** 8,000 average attendance, 4,000 active app users per game  
**Date:** April 2026

---

## Summary

| Category | Cost |
|---|---|
| Development | $7,300 |
| Infrastructure — Year 1 | $362 |
| QR Code printing (stadium signage) | $150–$300 |
| **Total (Launch)** | **~$8,000** |
| Ongoing Monthly | $25/month |

---

## How It Works

1. QR code signs placed at seats/sections → fan scans → `ironpicks.com` opens in browser
2. Fan enters email → magic link sent → one tap → in the app
3. Fan makes picks on live at-bats, earns IronPigs Bucks (BB)
4. Redemption screen shows a QR → staff visually verifies at concessions

---

## Why 4,000 Users Changes the Architecture

Simple 5-second polling was fine for a small audience. At 4,000 concurrent users:

- **4,000 users × 12 polls/min = 48,000 database hits/min** — this would overwhelm the free tier and rack up overages fast
- **Solution: Supabase Realtime broadcast** — server pushes game state updates to all users simultaneously every 30 seconds. 4,000 users share one broadcast channel instead of each making individual requests. Far more efficient and only ~$2.8GB of data per game.
- This makes Supabase Pro ($25/mo) **mandatory from day one**, and adds ~12 hours of dev work vs. simple polling.

---

## Development

**Rate: $55/hr** — offshore or remote freelancer comfortable with Supabase + React

| Task | Hours | Cost |
|---|---|---|
| Supabase Auth — email magic link | 12 | $660 |
| Supabase Realtime broadcast (game state pushed to all 4,000 users on one shared channel) | 22 | $1,210 |
| Edge Function: `resolve-pick` (validate outcome, update wallet + streak) | 15 | $825 |
| Edge Function: `sync-game-state` (poll MLB API every 30s, broadcast via Realtime) | 15 | $825 |
| Edge Function: `redeem-reward` (validate BB balance, mark redemption) | 10 | $550 |
| MLB Stats API — replace mock data with live schedule + game feed | 15 | $825 |
| Expo Web compatibility fixes | 8 | $440 |
| Load testing — simulate 4,000 concurrent users before first game | 8 | $440 |
| Deploy to Vercel + domain setup | 3 | $165 |
| Internal QA (IronPigs staff) | 8 | $440 |
| **Total** | **116 hrs** | **$6,380** |

Add 15% contingency (at scale, surprises cost more): **~$7,300**

---

## Infrastructure — Year 1

| Service | Plan | Monthly | Annual |
|---|---|---|---|
| Supabase (database, auth, realtime, edge functions) | Pro — required at 4,000 users | $25 | $300 |
| Vercel (web hosting + CDN) | Hobby — free | $0 | $0 |
| Domain | — | ~$1 | $12 |
| Supabase bandwidth buffer (Realtime at scale) | overage estimate | ~$4 | $50 |
| **Total** | | **~$30** | **~$362** |

> **Supabase Pro at 4,000 users:** Pro includes 250GB bandwidth and handles thousands of Realtime connections via shared broadcast channels. At ~2.8GB per game × 70 home games = ~196GB/season, this fits within the Pro plan with a small buffer.

---

## QR Codes

One QR code URL for the whole stadium (`ironpicks.com`). No unique codes per seat needed.

| Format | Quantity | Cost |
|---|---|---|
| Printed table cards or seat inserts | 8,000 | $150–$300 |

---

## Ongoing Monthly (Post-Launch)

| Item | Monthly |
|---|---|
| Supabase Pro | $25 |
| Vercel | $0 |
| **Total** | **$25/month** |

---

## Scale Reference

| Metric | Number |
|---|---|
| Average attendance | 8,000 |
| Expected app users per game | ~4,000 (50%) |
| Realtime broadcast channel | 1 shared (all users) |
| Game state updates per game | ~360 (every 30s × 3hr) |
| Edge Function calls/season | ~1.4M (within Pro limit) |
| Supabase bandwidth/season | ~200GB (within Pro 250GB) |
| Home games per season | ~70 |

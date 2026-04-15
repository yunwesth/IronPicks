# IronPicks — App Development Budget

**App:** IronPicks — Fan Pick'em Game for the Lehigh Valley IronPigs  
**Platform:** Web app (Expo Web — runs in any browser, no app stores)  
**Current Status:** ~60% complete (UI done, backend not yet integrated)  
**Date:** April 2026

---

## Summary

| Category | Low | High |
|---|---|---|
| Development (remaining work) | $13,500 | $19,800 |
| Infrastructure — Year 1 | $312 | $612 |
| Legal & Compliance | $200 | $800 |
| Contingency (10%) | $1,400 | $2,120 |
| **Total (Launch)** | **$15,412** | **$23,332** |
| Ongoing Monthly (post-launch) | $25 | $50 |

> **Webapp vs. mobile savings:** No App Store or Play Store fees, no native build pipeline (EAS), no device-specific QA, and Vercel hosts the frontend for free. This cuts ~$10–15k from the mobile estimate.

---

## Development Costs (Remaining Work)

The UI is complete. The remaining work is backend integration, web compatibility, and deployment.

**Rate assumptions:** Mid-level full-stack developer at $90/hr; QA at $70/hr.

### Phase 1 — Core Backend Integration

| Task | Hours | Cost |
|---|---|---|
| Supabase Auth (magic link sign-in, session management, user profiles) | 18 | $1,620 |
| Wire PickScreen to Supabase Realtime (live questions, lock/resolve flow) | 28 | $2,520 |
| Edge Function: `resolve-pick` (validate outcome, update wallet + streak) | 18 | $1,620 |
| Edge Function: `sync-game-state` (poll MLB API every 30s, push via Realtime) | 18 | $1,620 |
| Edge Function: `redeem-reward` (validate BB balance, mark redemption) | 12 | $1,080 |
| MLB Stats API live integration (replace mock data with real schedule + feed) | 18 | $1,620 |
| **Phase 1 Subtotal** | **112** | **$10,080** |

### Phase 2 — Web Adaptation & Operational Features

| Task | Hours | Cost |
|---|---|---|
| Expo Web compatibility fixes (swap any native-only components for web equivalents) | 12 | $1,080 |
| Staff QR verification page (simple web page to scan + validate redemption codes) | 10 | $900 |
| Browser push notifications (Web Push API for game start + pick result alerts) | 8 | $720 |
| **Phase 2 Subtotal** | **30** | **$2,700** |

### Phase 3 — Testing & Launch

| Task | Hours | Cost |
|---|---|---|
| QA: functional testing across Chrome, Safari, Firefox (desktop + mobile browser) | 12 | $840 |
| QA: edge cases (network drops, wrong pick timing, empty wallet, stale data) | 8 | $560 |
| Bug fixes from QA pass | 12 | $1,080 |
| Vercel deployment + custom domain setup + CI auto-deploy from GitHub | 4 | $360 |
| **Phase 3 Subtotal** | **36** | **$2,840** |

### Contingency

10% buffer for scope creep and unexpected integration complexity: **$1,562–$1,962**

---

## Infrastructure & Hosting (Year 1)

| Service | Plan | Monthly | Annual |
|---|---|---|---|
| Supabase (database, auth, realtime, edge functions) | Pro ($25/mo) | $25 | $300 |
| Vercel (web hosting + CDN) | Hobby (free) | $0 | $0 |
| Browser Push Notifications | Web Push API (free, browser-native) | $0 | $0 |
| Analytics | PostHog free tier (1M events/mo) | $0 | $0 |
| Custom domain | — | ~$1 | $12 |
| **Subtotal** | | **$26–$51** | **$312–$612** |

> **Supabase note:** The free tier supports 500 concurrent Realtime connections. For a minor-league fanbase with ~100–300 concurrent users per game, free may be enough to start. Pro at $25/month is recommended for production stability.

---

## Legal & Compliance

| Item | Low | High |
|---|---|---|
| Privacy Policy & Terms of Service (template via Termly or similar) | $0 | $200 |
| Attorney review (optional, if IronPigs org requires it) | $200 | $600 |
| **Subtotal** | **$200** | **$800** |

---

## Ongoing Monthly Costs (Post-Launch)

| Item | Monthly |
|---|---|
| Supabase Pro | $25 |
| Vercel (free tier is sufficient) | $0 |
| Push notifications | $0 |
| Analytics | $0 |
| Domain | ~$1 |
| **Monthly Run Rate** | **~$26** |

---

## Timeline

| Phase | Duration | Milestone |
|---|---|---|
| Phase 1 — Backend Integration | 4–6 weeks | Live picks + authenticated users working |
| Phase 2 — Web Adaptation & Features | 1–2 weeks | Runs cleanly in browser; staff redemption flow live |
| Phase 3 — Testing & Launch | 1–2 weeks | Deployed to production URL |
| **Total to Launch** | **6–10 weeks** | |

> No App Store review delay. Deploy when ready.

---

## Cost Driver Notes

- **Biggest cost driver:** The real-time pick pipeline in Phase 1 (pick locks atomically before the at-bat resolves, wallet updates server-side). This is unavoidable for a fair game.
- **MLB Stats API is free** — no licensing cost.
- **Expo Web** reuses ~90% of the existing code. The main compatibility work is swapping `react-native-qrcode-svg` for a web QR library and verifying navigation works in a browser.
- **No App Store, no EAS Build, no native SDKs** — these were the biggest cost drivers in the mobile budget.

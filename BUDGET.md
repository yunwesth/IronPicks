# IronPicks — App Development Budget

**App:** IronPicks — Fan Pick'em Game for the Lehigh Valley IronPigs  
**Platform:** iOS + Android (React Native / Expo)  
**Current Status:** ~60% complete (UI done, backend not yet integrated)  
**Date:** April 2026

---

## Summary

| Category | Low Estimate | High Estimate |
|---|---|---|
| Development (remaining work) | $26,400 | $38,400 |
| App Store & Distribution | $224 | $224 |
| Infrastructure — Year 1 | $480 | $960 |
| Legal & Compliance | $500 | $1,500 |
| Design Refinements | $0 | $1,500 |
| Contingency (10%) | $2,760 | $4,260 |
| **Total (Launch)** | **$30,364** | **$46,844** |
| Ongoing Monthly (post-launch) | $50 | $90 |

---

## Development Costs (Remaining Work)

The app UI is complete. The remaining work is backend integration, live data, and launch prep.

**Rate assumptions:** React Native / backend developer at $120/hr; QA at $80/hr.

### Phase 1 — Core Backend Integration

| Task | Hours | Cost |
|---|---|---|
| Supabase Auth (magic link, session mgmt, user profiles) | 25 | $3,000 |
| Wire PickScreen to Supabase Realtime (live questions, lock/resolve) | 35 | $4,200 |
| Edge Function: `resolve-pick` (validate outcome, update wallet + streak) | 20 | $2,400 |
| Edge Function: `sync-game-state` (poll MLB API every 30s, push via Realtime) | 20 | $2,400 |
| Edge Function: `redeem-reward` (validate BB balance, mark redemption) | 15 | $1,800 |
| MLB Stats API live integration (schedule + game feed replacing mock data) | 25 | $3,000 |
| **Phase 1 Subtotal** | **140** | **$16,800** |

### Phase 2 — Operational Features

| Task | Hours | Cost |
|---|---|---|
| Staff QR verification (web or native view to scan/validate redemptions) | 20 | $2,400 |
| Push notifications (game start, pick result, streak milestones via Expo Push) | 20 | $2,400 |
| Analytics event tracking (Mixpanel or PostHog — key funnels + retention) | 12 | $1,440 |
| **Phase 2 Subtotal** | **52** | **$6,240** |

### Phase 3 — Testing, Hardening & Launch

| Task | Hours | Cost |
|---|---|---|
| QA: functional testing on iOS + Android devices | 20 | $1,600 |
| QA: edge cases (network drops, wrong pick timing, empty wallet, stale game data) | 15 | $1,200 |
| Bug fixes from QA pass | 20 | $2,400 |
| CI/CD setup (GitHub Actions + Expo EAS Build pipelines) | 12 | $1,440 |
| App Store & Play Store submission prep (screenshots, descriptions, privacy URL) | 12 | $1,440 |
| **Phase 3 Subtotal** | **79** | **$8,080** |

### Contingency

10% buffer for scope creep, Apple review feedback, and unexpected integration complexity: **$3,112–$3,812**

---

## App Store & Distribution

| Item | Cost | Frequency |
|---|---|---|
| Apple Developer Program | $99 | Annual |
| Google Play Developer Account | $25 | One-time |
| **Subtotal** | **$124 + $99/yr** | |

---

## Infrastructure & Hosting (Year 1)

All costs are recurring. The free tiers are sufficient for early testing; production traffic during games warrants paid plans.

| Service | Plan | Monthly | Annual |
|---|---|---|---|
| Supabase (database, auth, realtime, edge functions) | Pro ($25/mo) | $25 | $300 |
| Expo EAS Build (iOS + Android native builds) | Free (30 builds/mo each) or On-demand ($29/mo) | $0–$29 | $0–$348 |
| Push Notifications | Expo Push (free tier) | $0 | $0 |
| Analytics | Mixpanel or PostHog (free tier — 1M events/mo) | $0 | $0 |
| Staff verification web host (Vercel or Netlify) | Hobby (free) | $0 | $0 |
| Custom domain (optional) | — | ~$1.50 | $18 |
| **Subtotal** | | **$25–$55** | **$318–$666** |

> **Supabase Free tier caveat:** Free allows 500 concurrent Realtime connections and 500MB DB. For a minor-league team with 200–500 concurrent users per game, the Pro plan at $25/month is recommended from day one to avoid connection limits.

---

## Legal & Compliance

| Item | Low | High |
|---|---|---|
| Privacy Policy & Terms of Service (template-based or attorney-drafted) | $200 | $1,000 |
| COPPA / age-gating review (if app may reach under-13 users) | $300 | $500 |
| **Subtotal** | **$500** | **$1,500** |

---

## Design Refinements (Optional)

The current design system is complete. Budget this only if the IronPigs marketing team requests brand alignment changes.

| Item | Low | High |
|---|---|---|
| Spot design work (icon refinements, loading states, onboarding screens) | $0 | $1,500 |

---

## Ongoing Monthly Costs (Post-Launch)

| Item | Monthly |
|---|---|
| Supabase Pro | $25 |
| Apple Developer (amortized) | $8.25 |
| Expo EAS (if needed for updates) | $0–$29 |
| Analytics (free tier) | $0 |
| **Monthly Run Rate** | **$33–$62** |

---

## Timeline

| Phase | Duration | Milestone |
|---|---|---|
| Phase 1 — Backend Integration | 5–7 weeks | Live game data + authenticated picks working |
| Phase 2 — Operational Features | 2–3 weeks | Staff redemption flow + push notifications |
| Phase 3 — Launch Prep | 2–3 weeks | App Store approved and live |
| **Total to Launch** | **9–13 weeks** | |

> Apple's App Store review typically adds 1–7 days; plan for one revision cycle.

---

## Cost Driver Notes

- **Biggest cost:** Supabase Realtime + Edge Function integration (Phase 1 is 52% of dev budget). The live pick-resolution pipeline — where a pick must lock before the at-bat resolves and the wallet must update atomically — is the most technically complex piece.
- **MLB Stats API is free** with no rate limits for standard polling, eliminating a major data cost.
- **Expo EAS** handles iOS and Android builds without managing Xcode/Gradle servers, keeping DevOps lean.
- **Scaling:** Supabase Pro scales automatically up to $0.013/active user beyond included limits. For a minor-league fanbase, costs are unlikely to exceed $50/month in the first season.

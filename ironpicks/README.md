# IronPicks

Fan pick'em app for the Lehigh Valley IronPigs. Predict live at-bat outcomes, earn IronPigs Bucks (BB), and redeem them for stadium rewards.

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React Native + Expo (managed) |
| Styling | React Native StyleSheet (design-token driven) |
| Navigation | React Navigation v7 — Bottom Tabs |
| Database | Supabase (Postgres + Realtime) |
| Auth | Supabase Auth |
| Edge Logic | Supabase Edge Functions |
| QR Code | react-native-qrcode-svg |
| Fonts | Barlow Condensed 700, DM Mono 500, DM Sans 400/500 via @expo-google-fonts |
| Icons | Inline SVG via react-native-svg |

## Screens

| Tab | Screen | Description |
|---|---|---|
| Pick | `PickScreen` | Live challenge card — select outcome, set wager, lock in pick |
| Game | `GameScreen` | Scoreboard + play-by-play feed + matchup stats |
| Rank | `RankScreen` | Season leaderboard with podium for top 3 |
| Redeem | `RedeemScreen` | BB balance, QR code, redemption tiers, history |

## Project Structure

```
ironpicks/
├── App.tsx                        # Root: fonts, navigation, tab bar
├── assets/
│   └── ironpigs-logo.png          # Replace with official IronPigs logo PNG
├── schema.sql                     # Supabase Postgres schema
├── src/
│   ├── constants/
│   │   ├── colors.ts              # Design token palette
│   │   └── mockData.ts            # Hardcoded mock data for mockup
│   ├── components/
│   │   ├── Scoreboard.tsx         # Shared live game scoreboard card
│   │   └── icons/                 # Inline SVG icon components
│   │       ├── ArrowDownIcon.tsx
│   │       ├── BarChartIcon.tsx
│   │       ├── BasesIcon.tsx
│   │       ├── BIcon.tsx
│   │       ├── CalendarIcon.tsx
│   │       ├── CheckCircleIcon.tsx
│   │       ├── ClockIcon.tsx
│   │       ├── FlameIcon.tsx
│   │       ├── LockIcon.tsx
│   │       ├── StarIcon.tsx
│   │       └── XCircleIcon.tsx
│   └── screens/
│       ├── PickScreen.tsx
│       ├── GameScreen.tsx
│       ├── RankScreen.tsx
│       └── RedeemScreen.tsx
```

## Setup

### 1. Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your device (iOS or Android) — or an emulator

### 2. Install dependencies

```bash
cd ironpicks
npm install
```

### 3. Add the IronPigs logo

Replace `assets/ironpigs-logo.png` with the official team logo PNG (44×44px display size, recommend 132×132px @3x asset).

### 4. Environment variables

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> These variables are only needed when integrating live Supabase. The mockup build runs entirely on hardcoded data.

### 5. Run

```bash
npx expo start
```

Scan the QR code with Expo Go, or press `a` for Android emulator / `i` for iOS simulator.

## Supabase Setup

### Database

1. Open your Supabase project → SQL Editor
2. Paste and run the contents of `schema.sql`
3. This creates: `profiles`, `wallets`, `picks`, `streaks`, `redemptions` tables, a `leaderboard` view, and a welcome-bonus trigger.

### Edge Functions (to implement)

| Function | Trigger | Description |
|---|---|---|
| `resolve-pick` | HTTP POST | Compares pick outcome, credits/debits wallet, updates streak |
| `redeem-reward` | HTTP POST | Validates balance, creates redemption, debits wallet |
| `sync-game-state` | Cron (30s) | Polls MLB Stats API and pushes game state to Realtime channel |

### Environment Variables (Supabase Edge Functions)

```
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
MLB_STATS_API_BASE_URL=https://statsapi.mlb.com/api/v1
IRONPIGS_TEAM_ID=428
```

## MLB Stats API

Free, no auth required. Key endpoints:

```
# Today's schedule for IronPigs
GET https://statsapi.mlb.com/api/v1/schedule?sportId=11&teamId=428&date=YYYY-MM-DD

# Live game feed (replace {gamePk} with game ID from schedule)
GET https://statsapi.mlb.com/api/v1.1/game/{gamePk}/feed/live
```

## Design Tokens

| Token | Value |
|---|---|
| Primary Maroon | `#6B2737` |
| Navy | `#1B2A4A` |
| Surface | `#F5F4F1` |
| Card | `#FFFFFF` |
| Card2 (inset) | `#EFEDE9` |
| Navy Pale | `#EEF1F7` |
| Border | `#DEDAD4` |
| Green (correct) | `#1A7A47` |
| Red (incorrect) | `#B83028` |
| Text Primary | `#17130F` |
| Text Secondary | `#6B6158` |
| Muted | `#A89E94` |

## Going Live Checklist

- [ ] Replace `assets/ironpigs-logo.png` with official logo
- [ ] Add `.env` with Supabase credentials
- [ ] Run `schema.sql` in Supabase
- [ ] Deploy `resolve-pick` edge function
- [ ] Deploy `redeem-reward` edge function
- [ ] Deploy `sync-game-state` cron edge function
- [ ] Wire `PickScreen` to Supabase Realtime for live questions
- [ ] Wire `RedeemScreen` to `redeem-reward` edge function
- [ ] Add Supabase Auth (magic link or Google OAuth)
- [ ] Submit to Expo EAS Build for App Store / Play Store

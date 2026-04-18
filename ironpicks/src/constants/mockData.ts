export const GAME = {
  homeTeam: 'LV',
  homeTeamFull: 'Lehigh Valley IronPigs',
  homeScore: 3,
  awayTeam: 'SWB',
  awayTeamFull: 'SWB RailRiders',
  awayScore: 2,
  inning: 6,
  inningHalf: 'bottom', // 'top' | 'bottom'
  outs: 2,
  runners: { first: false, second: true, third: true },
  count: { balls: 2, strikes: 1 },
  venue: 'COCA-COLA PARK · ALLENTOWN, PA',
  isLive: true,
};

export const BATTER = {
  name: 'Sergi Alcantara',
  avg: '.312',
  era: null,
};

export const PITCHER = {
  name: 'Mitch Spence',
  era: '3.42',
  k: 78,
  bb: 22,
};

export const WALLET = {
  balance: 340,
};

export const STREAK = {
  correct: 3,
  total: 5,
};

export const ACTIVE_QUESTION = {
  id: 'q1',
  text: 'Will Alcantara drive in a run this at-bat?',
  multiplier: 2,
  label: 'CRITICAL MOMENT · RISP',
  options: [
    { id: 'scores', label: 'Scores' },
    { id: 'holds', label: 'Holds' },
  ],
};

export const PLAY_BY_PLAY = [
  {
    id: '1',
    inning: 'BOT 6',
    description: 'Alcantara reaches on a walk. Romero scores from third.',
    result: 'RBI Walk',
    isScoring: true,
  },
  {
    id: '2',
    inning: 'TOP 6',
    description: 'Thairo Estrada grounds out to shortstop.',
    result: 'Groundout',
    isScoring: false,
  },
  {
    id: '3',
    inning: 'TOP 6',
    description: 'Oswaldo Cabrera flies out to center field.',
    result: 'Flyout',
    isScoring: false,
  },
  {
    id: '4',
    inning: 'BOT 5',
    description: 'Wilfredo Tovar singles to left. Romero scores from second.',
    result: 'RBI Single',
    isScoring: true,
  },
  {
    id: '5',
    inning: 'BOT 5',
    description: 'Carlos De La Cruz grounds into fielder\'s choice.',
    result: 'FC',
    isScoring: false,
  },
  {
    id: '6',
    inning: 'TOP 5',
    description: 'Volpe singles through the left side. Cabrera to third.',
    result: 'Single',
    isScoring: false,
  },
];

export const LEADERBOARD = [
  { id: '1', rank: 1, username: 'pigfan_88', bbTotal: 1840, isCurrentUser: false },
  { id: '2', rank: 2, username: 'ironpigs_rick', bbTotal: 1620, isCurrentUser: false },
  { id: '3', rank: 3, username: 'lvfaithful', bbTotal: 1505, isCurrentUser: false },
  { id: '4', rank: 4, username: 'you', bbTotal: 1340, isCurrentUser: true },
  { id: '5', rank: 5, username: 'baseballmom', bbTotal: 1290, isCurrentUser: false },
  { id: '6', rank: 6, username: 'allentown_al', bbTotal: 1105, isCurrentUser: false },
  { id: '7', rank: 7, username: 'cochespa', bbTotal: 980, isCurrentUser: false },
  { id: '8', rank: 8, username: 'swiner_fan', bbTotal: 875, isCurrentUser: false },
  { id: '9', rank: 9, username: 'hotdogstand', bbTotal: 740, isCurrentUser: false },
  { id: '10', rank: 10, username: 'section_c', bbTotal: 610, isCurrentUser: false },
];

export const REDEMPTION_TIERS = [
  { id: 't1', cost: 100, reward: '$1 off any food item' },
  { id: 't2', cost: 300, reward: 'Free soft drink upgrade' },
  { id: 't3', cost: 500, reward: '10% off team store merch' },
];

export const REDEMPTION_HISTORY = [
  { id: 'r1', date: 'Apr 4', reward: 'Free soft drink upgrade', cost: 300 },
  { id: 'r2', date: 'Mar 29', reward: '$1 off any food item', cost: 100 },
];

export type RedeemCategory = 'all' | 'food' | 'merch' | 'experience';

export const REDEEM_ITEMS = [
  // Food & Drink
  { id: 'f1', category: 'food' as RedeemCategory, iconType: 'hotdog', name: '$1 Off Any Food', desc: 'Valid at all concession stands this game', cost: 100, tag: 'Popular' },
  { id: 'f2', category: 'food' as RedeemCategory, iconType: 'drink', name: 'Free Soft Drink', desc: 'Any size soft drink at any concession stand', cost: 175 },
  { id: 'f3', category: 'food' as RedeemCategory, iconType: 'beer', name: '$3 Off Craft Beer', desc: 'Valid at the craft beer garden only', cost: 250 },
  { id: 'f4', category: 'food' as RedeemCategory, iconType: 'nacho', name: 'Free Nachos', desc: 'Loaded nachos at Section C stand', cost: 325 },
  { id: 'f5', category: 'food' as RedeemCategory, iconType: 'pizza', name: '$5 Off Any Order', desc: 'Any purchase $8 or more, all stands', cost: 450 },
  // Merch
  { id: 'm1', category: 'merch' as RedeemCategory, iconType: 'shirt', name: '10% Off Team Store', desc: 'One-time discount on any purchase', cost: 500, tag: 'Best Value' },
  { id: 'm2', category: 'merch' as RedeemCategory, iconType: 'medal', name: '20% Off Team Store', desc: 'One-time discount on any purchase', cost: 900 },
  { id: 'm3', category: 'merch' as RedeemCategory, iconType: 'cap', name: 'Free IronPigs Cap', desc: 'Standard team cap from the team store', cost: 1200 },
  { id: 'm4', category: 'merch' as RedeemCategory, iconType: 'jersey', name: 'Free Player Jersey', desc: 'Replica jersey, your choice of player', cost: 3500, tag: 'Rare' },
  // Experiences
  { id: 'e1', category: 'experience' as RedeemCategory, iconType: 'pig', name: 'Meet Ferrous the Pig', desc: 'Mascot meet & greet during 7th inning stretch', cost: 1500 },
  { id: 'e2', category: 'experience' as RedeemCategory, iconType: 'camera', name: 'Field Photo Opp', desc: 'Post-game access for a photo on the field', cost: 2500 },
  { id: 'e3', category: 'experience' as RedeemCategory, iconType: 'baseball', name: 'First Pitch Ceremony', desc: 'Throw out the first pitch at a future game', cost: 5000, tag: 'Legendary' },
];

export const PITCHER_STATS = {
  era: '3.42',
  avg: '.312',
  k: '78',
  bb: '22',
};

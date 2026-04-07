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

export const SCENARIOS = [
  {
    id: 'q1',
    text: 'Will Alcantara drive in a run this at-bat?',
    multiplier: 2,
    label: 'CRITICAL MOMENT · RISP',
    options: [
      { id: 'yes', label: 'Scores' },
      { id: 'no', label: 'Holds' },
    ],
    correctId: 'yes',
    correctMsg: 'Alcantara laces an RBI single to left — streak lives!',
    incorrectMsg: 'Alcantara grounds into a double play — tough break.',
  },
  {
    id: 'q2',
    text: 'Will Spence strike out the next batter?',
    multiplier: 1.5,
    label: 'PITCHER DUEL · FULL COUNT',
    options: [
      { id: 'yes', label: 'Strikeout' },
      { id: 'no', label: 'No K' },
    ],
    correctId: 'no',
    correctMsg: 'Volpe works a walk — Spence loses the battle.',
    incorrectMsg: 'Spence paints the corner — punchout! Crowd erupts.',
  },
  {
    id: 'q3',
    text: 'Will the IronPigs score this inning?',
    multiplier: 1.5,
    label: 'INNING OPENER · BOT 7',
    options: [
      { id: 'yes', label: 'Score' },
      { id: 'no', label: 'Shut Out' },
    ],
    correctId: 'yes',
    correctMsg: 'Tovar singles home Romero — IronPigs extend the lead!',
    incorrectMsg: 'Three up, three down — RailRiders hold firm.',
  },
  {
    id: 'q4',
    text: 'Will Romero successfully steal second base?',
    multiplier: 3,
    label: 'HIGH RISK · RUNNER ON 1ST',
    options: [
      { id: 'yes', label: 'Safe' },
      { id: 'no', label: 'Out' },
    ],
    correctId: 'yes',
    correctMsg: 'Romero beats the throw by a step — stolen base!',
    incorrectMsg: 'Romero is gunned down — caught stealing.',
  },
  {
    id: 'q5',
    text: 'Will the next pitch be a ball or strike?',
    multiplier: 1,
    label: 'QUICK PICK · NEXT PITCH',
    options: [
      { id: 'yes', label: 'Strike' },
      { id: 'no', label: 'Ball' },
    ],
    correctId: 'no',
    correctMsg: 'Ball four — Spence loses control of the zone.',
    incorrectMsg: 'Filthy slider catches the corner — strike called!',
  },
  {
    id: 'q6',
    text: 'Will De La Cruz hit a home run this at-bat?',
    multiplier: 5,
    label: 'POWER SHOT · 3-2 COUNT',
    options: [
      { id: 'yes', label: 'Gone' },
      { id: 'no', label: 'Stay' },
    ],
    correctId: 'yes',
    correctMsg: 'De La Cruz crushes one to deep left — GONE! Coca-Cola Park erupts!',
    incorrectMsg: 'De La Cruz flies out to the warning track — so close.',
  },
];

export const ACTIVE_QUESTION = SCENARIOS[0];

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

export const PITCHER_STATS = {
  era: '3.42',
  avg: '.312',
  k: '78',
  bb: '22',
};

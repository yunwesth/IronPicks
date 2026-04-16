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

export type Question = {
  id: string;
  text: string;
  multiplier: number;
  label: string;
  options: { id: string; label: string }[];
  correctOption: string;
  correctNarrative: string;
  incorrectNarrative: string;
};

export const QUESTIONS_POOL: Question[] = [
  {
    id: 'q1',
    text: 'Will Alcantara drive in a run this at-bat?',
    multiplier: 2,
    label: 'CRITICAL MOMENT · RISP',
    options: [{ id: 'scores', label: 'Scores' }, { id: 'holds', label: 'Holds' }],
    correctOption: 'scores',
    correctNarrative: 'Alcantara drove in the run — streak continues!',
    incorrectNarrative: 'Alcantara was retired — better luck next at-bat.',
  },
  {
    id: 'q2',
    text: 'Will De La Cruz reach base this plate appearance?',
    multiplier: 1,
    label: 'LEADOFF · TOP 7',
    options: [{ id: 'reaches', label: 'Reaches' }, { id: 'out', label: 'Out' }],
    correctOption: 'reaches',
    correctNarrative: 'De La Cruz draws a walk to open the inning!',
    incorrectNarrative: 'De La Cruz flies out to right — inning gets tough.',
  },
  {
    id: 'q3',
    text: 'Will Spence record a strikeout this at-bat?',
    multiplier: 1,
    label: 'PITCHING · FULL COUNT',
    options: [{ id: 'k', label: 'Strikeout' }, { id: 'no_k', label: 'No K' }],
    correctOption: 'k',
    correctNarrative: 'Spence punches him out — filthy slider!',
    incorrectNarrative: 'Estrada works a walk on the full count.',
  },
  {
    id: 'q4',
    text: 'Will Romero score from second on this hit?',
    multiplier: 3,
    label: 'HIGH STAKES · 2 OUTS',
    options: [{ id: 'scores', label: 'Scores' }, { id: 'holds', label: 'Holds' }],
    correctOption: 'scores',
    correctNarrative: 'Romero scores easily — that seals it!',
    incorrectNarrative: 'Romero held at third — close play at the plate.',
  },
  {
    id: 'q5',
    text: 'Will Tovar hit this ball into the outfield?',
    multiplier: 1,
    label: 'CONTACT PLAY · 1ST & 2ND',
    options: [{ id: 'outfield', label: 'Outfield' }, { id: 'infield', label: 'Infield' }],
    correctOption: 'outfield',
    correctNarrative: 'Tovar lines one into left-center — runners moving!',
    incorrectNarrative: 'Tovar bounces one to short — double play ball.',
  },
];

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

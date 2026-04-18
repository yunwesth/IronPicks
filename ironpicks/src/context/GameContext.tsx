import React, { createContext, useContext, useState, useEffect } from 'react';

export type Runners = { first: boolean; second: boolean; third: boolean };

export type GameState = {
  homeTeam: string;
  homeTeamFull: string;
  homeScore: number;
  awayTeam: string;
  awayTeamFull: string;
  awayScore: number;
  inning: number;
  inningHalf: 'top' | 'bottom';
  outs: number;
  runners: Runners;
  count: { balls: number; strikes: number };
  venue: string;
  isLive: boolean;
  lastEvent: string;
  eventKind: 'neutral' | 'hit' | 'score' | 'out';
  playLog: { id: string; inning: string; desc: string; kind: 'neutral' | 'hit' | 'score' | 'out' }[];
};

const LV = ['Alcantara', 'Romero', 'Tovar', 'De La Cruz', 'Stubbs', 'Wilson', 'Tronco'];
const SWB = ['Estrada', 'Cabrera', 'Volpe', 'Peraza', 'LeMahieu', 'Kiner-Falefa'];

const initial: GameState = {
  homeTeam: 'LV',
  homeTeamFull: 'Lehigh Valley IronPigs',
  homeScore: 3,
  awayTeam: 'SWB',
  awayTeamFull: 'SWB RailRiders',
  awayScore: 2,
  inning: 6,
  inningHalf: 'bottom',
  outs: 2,
  runners: { first: false, second: true, third: true },
  count: { balls: 2, strikes: 1 },
  venue: 'COCA-COLA PARK · ALLENTOWN, PA',
  isLive: true,
  lastEvent: 'Full count on Alcantara — runners on 2nd & 3rd',
  eventKind: 'neutral',
  playLog: [
    { id: '0a', inning: 'BOT 6', desc: 'Tovar walks. Bases loaded.', kind: 'neutral' },
    { id: '0b', inning: 'BOT 5', desc: 'Romero singles to left. Wilson scores!', kind: 'score' },
    { id: '0c', inning: 'TOP 5', desc: 'Volpe flies out to center.', kind: 'out' },
    { id: '0d', inning: 'BOT 4', desc: 'Alcantara doubles! Two RBIs.', kind: 'score' },
  ],
};

type Play = 'ball' | 'strike' | 'foul' | 'single' | 'double' | 'triple' | 'homerun' | 'flyout' | 'groundout';

const WEIGHTS: [Play, number][] = [
  ['ball', 18], ['strike', 16], ['foul', 10],
  ['single', 15], ['double', 5], ['triple', 2], ['homerun', 2],
  ['flyout', 16], ['groundout', 16],
];

function pickPlay(): Play {
  const total = WEIGHTS.reduce((s, [, w]) => s + w, 0);
  let r = Math.random() * total;
  for (const [play, w] of WEIGHTS) { r -= w; if (r <= 0) return play; }
  return 'ball';
}

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function advanceRunners(runners: Runners, bases: number): { runners: Runners; scored: number } {
  if (bases === 4) {
    const scored = 1 + (runners.first ? 1 : 0) + (runners.second ? 1 : 0) + (runners.third ? 1 : 0);
    return { runners: { first: false, second: false, third: false }, scored };
  }
  let r = { ...runners };
  let scored = 0;
  for (let i = 0; i < bases; i++) {
    if (r.third) { scored++; r.third = false; }
    r.third = r.second;
    r.second = r.first;
    r.first = false;
  }
  if (bases === 1) r.first = true;
  else if (bases === 2) r.second = true;
  else if (bases === 3) r.third = true;
  return { runners: r, scored };
}

function walkAdvance(runners: Runners): { runners: Runners; scored: number } {
  const r = { ...runners };
  let scored = 0;
  if (r.first && r.second && r.third) { scored = 1; }
  else if (r.first && r.second) { r.third = true; }
  else if (r.first) { r.second = true; }
  r.first = true;
  return { runners: r, scored };
}

function recordOut(state: GameState): GameState {
  const newOuts = state.outs + 1;
  if (newOuts >= 3) {
    const isBot = state.inningHalf === 'bottom';
    return {
      ...state,
      outs: 0,
      inning: isBot ? Math.min(state.inning + 1, 9) : state.inning,
      inningHalf: isBot ? 'top' : 'bottom',
      runners: { first: false, second: false, third: false },
      count: { balls: 0, strikes: 0 },
    };
  }
  return { ...state, outs: newOuts, count: { balls: 0, strikes: 0 } };
}

function addScore(state: GameState, scored: number): GameState {
  if (!scored) return state;
  return state.inningHalf === 'bottom'
    ? { ...state, homeScore: state.homeScore + scored }
    : { ...state, awayScore: state.awayScore + scored };
}

function inningLabel(state: GameState): string {
  return `${state.inningHalf === 'top' ? 'TOP' : 'BOT'} ${state.inning}`;
}

function pushLog(
  state: GameState,
  desc: string,
  kind: GameState['eventKind'],
): GameState {
  const entry = { id: Date.now().toString(), inning: inningLabel(state), desc, kind };
  return { ...state, lastEvent: desc, eventKind: kind, playLog: [entry, ...state.playLog].slice(0, 20) };
}

function tick(s: GameState): GameState {
  const play = pickPlay();
  const bat = rand(s.inningHalf === 'bottom' ? LV : SWB);
  const fld = rand(s.inningHalf === 'bottom' ? SWB : LV);

  switch (play) {
    case 'ball': {
      const balls = s.count.balls + 1;
      if (balls >= 3) {
        const { runners, scored } = walkAdvance(s.runners);
        let next = addScore({ ...s, runners, count: { balls: 0, strikes: 0 } }, scored);
        const desc = `${bat} draws a walk.${scored ? ' Run scores!' : ''}`;
        return pushLog(next, desc, scored ? 'score' : 'neutral');
      }
      return pushLog({ ...s, count: { ...s.count, balls } }, `Ball ${balls}`, 'neutral');
    }
    case 'strike': {
      const strikes = s.count.strikes + 1;
      if (strikes >= 3) {
        return pushLog(recordOut(s), `${bat} strikes out swinging.`, 'out');
      }
      return pushLog({ ...s, count: { ...s.count, strikes } }, `Strike ${strikes}`, 'neutral');
    }
    case 'foul': {
      const strikes = Math.min(s.count.strikes + 1, 2);
      return pushLog({ ...s, count: { ...s.count, strikes } }, `${bat} fouls it back.`, 'neutral');
    }
    case 'single': {
      const { runners, scored } = advanceRunners(s.runners, 1);
      let next = addScore({ ...s, runners, count: { balls: 0, strikes: 0 } }, scored);
      const desc = scored
        ? `${bat} singles! ${scored === 1 ? 'A run scores' : `${scored} runs score`}!`
        : `${bat} singles to left field.`;
      return pushLog(next, desc, scored ? 'score' : 'hit');
    }
    case 'double': {
      const { runners, scored } = advanceRunners(s.runners, 2);
      let next = addScore({ ...s, runners, count: { balls: 0, strikes: 0 } }, scored);
      const desc = scored
        ? `${bat} doubles! ${scored === 1 ? 'A run scores' : `${scored} runs score`}!`
        : `${bat} doubles down the line.`;
      return pushLog(next, desc, scored ? 'score' : 'hit');
    }
    case 'triple': {
      const { runners, scored } = advanceRunners(s.runners, 3);
      let next = addScore({ ...s, runners, count: { balls: 0, strikes: 0 } }, scored);
      return pushLog(next, `${bat} triples to right-center!${scored ? ` ${scored} run${scored > 1 ? 's' : ''} score!` : ''}`, scored ? 'score' : 'hit');
    }
    case 'homerun': {
      const { runners, scored } = advanceRunners(s.runners, 4);
      let next = addScore({ ...s, runners, count: { balls: 0, strikes: 0 } }, scored);
      return pushLog(next, `${bat} HOMERS! ${scored} run${scored > 1 ? 's' : ''} score!`, 'score');
    }
    case 'flyout':
      return pushLog(recordOut(s), `${bat} flies out to ${fld}.`, 'out');
    case 'groundout':
      return pushLog(recordOut(s), `${bat} grounds out to ${fld}.`, 'out');
    default:
      return s;
  }
}

const GameContext = createContext<GameState>(initial);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [game, setGame] = useState<GameState>(initial);
  useEffect(() => {
    const id = setInterval(() => setGame((prev) => tick(prev)), 3500);
    return () => clearInterval(id);
  }, []);
  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}

export function useGame() {
  return useContext(GameContext);
}

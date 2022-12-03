import { array } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';

export type Figure = 'rock' | 'paper' | 'scissors';
export type EnemyChoice = 'A' | 'B' | 'C';
export type PlayerChoice = 'X' | 'Y' | 'Z';
export type Outcome = 'lost' | 'draw' | 'won';
export type Round = { enemy: Figure, player: Figure };

export const enemyFigure: Record<EnemyChoice, Figure> = {
  'A': 'rock',
  'B': 'paper',
  'C': 'scissors',
};

export const playerFigure: Record<PlayerChoice, Figure> = {
  'X': 'rock',
  'Y': 'paper',
  'Z': 'scissors',
};

export const figureScore: Record<Figure, number> = {
  'rock': 1,
  'paper': 2,
  'scissors': 3,
};

export const outcomeScore: Record<Outcome, number> = {
  lost: 0,
  draw: 3,
  won: 6,
};

export const winMap: Record<Figure, Figure> = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
};

export const outcomeMap: Record<PlayerChoice, Outcome> = {
  'X': 'lost',
  'Y': 'draw',
  'Z': 'won',
};

function sum(list: number[]): number {
  return list.reduce((acc, n) => acc + n, 0);
}

export function dechiperEnemyValue(value: string): Figure {
  const result = enemyFigure[value];
  if(!result) throw new Error(`Unknown figure key: ${value}`);

  return result;
}

export function dechiperPlayerValue(value: string): Figure {
  const result = playerFigure[value];
  if(!result) throw new Error(`Unknown figure key: ${value}`);

  return result;
}

export function dechiperOutcomeValue(value: string): Outcome {
  const result = outcomeMap[value];
  if(!result) throw new Error(`Unknown outcome key: ${value}`);

  return result;
}

export function getRoundScore({ enemy, player }: Round): number {
  const choiceScore = figureScore[player];
  const enemyExpected = winMap[player];

  let outcome: Outcome = 'lost';
  if(enemy === enemyExpected) outcome = 'won';
  if(enemy === player) outcome = 'draw';

  const resultScore = outcomeScore[outcome];
  const score = choiceScore + resultScore;

  return score;
}

export function transformRound(round: string): Round {
  const [enemy, player] = round.split(' ');
  return {
    enemy: dechiperEnemyValue(enemy),
    player: dechiperPlayerValue(player),
  };
}

export function solve1(list: string): number {
  const lines = list.split('\n').filter(s => s !== '');
  const result = pipe(
    lines,
    array.map(transformRound),
    array.map(getRoundScore),
    sum,
  );

  return result;
}

export function solve2(list: string): number {
  return 0;
}

export type Figure = 'rock' | 'paper' | 'scissors';
export type EnemyChoice = 'A' | 'B' | 'C';
export type PlayerChoice = 'X' | 'Y' | 'Z';
export type Outcome = 'lost' | 'draw' | 'won';

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

export function dechiperValue(value: string): Figure {
  const result = enemyFigure[value] || playerFigure[value];
  if(!result) throw new Error(`Unknown figure key: ${value}`);

  return result;
}

export function getRoundScore(enemy: Figure, player: Figure): number {
  const choiceScore = figureScore[player];
  const enemyExpected = winMap[player];

  let outcome: Outcome = 'lost';
  if(enemy === enemyExpected) outcome = 'won';
  if(enemy === player) outcome = 'draw';

  const resultScore = outcomeScore[outcome];
  const score = choiceScore + resultScore;

  return score;
}

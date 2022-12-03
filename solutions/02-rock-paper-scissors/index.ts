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

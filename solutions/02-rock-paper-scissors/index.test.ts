import { expect, it } from 'vitest';
import { dechiperValue, EnemyChoice, Figure, getRoundScore, PlayerChoice } from '.';

it.each<[EnemyChoice | PlayerChoice, Figure]>([
  ['A', 'rock'],
  ['B', 'paper'],
  ['C', 'scissors'],
  ['X', 'rock'],
  ['Y', 'paper'],
  ['Z', 'scissors'],
])('decyphers %s to %s', (character, result) => {
  expect(dechiperValue(character)).toBe(result);
});

it.each<{ enemy: Figure, player: Figure, score: number }>([
  { enemy: 'paper', player: 'rock', score: 1 },
  { enemy: 'scissors', player: 'paper', score: 2 },
  { enemy: 'rock', player: 'scissors', score: 3 },
])('assigns proper score for player figure - $player', ({ enemy, player, score }) => {
  expect(getRoundScore(enemy, player)).toBe(score);
});

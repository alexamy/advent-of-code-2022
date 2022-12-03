import dedent from 'ts-dedent';
import { expect, it } from 'vitest';
import { dechiperValue, EnemyChoice, Figure, getRoundScore, PlayerChoice, Round, solve1, transformRound } from './solution';

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
  expect(getRoundScore({ enemy, player })).toBe(score);
});

it.each<{ enemy: Figure, player: Figure, score: number }>([
  { enemy: 'paper', player: 'rock', score: 1 },
  { enemy: 'scissors', player: 'rock', score: 7 },
  { enemy: 'rock', player: 'rock', score: 4 },
])('assigns proper score for round result', ({ enemy, player, score }) => {
  expect(getRoundScore({ enemy, player })).toBe(score);
});

it('transforms round', () => {
  expect(transformRound('A Y')).toEqual<Round>({
    enemy: 'rock',
    player: 'paper',
  });
});

it('solves first part', () => {
  const result = solve1(dedent`
    A Y
    B X
    C Z
  `);

  expect(result).toBe(15);
});

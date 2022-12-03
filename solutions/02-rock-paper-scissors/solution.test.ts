import dedent from 'ts-dedent';
import { expect, it } from 'vitest';
import { dechiperEnemyValue, dechiperOutcomeValue, dechiperPlayerValue, EnemyChoice, Figure, getRoundScore, Outcome, PlayerChoice, Round, solve1, solve2, transformRound } from './solution';

it.each<[EnemyChoice, Figure]>([
  ['A', 'rock'],
  ['B', 'paper'],
  ['C', 'scissors'],
])('decyphers enemy %s to %s', (character, result) => {
  expect(dechiperEnemyValue(character)).toBe(result);
});

it.each<[PlayerChoice, Figure]>([
  ['X', 'rock'],
  ['Y', 'paper'],
  ['Z', 'scissors'],
])('decyphers player %s to %s', (character, result) => {
  expect(dechiperPlayerValue(character)).toBe(result);
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

it.each<[PlayerChoice, Outcome]>([
  ['X', 'lost'],
  ['Y', 'draw'],
  ['Z', 'won'],
])('decyphers round outcome %s to %s', (character, result) => {
  expect(dechiperOutcomeValue(character)).toBe(result);
});


it.skip('solves second part', () => {
  const result = solve2(dedent`
    A Y
    B X
    C Z
  `);

  expect(result).toBe(12);
});

import dedent from 'ts-dedent';
import { expect, it } from 'vitest';
import { dechiperEnemyValue, dechiperOutcomeValue, dechiperPlayerValue, EnemyChoice, Figure, getRoundScore1, Outcome, PlayerChoice, Round1, Round2, transformRound1, transformRound2 } from './solution';
import { solve1, solve2 } from './Solution02.gen';

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
  expect(getRoundScore1({ enemy, player })).toBe(score);
});

it.each<{ enemy: Figure, player: Figure, score: number }>([
  { enemy: 'paper', player: 'rock', score: 1 },
  { enemy: 'scissors', player: 'rock', score: 7 },
  { enemy: 'rock', player: 'rock', score: 4 },
])('assigns proper score for round result', ({ enemy, player, score }) => {
  expect(getRoundScore1({ enemy, player })).toBe(score);
});

it('transforms round 1', () => {
  expect(transformRound1('A Y')).toEqual<Round1>({
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

it('transforms round 2', () => {
  expect(transformRound2('A Y')).toEqual<Round2>({
    enemy: 'rock',
    outcome: 'draw',
  });
});

it('solves second part', () => {
  const result = solve2(dedent`
    A Y
    B X
    C Z
  `);

  expect(result).toBe(12);
});

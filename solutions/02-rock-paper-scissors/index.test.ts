import { expect, it } from 'vitest';
import { dechiperValue, EnemyChoice, Figure, PlayerChoice } from '.';

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

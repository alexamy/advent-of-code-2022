import { expect, it } from 'vitest';
import dedent from 'ts-dedent';
import { isOverlap, solve1, solve2 } from './solution';

it('checks if not overlapping', () => {
  expect(isOverlap('2-4,6-8')).toBe(false);
});

it('checks overlapping', () => {
  expect(isOverlap('2-8,3-7')).toBe(true);
});

it('checks overlapping second', () => {
  expect(isOverlap('6-6,4-6')).toBe(true);
});

it('solves first part', () => {
  const result = solve1(dedent`
    2-4,6-8
    2-3,4-5
    5-7,7-9
    2-8,3-7
    6-6,4-6
    2-6,4-8
  `);

  expect(result).toBe(2);
});

it.skip('solves second part', () => {
  const result = solve2(dedent`
    2-4,6-8
    2-3,4-5
    5-7,7-9
    2-8,3-7
    6-6,4-6
    2-6,4-8
  `);

  expect(result).toBe(4);
});

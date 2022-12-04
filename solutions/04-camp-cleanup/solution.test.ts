import { expect, it } from 'vitest';
import dedent from 'ts-dedent';
import { isFullOverlap, solve1, solve2, transformRow } from './solution';

it('transforms row', () => {
  expect(transformRow('2-4,6-8')).toEqual({
    s1: 2, e1: 4,
    s2: 6, e2: 8,
  });
});

it('checks if not overlapping', () => {
  expect(isFullOverlap({
    s1: 2, e1: 4,
    s2: 6, e2: 8,
  })).toBe(false);
});

it('checks if overlapping', () => {
  expect(isFullOverlap({
    s1: 2, e1: 8,
    s2: 3, e2: 7,
  })).toBe(true);
});

it('checks if second interval is overlapping', () => {
  expect(isFullOverlap({
    s1: 6, e1: 6,
    s2: 4, e2: 6,
  })).toBe(true);
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

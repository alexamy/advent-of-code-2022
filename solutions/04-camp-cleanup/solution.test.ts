import { expect, it } from 'vitest';
import dedent from 'ts-dedent';
import { isFullOverlap, isPartialOverlap, Overlap, solve1, solve2, transformRow } from './solution';

it('transforms row', () => {
  expect(transformRow('2-4,6-8')).toEqual({
    s1: 2, e1: 4,
    s2: 6, e2: 8,
  });
});

it.each<Overlap & { result: boolean }>([
  { s1: 2, e1: 8, s2: 3, e2: 7, result: true },
  { s1: 6, e1: 6, s2: 4, e2: 6, result: true },
  { s1: 2, e1: 4, s2: 6, e2: 8, result: false },
])('checks full overlapping', ({ s1, e1, s2, e2, result }) => {
  expect(isFullOverlap({ s1, e1, s2, e2 })).toBe(result);
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

it.each<Overlap & { result: boolean }>([
  { s1: 5, e1: 7, s2: 8, e2: 9, result: false },
  { s1: 2, e1: 6, s2: 4, e2: 8, result: true },
  { s1: 6, e1: 6, s2: 4, e2: 6, result: true },
  { s1: 1, e1: 2, s2: 4, e2: 6, result: false },
  { s1: 4, e1: 6, s2: 1, e2: 2, result: false },
])('checks partial overlapping', ({ s1, e1, s2, e2, result }) => {
  expect(isPartialOverlap({ s1, e1, s2, e2 })).toBe(result);
});

it('solves second part', () => {
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

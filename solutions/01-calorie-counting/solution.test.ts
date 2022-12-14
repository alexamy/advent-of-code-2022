import { expect, it } from 'vitest';
import { dedent } from 'ts-dedent';
import { findMax, findThreeMax, getLineGroups, sumLines } from './solution';
import { solve1, solve2 } from './Solution01.gen';

it('groups numbers splitted by newline', () => {
  const result = getLineGroups(dedent`
    1

    1
  `);

  expect(result).toEqual([['1'], ['1']]);
});

it('sums consecutive numbers', () => {
  const result = sumLines([['1', '2']]);

  expect(result).toEqual([3]);
});

it('finds max of numbers', () => {
  const result = findMax([2, 5]);

  expect(result).toBe(5);
});

it('solves first part', () => {
  const result = solve1(dedent`
    1

    2
    3
  `);

  expect(result).toBe(5);
});

it('finds first three max numbers', () => {
  const result = findThreeMax([5, 1, 9, 8, 3, 2, 6]);

  expect(result).toEqual([9, 8, 6]);
});

it('solves second part', () => {
  const result = solve2(dedent`
    1

    2

    3

    4

    5
  `);

  expect(result).toBe(12);
});

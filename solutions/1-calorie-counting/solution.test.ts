import { expect, it } from 'vitest';
import { dedent } from 'ts-dedent';
import { getLineGroups, solve, sumLines } from './solution';

it('groups numbers splitted by newline', () => {
  const result = getLineGroups(dedent`
    1

    1
  `)

  expect(result).toEqual([['1'], ['1']]);
});

it('sums consecutive numbers', () => {
  const result = sumLines([['1', '2']]);

  expect(result).toEqual([3]);
});

it('finds max value', () => {
  const result = solve(dedent`
    1

    2
    3
  `);

  expect(result).toBe(5);
});

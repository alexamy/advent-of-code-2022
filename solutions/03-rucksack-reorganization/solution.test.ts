import { expect, it } from 'vitest';
import dedent from 'ts-dedent';
import { solve1, solve2 } from './solution';

it.skip('solves first part', () => {
  const result = solve1(dedent`
    vJrwpWtwJgWrhcsFMMfFFhFp
    jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
    PmmdzqPrVvPwwTWBwg
    wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
    ttgJtRGJQctTZtZT
    CrZsJsPPZsGzwwsLwLmpwMDw
  `);

  expect(result).toBe(157);
});

it.skip('solves second part', () => {
  const result = solve2(dedent``);

  expect(result).toBe(1);
});

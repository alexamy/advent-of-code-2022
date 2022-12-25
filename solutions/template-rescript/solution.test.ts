import { expect, it } from 'vitest';
import { solve1, solve2 } from './SolutionXX.gen';
import dedent from 'ts-dedent';

it.skip('solves first part', () => {
  const result = solve1(dedent``);

  expect(result).toBe(42);
});

it.skip('solves second part', () => {
  const result = solve2(dedent``);

  expect(result).toBe(42);
});

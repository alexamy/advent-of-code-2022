import { expect, it } from 'vitest';
import dedent from 'ts-dedent';
import { solve1, solve2 } from './solution';

it.skip('solves first part', () => {
  const result = solve1(dedent``);

  expect(result).toBe(42);
});

it.skip('solves second part', () => {
  const result = solve2(dedent``);

  expect(result).toBe(42);
});

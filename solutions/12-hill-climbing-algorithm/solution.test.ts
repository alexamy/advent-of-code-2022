import { expect, it } from 'vitest';
import { solve1, solve2 } from './Solution12.gen';
import dedent from 'ts-dedent';

it('solves first part', () => {
  const result = solve1(dedent`
    Sabqponm
    abcryxxl
    accszExk
    acctuvwj
    abdefghi
  `);

  expect(result).toBe(31);
});

it.skip('solves second part', () => {
  const result = solve2(dedent``);

  expect(result).toBe(42);
});

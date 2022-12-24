import { expect, it } from 'vitest';
import { solve1 } from './Solution08.gen';
import dedent from 'ts-dedent';

it('solves first part', () => {
  const result = solve1(dedent`
    30373
    25512
    65332
    33549
    35390
  `);

  expect(result).toBe(21);
});

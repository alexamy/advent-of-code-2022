import { expect, it } from 'vitest';
import dedent from 'ts-dedent';
import { CargoData, solve1, solve2, transformInput } from './solution';

it('transforms input', () => {
  const result = solve1(dedent`
    [D]
    [N] [C]
    1   2

    move 1 from 1 to 2
    move 2 from 2 to 1
  `);

  expect(transformInput(result)).toEqual<CargoData>({
    crates: [['N', 'D'], ['C']],
    designations: [{ count: 1, from: 1, to: 2 }, { count: 2, from: 2, to: 1 }],
  });
});

it.skip('solves first part', () => {
  const result = solve1(dedent`
    [D]
    [N] [C]
    [Z] [M] [P]
    1   2   3

    move 1 from 2 to 1
    move 3 from 1 to 3
    move 2 from 2 to 1
    move 1 from 1 to 2
  `);

  expect(result).toBe('CMZ');
});

it.skip('solves second part', () => {
  const result = solve2(dedent``);

  expect(result).toBe(1);
});

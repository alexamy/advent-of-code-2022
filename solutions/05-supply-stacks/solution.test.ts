import { expect, it } from 'vitest';
import dedent from 'ts-dedent';
import { CargoData, CargoDataRaw, getTopCrates, moveCrates, solve1, solve2, splitInput, Stack, transformCrates, transformDesignations, transformInput } from './solution';

it('splits input data', () => {
  const input = dedent`
    [D]
    [N] [C]
    1   2

    move 1 from 1 to 2
    move 2 from 2 to 1
  `;

  expect(splitInput(input)).toEqual<CargoDataRaw>({
    crates: ['[D]', '[N] [C]'],
    designations: ['move 1 from 1 to 2', 'move 2 from 2 to 1'],
  });
});

it('transforms crates pile', () => {
  expect(transformCrates(['[D] [E]', '[N] [C] [F]']))
    .toEqual([['N', 'D'], ['C', 'E'], ['F']]);
});

it('filters empty strings when transforms crates pile', () => {
  expect(transformCrates(['    [E]', '[N] [C]']))
    .toEqual([['N'], ['C', 'E']]);
});

it('filters empty strings when transforms crates pile if has large gap', () => {
  expect(transformCrates(['        [E]', '[N] [C] [A]']))
    .toEqual([['N'], ['C'], ['A', 'E']]);
});


it('transforms designations', () => {
  const input = [
    'move 1 from 1 to 2',
    'move 2 from 2 to 1',
  ];

  expect(transformDesignations(input)).toEqual([
    { count: 1, from: 0, to: 1 },
    { count: 2, from: 1, to: 0 },
  ]);
});

it('transforms input', () => {
  const input = dedent`
    [D]
    [N] [C]
     1   2

    move 1 from 1 to 2
    move 2 from 2 to 1
  `;

  expect(transformInput(input)).toEqual<CargoData>({
    crates: [['N', 'D'], ['C']],
    designations: [{ count: 1, from: 0, to: 1 }, { count: 2, from: 1, to: 0 }],
  });
});

it('moves crates', () => {
  expect(moveCrates({
    crates: [['N', 'D'], ['C']],
    designations: [
      { count: 1, from: 0, to: 1 },
      { count: 2, from: 1, to: 0 },
    ],
  })).toEqual<Stack[]>([
    ['N', 'D', 'C'],
    [],
  ]);
});

it('gets top crates', () => {
  expect(getTopCrates([['N', 'D'], ['C'], ['Z', 'M']])).toBe('DCM');
});

it('solves first part', () => {
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

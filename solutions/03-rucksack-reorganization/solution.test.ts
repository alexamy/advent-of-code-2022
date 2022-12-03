import { expect, it } from 'vitest';
import dedent from 'ts-dedent';
import { getCharValue, findCommonElementInHalves, sliceByHalf, solve1, solve2, findCommonElementInMany } from './solution';

it('slices even array by half', () => {
  expect(sliceByHalf([1, 2, 3, 4])).toEqual([[1, 2], [3, 4]]);
});

it('finds common element', () => {
  const result = findCommonElementInHalves('vJrwpWtwJgWrhcsFMMfFFhFp');

  expect(result).toBe('p');
});

it('finds common uppercase element', () => {
  const result = findCommonElementInHalves('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL');

  expect(result).toBe('L');
});

it('maps lowercase character value', () => {
  expect(getCharValue('p')).toBe(16);
});

it('maps uppercase character value', () => {
  expect(getCharValue('L')).toBe(38);
});

it('solves first part', () => {
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

it('finds common element in many rows', () => {
  const result = findCommonElementInMany(
    'vJrwpWtwJgWrhcsFMMfFFhFp',
    'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
    'PmmdzqPrVvPwwTWBwg',
  );

  expect(result).toBe('r');
});

it('finds common uppercase element in many rows', () => {
  const result = findCommonElementInMany(
    'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
    'ttgJtRGJQctTZtZT',
    'CrZsJsPPZsGzwwsLwLmpwMDw',
  );

  expect(result).toBe('Z');
});

it.skip('solves second part', () => {
  const result = solve2(dedent``);

  expect(result).toBe(1);
});

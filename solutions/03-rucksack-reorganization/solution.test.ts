import { expect, it } from 'vitest';
import dedent from 'ts-dedent';
import { charValue, findCommonElement, sliceByHalf, solve1, solve2 } from './solution';

it('slices even array by half', () => {
  expect(sliceByHalf([1, 2, 3, 4])).toEqual([[1, 2], [3, 4]]);
});

it('finds common element', () => {
  const result = findCommonElement('vJrwpWtwJgWrhcsFMMfFFhFp');

  expect(result).toBe('p');
});

it.skip('maps character value', () => {
  expect(charValue('p')).toBe(16);
  expect(charValue('L')).toBe(38);
});

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

import assert from 'assert';
import { array } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import { sum } from 'radash';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export function solve1(input: string): number {
  const lines = input.split('\n').filter(r => r);
  const result = pipe(
    lines,
    array.map(findCommonElementInHalves),
    array.map(getCharValue),
    sum,
  );

  return result;
}

export function solve2(input: unknown): unknown {
  return undefined;
}

export function findCommonElementInMany(...rows: string[]): string {
  assert(rows.length > 1, 'Must provide at least two rows.');

  const [first, ...others] = rows.map(row => row.split(''));
  const [common] = first.filter(c => {
    return others.every(row => row.includes(c));
  });

  return common;
}

export function findCommonElementInHalves(row: string): string {
  const elements = row.split('');
  const [first, second] = sliceByHalf(elements);

  const [common] = first.filter(e => second.includes(e));
  assert(common, `No common element found for ${row}.`);

  return common;
}

export function sliceByHalf<T>(elements: T[]): T[][] {
  assert(elements.length % 2 === 0, 'Row must have even count of elements.');

  const half = elements.length / 2;
  const first = elements.slice(0, half);
  const second = elements.slice(half);

  return [first, second];
}

export function getCharValue(char: string): number {
  const isUppercase = char.toUpperCase() === char;
  const value = alphabet.indexOf(char.toLowerCase())
    + (isUppercase ? alphabet.length : 0)
    + 1;

  return value;
}

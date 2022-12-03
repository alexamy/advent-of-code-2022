import assert from 'assert';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

function sum(list: number[]): number {
  return list.reduce((acc, n) => acc + n, 0);
}

export function sliceByHalf<T>(elements: T[]): T[][] {
  assert(elements.length % 2 === 0, 'Row must have even count of elements.');

  const half = elements.length / 2;
  const first = elements.slice(0, half);
  const second = elements.slice(half);

  return [first, second];
}

export function findCommonElement(row: string): string {
  const elements = row.split('');
  const [first, second] = sliceByHalf(elements);

  const [common] = first.filter(e => second.includes(e));
  assert(common, `No common element found for ${row}.`);

  return common;
}

export function getCharValue(char: string): number {
  const isUppercase = char.toUpperCase() === char;
  const value = alphabet.indexOf(char.toLowerCase())
    + (isUppercase ? alphabet.length : 0)
    + 1;

  return value;
}

export function solve1(input: string): number {
  const lines = input.split('\n').filter(r => r);
  const result = lines.map(findCommonElement).map(getCharValue);

  return sum(result);
}

export function solve2(input: unknown): unknown {
  return input;
}

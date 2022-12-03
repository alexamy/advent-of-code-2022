import assert from 'assert';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

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

  const common = first.filter(e => second.includes(e));
  assert(common.length === 1, 'Must have one element by task condition.');

  return common[0];
}

export function getCharValue(char: string): number {
  return 0;
}

export function solve1(input: unknown): unknown {
  return input;
}

export function solve2(input: unknown): unknown {
  return input;
}

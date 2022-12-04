interface Overlap {
  s1: number;
  e1: number;
  s2: number;
  e2: number;
}

export function transformRow(row: string): Overlap {
  const [first, second] = row.split(',');
  const [s1, e1] = first.split('-').map(Number);
  const [s2, e2] = second.split('-').map(Number);

  return { s1, e1, s2, e2 };
}

export function isFullOverlap({ s1, e1, s2, e2 }: Overlap) {
  const isOverlap = s2 >= s1 && e2 <= e1 || s1 >= s2 && e1 <= e2;

  return isOverlap;
}

export function isPartialOverlap({ s1, e1, s2, e2 }: Overlap) {
  const isNotOverlap = (s1 > s2 && s1 > e1 && e1 > s2 && e1 > e2)
    || (s1 < s2 && s1 < e2 && e1 < s2 && e1 < e2);

  return !isNotOverlap;
}

export function solve1(input: string): number {
  const lines = input.split('\n').filter(s => s);
  const overlaps = lines.map(transformRow).map(isFullOverlap);
  const count = overlaps.filter(s => s === true).length;

  return count;
}

export function solve2(input: string): number {
  const lines = input.split('\n').filter(s => s);
  const overlaps = lines.map(transformRow).map(isPartialOverlap);
  const count = overlaps.filter(s => s === true).length;

  return count;
}

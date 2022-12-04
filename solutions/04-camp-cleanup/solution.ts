export function isOverlap(row: string) {
  const [first, second] = row.split(',');
  const [s1, e1] = first.split('-').map(Number);
  const [s2, e2] = second.split('-').map(Number);
  const isOverlap = s2 >= s1 && e2 <= e1 || s1 >= s2 && e1 <= e2;

  return isOverlap;
}

export function solve1(input: string): number {
  const lines = input.split('\n').filter(s => s);
  const overlaps = lines.map(isOverlap);
  const count = overlaps.filter(s => s).length;

  return count;
}

export function solve2(input: unknown): unknown {
  return undefined;
}

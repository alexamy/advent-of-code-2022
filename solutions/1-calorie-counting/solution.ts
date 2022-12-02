export function getLineGroups(list: string): string[][] {
  const groups: string[][] = [];

  let idx = 0;
  for(const line of list.split('\n')) {
    if(line === '') {
      idx += 1;
      continue;
    }

    groups[idx]
      ? groups[idx].push(line)
      : (groups[idx] = [line])
  };

  return groups;
}

export function sumLines(list: string[][]): number[] {
  return list.map(numbers => {
    return numbers.reduce((acc, n) => acc + Number(n), 0);
  });
}

export function findMax(list: number[]): number {
  return Math.max(...list);
}

export function solve1(list: string): number {
  return findMax(sumLines(getLineGroups(list)));
}

export function findThreeMax(list: number[]): number[] {
  const numbers = [...list];
  numbers.sort((a, b) => b - a);

  return numbers.slice(0, 3);
}

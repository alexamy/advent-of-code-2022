function sum(list: number[]): number {
  return list.reduce((acc, n) => acc + n, 0);
}

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
    return sum(numbers.map(Number));
  });
}

export function findMax(list: number[]): number {
  return Math.max(...list);
}

export function solve1(list: string): number {
  const answer = findMax(sumLines(getLineGroups(list)));

  return answer;
}

export function findThreeMax(list: number[]): number[] {
  const numbers = [...list];
  numbers.sort((a, b) => b - a);

  return numbers.slice(0, 3);
}

export function solve2(list: string): number {
  const answer = sum(findThreeMax(sumLines(getLineGroups(list))));

  return answer;
}

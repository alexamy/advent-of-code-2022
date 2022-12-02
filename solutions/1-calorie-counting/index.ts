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

import { range } from 'radash';

export type Stack = string[];

export interface MoveDesignation {
  count: number;
  from: number;
  to: number;
}

export interface CargoDataRaw {
  crates: string[];
  designations: string[];
}

export interface CargoData {
  crates: Stack[];
  designations: MoveDesignation[];
}

export function splitInput(input: string): CargoDataRaw {
  const lines = input.split('\n');
  const crates: string[] = [];
  const designations: string[] = [];

  let isSeparatorFound = false;
  for(const line of lines) {
    if(line === '') {
      isSeparatorFound = line === '';
    } else {
      const target = isSeparatorFound ? designations : crates;
      target.push(line);
    }
  }

  crates.pop();

  return { crates, designations };
}

export function transformCrates(raw: string[]): Stack[] {
  const placeholder = '~';
  const list = raw.map(crate => crate
    .replace(/[[\]]/g, '')
    .replace(/\s{3}/g, ' ')
    .replace(/^\s{2}/g, `${placeholder} `)
    .replace(/\s{2}/g, ` ${placeholder}`)
    .split(' '));

  list.reverse();

  const result: string[][] = [];
  for(const row of list) {
    for(const i of range(0, row.length - 1)) {
      if(!result[i]) result[i] = [];
      if(row[i] === placeholder) continue;
      result[i].push(row[i]);
    }
  }

  return result;
}

export function transformDesignation(designation: string): MoveDesignation {
  const matches = designation.match(/\d+/g);
  if(!matches) throw new Error(`Malformed line: ${designation}.`);
  if(matches.length < 3) throw new Error(`Expect three matches, for line: ${designation}.`);

  const result: MoveDesignation = {
    count: Number(matches[0]),
    from: Number(matches[1]) - 1,
    to: Number(matches[2]) - 1.
  };

  return result;
}

export function transformDesignations(input: string[]): MoveDesignation[] {
  const result = input.map(transformDesignation);

  return result;
}

export function transformInput(input: string): CargoData {
  const { crates, designations } = splitInput(input);
  const result: CargoData = {
    crates: transformCrates(crates),
    designations: transformDesignations(designations),
  };

  return result;
}

export function moveCrates({ crates, designations }: CargoData): Stack[] {
  const piles = crates.map(crate => ([...crate]));

  for(const { count, from, to } of designations) {
    const moved = piles[from].splice(-count);
    moved.reverse();
    piles[to].push(...moved);
  }

  return piles;
}

export function getTopCrates(crates: Stack[]): string {
  const result = crates.flatMap(crate => crate.slice(-1)[0]).join('');

  return result;
}

export function solve1(input: string): string {
  const data = transformInput(input);
  const crates = moveCrates(data);
  const top = getTopCrates(crates);

  return top;
}

export function solve2(input: unknown): unknown {
  return undefined;
}

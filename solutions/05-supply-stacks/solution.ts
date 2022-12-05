import { fork, range } from 'radash';

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
  const list = raw.map(crate => crate.replace(/[[\]]/g, '').split(' '));
  list.reverse();

  const result: string[][] = [];
  for(const row of list) {
    for(const i of range(0, row.length - 1)) {
      if(!result[i]) result[i] = [];
      result[i].push(row[i]);
    }
  }

  return result;
}

export function transformDesignations(input: string): MoveDesignation[] {
  const result = input.split('\n').map(line => {
    const matches = line.match(/\d+/g);
    if(!matches) throw new Error(`Malformed line: ${line}.`);
    if(matches.length < 3) throw new Error(`Expect three matches, for line: ${line}.`);

    const designation: MoveDesignation = {
      count: Number(matches[0]),
      from: Number(matches[1]) - 1,
      to: Number(matches[2]) - 1.
    };

    return designation;
  });

  return result;
}

export function transformInput(input: string): CargoData {

}

export function solve1(input: string): string {
  return '';
}

export function solve2(input: unknown): unknown {
  return undefined;
}

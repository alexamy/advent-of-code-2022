import { fork } from 'radash';

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

export function transformCrates(raw: string[]): Stack {
  const list = raw.map(crate => crate.replace(/[[\]]/g, '').split(' '));

  return list;
}

export function transformInput(input: string): CargoData {

}

export function solve1(input: string): string {
  return '';
}

export function solve2(input: unknown): unknown {
  return undefined;
}

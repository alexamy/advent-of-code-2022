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

  return lines;
}

export function transformInput(input: string): CargoData {

}

export function solve1(input: string): string {
  return '';
}

export function solve2(input: unknown): unknown {
  return undefined;
}

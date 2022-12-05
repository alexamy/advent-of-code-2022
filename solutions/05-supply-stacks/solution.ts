export type Stack = string[];

export interface MoveDesignation {
  count: number;
  from: number;
  to: number;
}

export interface CargoData {
  crates: Stack[];
  designations: MoveDesignation[];
}

export function transformInput(input: string): CargoData {

}

export function solve1(input: string): string {
  return '';
}

export function solve2(input: unknown): unknown {
  return undefined;
}

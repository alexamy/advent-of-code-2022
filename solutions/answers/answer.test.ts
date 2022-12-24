import { test, expect } from 'vitest';
import { readFile } from 'fs-extra';
import * as S1 from '../01-calorie-counting/solution';
import * as S5 from '../05-supply-stacks/Solution05.gen';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { encrypt, decrypt } from './cipher';

test('Solution 01', async () => {
  const file = await readFile('solutions/01-calorie-counting/input.txt');
  const input = file.toString();

  const result1 = 'U2FsdGVkX19GwneJUSfz4kzJaumaIvYhc7TuyIeMBXg=';
  expect(S1.solve1(input).toString()).toBe(decrypt(result1));

  const result2 = 'U2FsdGVkX1/PI85EaUG/TsYgvNA0w2xNjZpoDiIH4jQ=';
  expect(S1.solve2(input).toString()).toBe(decrypt(result2));
});


test('Solution 05', async () => {
  const file = await readFile('solutions/05-supply-stacks/input.txt');
  const input = file.toString();

  const result1 = 'U2FsdGVkX18dzsXxCXYmXx/ITPxlJh+M54JtAVYSJwY=';
  expect(S5.solve1(input)).toBe(decrypt(result1));

  const result2 = 'U2FsdGVkX1+2KeJ/k7yHBAFtGV0HvyEEQFrsvTvFEnQ=';
  expect(S5.solve2(input)).toBe(decrypt(result2));
});

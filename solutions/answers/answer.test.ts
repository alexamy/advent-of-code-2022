import { test, expect } from 'vitest';
import { readFile } from 'fs-extra';
import * as S1 from '../01-calorie-counting/solution';
import * as S2 from '../02-rock-paper-scissors/solution';
import * as S3 from '../03-rucksack-reorganization/solution';
import * as S4 from '../04-camp-cleanup/solution';
import * as S5 from '../05-supply-stacks/Solution05.gen';
import * as S6 from '../06-tuning-trouble/Solution06.gen';
import * as S8 from '../08-treetop-tree-house/Solution08.gen';
import * as S10 from '../10-cathode-ray-tube/Solution10.gen';
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

test('Solution 02', async () => {
  const file = await readFile('solutions/02-rock-paper-scissors/input.txt');
  const input = file.toString();

  const result1 = 'U2FsdGVkX1/4MsRxeZHmZyJFN1zCa7g3p0c3x/Rp//U=';
  expect(S2.solve1(input).toString()).toBe(decrypt(result1));

  const result2 = 'U2FsdGVkX1+PDYGNv1ew8ggJLy4Cqhrq190sk6CMVp8=';
  expect(S2.solve2(input).toString()).toBe(decrypt(result2));
});

test('Solution 03', async () => {
  const file = await readFile('solutions/03-rucksack-reorganization/input.txt');
  const input = file.toString();

  const result1 = 'U2FsdGVkX19cGluLIeOZCyP49N3N+nAS7rinAYMsKSY=';
  expect(S3.solve1(input).toString()).toBe(decrypt(result1));

  const result2 = 'U2FsdGVkX1/dTCCuThVKPrkNYJItv0Plys3ZFu6tPAU=';
  expect(S3.solve2(input).toString()).toBe(decrypt(result2));
});

test('Solution 04', async () => {
  const file = await readFile('solutions/04-camp-cleanup/input.txt');
  const input = file.toString();

  const result1 = 'U2FsdGVkX18Iqwyfsf2GcEjVXbfatB47oBv3BEheTJ0=';
  expect(S4.solve1(input).toString()).toBe(decrypt(result1));

  const result2 = 'U2FsdGVkX189OrwTDjdWQOWNBxhLjO/Ql7fQ7LlsSlg=';
  expect(S4.solve2(input).toString()).toBe(decrypt(result2));
});


test('Solution 05', async () => {
  const file = await readFile('solutions/05-supply-stacks/input.txt');
  const input = file.toString();

  const result1 = 'U2FsdGVkX18dzsXxCXYmXx/ITPxlJh+M54JtAVYSJwY=';
  expect(S5.solve1(input)).toBe(decrypt(result1));

  const result2 = 'U2FsdGVkX1+2KeJ/k7yHBAFtGV0HvyEEQFrsvTvFEnQ=';
  expect(S5.solve2(input)).toBe(decrypt(result2));
});

test('Solution 06', async () => {
  const file = await readFile('solutions/06-tuning-trouble/input.txt');
  const input = file.toString();

  const result1 = 'U2FsdGVkX18px8v1LlKLMcBAIl2hbAqNeKOHTlw9OUQ=';
  expect(S6.solve1(input).toString()).toBe(decrypt(result1));

  const result2 = 'U2FsdGVkX18dx/dgacaTKhWREZU/RLHNjm1xO6AZtQI=';
  expect(S6.solve2(input).toString()).toBe(decrypt(result2));
});

test('Solution 08', async () => {
  const file = await readFile('solutions/08-treetop-tree-house/input.txt');
  const input = file.toString();

  const result1 = 'U2FsdGVkX1+qIowMmGqhWvCesrSggOdwJIHgtPgBGpk=';
  expect(S8.solve1(input).toString()).toBe(decrypt(result1));

  // const result2 = '';
  // expect(S8.solve2(input).toString()).toBe(decrypt(result2));
});

test('Solution 10', async () => {
  const file = await readFile('solutions/10-cathode-ray-tube/input.txt');
  const input = file.toString();

  const result1 = 'U2FsdGVkX1+WPT2zM8MbdJrHbBua+5IxmKmE1W3wfWA=';
  expect(S10.solve1(input).toString()).toBe(decrypt(result1));

  const result2 = 'U2FsdGVkX19jCPNe+GCh5C9PWadnePiwWCGZsahmTAYzigh9wRYuQczFhPUsgSDC5/YdsEnjzGw02UBJJLWQuO39P2P09airBC7qUNL/mlgF7H2Woop/h5HFWnLOqF8nT28yIdcmRTXXEk4M2Uc8E4FV/V95SD/wPXIC8ZYB0DnbwXzw+wQxIWeiATLgj2/KNZT6N//+nIZFQJDKtZMCndbv4YYAGxyKsGyTfrTwhoMpr1jgfVAJ8LMOkyRFaBxz89CDW+zQb+lkTxphY4JYFcBk5mgoUdaUyygerTPeXSmIETw5KICezkmRnqWTAllUrHVbSfchwBlZoOF3AEK5t54jvKJSFgTb6hzlqY4fHEc=';
  expect(S10.solve2(input).toString()).toBe(decrypt(result2));
});

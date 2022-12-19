import { expect, it } from 'vitest';
import { solve1 } from './Solution10.gen';
import { sampleProgram } from './sample';

it('solves first part', () => {
  const result = solve1(sampleProgram);

  expect(result).toBe(13140);
});

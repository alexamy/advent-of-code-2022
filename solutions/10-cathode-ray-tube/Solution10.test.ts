import { expect, it } from 'vitest';
import { solve1 } from './Solution10.gen';
import { sampleProgram } from './sample';

it('solves first part', () => {
  expect(solve1(sampleProgram)).toBe(13140);
});

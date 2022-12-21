import { expect, it } from 'vitest';
import { solve1, solve2 } from './Solution10.gen';
import { sampleProgram } from './sample';
import dedent from 'ts-dedent';

it('solves first part', () => {
  const result = solve1(sampleProgram);

  expect(result).toBe(13140);
});

it('solves second part', () => {
  const result = solve2(sampleProgram);

  expect(result).toBe(dedent`
    ##..##..##..##..##..##..##..##..##..##..
    ###...###...###...###...###...###...###.
    ####....####....####....####....####....
    #####.....#####.....#####.....#####.....
    ######......######......######......####
    #######.......#######.......#######.....
  `);
});

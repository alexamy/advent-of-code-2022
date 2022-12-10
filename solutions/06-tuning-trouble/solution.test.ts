import { expect, it } from 'vitest';
import { solve1 } from './solution.gen';

it.skip.each<[string, number]>([
  ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 7],
  ['bvwbjplbgvbhsrlpgdmjqwftvncz', 5],
  ['nppdvjthqldpwncqszvftbrmjlhg', 6],
  ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 10],
  ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 11],
])('solves first part', ([message, result]) => {
  expect(solve1(message)).toBe(result);
});

// it.skip('solves second part', () => {
//   const result = solve2(dedent``);

//   expect(result).toBe(1);
// });

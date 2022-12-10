import { expect, it } from 'vitest';
import { solve1, solve2 } from './Solution06.gen';

it.each<[string, number]>([
  ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 7],
  ['bvwbjplbgvbhsrlpgdmjqwftvncz', 5],
  ['nppdvjthqldpwncqszvftbrmjlhg', 6],
  ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 10],
  ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 11],
])('solves first part', (message, result) => {
  expect(solve1(message)).toBe(result);
});

it.each<[string, number]>([
  ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 19],
  ['bvwbjplbgvbhsrlpgdmjqwftvncz', 23],
  ['nppdvjthqldpwncqszvftbrmjlhg', 23],
  ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 29],
  ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 26],
])('solves second part', (message, result) => {
  expect(solve2(message)).toBe(result);
});

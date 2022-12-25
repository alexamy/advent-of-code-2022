import { readFile } from 'fs-extra';
import { solve1, solve2 } from './Solution08.gen';

run();

async function run() {
  const input = await readFile(`${__dirname}/input.txt`);
  const result1 = solve1(input.toString());
  const result2 = solve2(input.toString());

  console.log(`Solution 1:\n${result1}`);
  console.log(`Solution 2:\n${result2}`);
}

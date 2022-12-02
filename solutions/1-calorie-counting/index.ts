import { readFile } from 'fs-extra'
import { solve1 } from './solution';

run();

async function run() {
  const input = await readFile(`${__dirname}/input.txt`);
  const result1 = solve1(input.toString());

  console.log(`Solution 1: ${result1}`);
}

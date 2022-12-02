import { readFile } from 'fs-extra'
import { solve } from './solution';

run();

async function run() {
  const input = await readFile(`${__dirname}/input.txt`);
  const result = solve(input.toString());

  console.log(`Solution: ${result}`);
}

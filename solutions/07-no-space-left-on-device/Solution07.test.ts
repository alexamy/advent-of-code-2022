import dedent from 'ts-dedent';
import { expect, it } from 'vitest';
import { solve1 } from './Solution07.gen';

it.skip('solves first part', () => {
  const input = dedent`
    $ cd /
    $ ls
    dir a
    14848514 b.txt
    8504156 c.dat
    dir d
    $ cd a
    $ ls
    dir e
    29116 f
    2557 g
    62596 h.lst
    $ cd e
    $ ls
    584 i
    $ cd ..
    $ cd ..
    $ cd d
    $ ls
    4060174 j
    8033020 d.log
    5626152 d.ext
    7214296 k
  `;

  expect(solve1(input)).toBe(95437);
});

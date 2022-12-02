import { expect, it } from 'vitest';
import { dedent } from 'ts-dedent';
import { getLineGroups } from '.';

it('groups numbers splitted by newline', () => {
  const result = getLineGroups(dedent`
    1

    1
  `)

  expect(result).toEqual([['1'], ['1']]);
});

it.todo('sums consecutive numbers');

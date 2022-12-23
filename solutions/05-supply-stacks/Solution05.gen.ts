/* TypeScript file generated from Solution05.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as Solution05BS__Es6Import from './Solution05.bs';
const Solution05BS: any = Solution05BS__Es6Import;

import type {Array_t as Belt_Array_t} from './Belt.gen';

import type {List_t as Belt_List_t} from './Belt.gen';

// tslint:disable-next-line:interface-over-type-literal
export type Parse_instruction = {
  readonly from: number; 
  readonly to_: number; 
  readonly count: number
};

export const solve1: (input:string) => [Belt_Array_t<Belt_List_t<string>>, Parse_instruction[]] = Solution05BS.solve1;

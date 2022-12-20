// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as Belt_Int from "rescript/lib/es6/belt_Int.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";

function identity(x) {
  return x;
}

function first(param) {
  return param[0];
}

function parseInstruction(cmd) {
  return Belt_Option.mapWithDefault(Belt_Int.fromString(cmd), /* Noop */0, (function (n) {
                return /* Addx */{
                        _0: n
                      };
              }));
}

function toInstruction(cmd) {
  return Belt_Option.getWithDefault(Belt_Option.map(Caml_option.null_to_opt(/addx (-?\d+)/.exec(cmd)), (function (r) {
                    return Belt_Option.getWithDefault(Belt_Option.map(Caml_option.nullable_to_opt(Belt_Option.getWithDefault(Belt_Array.get(r, 1), "")), parseInstruction), /* Noop */0);
                  })), /* Noop */0);
}

function toFunction(cmd) {
  if (!cmd) {
    return {
            steps: [identity],
            result: identity
          };
  }
  var n = cmd._0;
  return {
          steps: [
            identity,
            identity
          ],
          result: (function (x) {
              return x + n | 0;
            })
        };
}

function processCycle(param, cycle) {
  var nextValue = param[1];
  return [
          param[0].concat(cycle.steps.map(function (step) {
                    return Curry._1(step, nextValue);
                  })),
          Curry._1(cycle.result, nextValue)
        ];
}

function getCycleValues(input) {
  return first(input.split("\n").map(toInstruction).map(toFunction).reduce(processCycle, [
                  [1],
                  1
                ]));
}

function solve1(input) {
  var indexes = [
    20,
    60,
    100,
    140,
    180,
    220
  ];
  var values = getCycleValues(input);
  return indexes.map(function (i) {
                return Math.imul(i, Belt_Option.getWithDefault(Belt_Array.get(values, i), 0));
              }).reduce((function (a, b) {
                return a + b | 0;
              }), 0);
}

function solve2(_input) {
  
}

export {
  identity ,
  first ,
  parseInstruction ,
  toInstruction ,
  toFunction ,
  processCycle ,
  getCycleValues ,
  solve1 ,
  solve2 ,
}
/* No side effect */

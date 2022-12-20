// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as Belt_Int from "rescript/lib/es6/belt_Int.js";
import * as Caml_array from "rescript/lib/es6/caml_array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";

function identity(x) {
  return x;
}

function parseAddx(cmd) {
  return Belt_Option.mapWithDefault(Belt_Int.fromString(Belt_Option.mapWithDefault(cmd, "", identity)), /* Noop */0, (function (n) {
                return /* Addx */{
                        _0: n
                      };
              }));
}

function toInstruction(cmd) {
  var result = /addx (-?\d+)/.exec(cmd);
  if (result !== null) {
    return parseAddx(Caml_option.nullable_to_opt(Caml_array.get(result, 1)));
  } else {
    return /* Noop */0;
  }
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

function solve1(input) {
  var indexes = [
    20,
    60,
    100,
    140,
    180,
    220
  ];
  var match = input.split("\n").map(toInstruction).map(toFunction).reduce(processCycle, [
        [1],
        1
      ]);
  var values = match[0];
  return indexes.map(function (i) {
                return Math.imul(i, Caml_array.get(values, i));
              }).reduce((function (a, b) {
                return a + b | 0;
              }), 0);
}

function solve2(_input) {
  
}

export {
  identity ,
  parseAddx ,
  toInstruction ,
  toFunction ,
  processCycle ,
  solve1 ,
  solve2 ,
}
/* No side effect */

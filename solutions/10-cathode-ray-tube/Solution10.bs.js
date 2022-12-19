// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as Belt_Int from "rescript/lib/es6/belt_Int.js";
import * as Caml_array from "rescript/lib/es6/caml_array.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";

function identity(x) {
  return x;
}

function parseAddx(cmd) {
  if (cmd === undefined) {
    return /* Noop */0;
  }
  var n = Belt_Int.fromString(cmd);
  if (n !== undefined) {
    return /* Addx */{
            _0: n
          };
  } else {
    return /* Noop */0;
  }
}

function toInstruction(cmd) {
  var addxRe = /addx (-?\d+)/;
  var result = addxRe.exec(cmd);
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

function solve1(input) {
  var res = input.split("\n").map(toInstruction).map(toFunction).reduce((function (acc, val) {
          val.steps.forEach(function (f) {
                acc.steps.push(Curry._1(f, acc.result));
              });
          return {
                  steps: acc.steps,
                  result: Curry._1(val.result, acc.result)
                };
        }), {
        steps: [1],
        result: 1
      });
  var steps = res.steps;
  return [
              20,
              60,
              100,
              140,
              180,
              220
            ].map(function (i) {
                return Math.imul(i, Caml_array.get(steps, i));
              }).reduce((function (a, b) {
                return a + b | 0;
              }), 0);
}

function solve2(_input) {
  return 0;
}

export {
  identity ,
  parseAddx ,
  toInstruction ,
  toFunction ,
  solve1 ,
  solve2 ,
}
/* No side effect */

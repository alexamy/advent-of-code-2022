// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as Belt_Int from "rescript/lib/es6/belt_Int.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";

function identity(x) {
  return x;
}

function parseInstruction(cmd) {
  return Belt_Option.mapWithDefault(Belt_Int.fromString(cmd), /* Noop */0, (function (n) {
                return /* Addx */{
                        _0: n
                      };
              }));
}

function toInstruction(cmd) {
  return Belt_Option.getWithDefault(Belt_Option.map(Caml_option.nullable_to_opt(Belt_Option.getWithDefault(Belt_Option.flatMap(Caml_option.null_to_opt(/addx (-?\d+)/.exec(cmd)), (function (r) {
                                return Belt_Array.get(r, 1);
                              })), "")), parseInstruction), /* Noop */0);
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

function processCycle(param, param$1) {
  var nextValue = param.nextValue;
  return {
          values: param.values.concat(param$1.steps.map(function (step) {
                    return Curry._1(step, nextValue);
                  })),
          nextValue: Curry._1(param$1.result, nextValue)
        };
}

function getCycleValues(input) {
  return input.split("\n").map(toInstruction).map(toFunction).reduce(processCycle, {
              values: [1],
              nextValue: 1
            }).values;
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

function pixel(pixel$1) {
  if (pixel$1) {
    return "#";
  } else {
    return ".";
  }
}

function screen(pixels, param) {
  var width = param.width;
  var rowIndexes = Belt_Array.range(0, param.height - 1 | 0);
  return Belt_Array.joinWith(Belt_Array.map(Belt_Array.map(rowIndexes, (function (row) {
                        return Belt_Array.slice(pixels, Math.imul(row, width), width);
                      })), (function (row) {
                    return Belt_Array.joinWith(row, "", identity);
                  })), "\n", identity);
}

var Show = {
  pixel: pixel,
  screen: screen
};

function fromCenter(center) {
  return {
          left: center - 1 | 0,
          center: center,
          right: center + 1 | 0
        };
}

var Sprite = {
  fromCenter: fromCenter
};

function toPixel(sprite, index) {
  var isLit = index === sprite.center || index === sprite.left || index === sprite.right;
  if (isLit) {
    return /* Lit */1;
  } else {
    return /* Empty */0;
  }
}

function solve2(input) {
  var spritePositions = getCycleValues(input).slice(1);
  return screen(Belt_Array.map(Belt_Array.mapWithIndex(spritePositions, (function (idx, position) {
                        var sprite = fromCenter(position);
                        var index = idx % 40;
                        return toPixel(sprite, index);
                      })), pixel), {
              width: 40,
              height: 6
            });
}

export {
  identity ,
  parseInstruction ,
  toInstruction ,
  toFunction ,
  processCycle ,
  getCycleValues ,
  solve1 ,
  Show ,
  Sprite ,
  toPixel ,
  solve2 ,
}
/* No side effect */

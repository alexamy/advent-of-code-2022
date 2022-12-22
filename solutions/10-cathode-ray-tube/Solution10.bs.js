// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as Belt_Int from "rescript/lib/es6/belt_Int.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Caml_int32 from "rescript/lib/es6/caml_int32.js";
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

function row(pixels, width, row$1) {
  return Belt_Array.joinWith(Belt_Array.map(Belt_Array.slice(pixels, Math.imul(row$1, width), width), pixel), "", identity);
}

function screen(pixels, size) {
  var partial_arg = size.width;
  return Belt_Array.joinWith(Belt_Array.map(Belt_Array.range(0, size.height - 1 | 0), (function (param) {
                    return row(pixels, partial_arg, param);
                  })), "\n", identity);
}

var Show = {
  pixel: pixel,
  row: row,
  screen: screen
};

function spritePainter(positions, width, idx) {
  var spriteCenter = Belt_Array.get(positions, idx);
  if (spriteCenter !== undefined) {
    var index = Caml_int32.mod_(idx, width);
    var isLit = index === spriteCenter || index === (spriteCenter - 1 | 0) || index === (spriteCenter + 1 | 0);
    if (isLit) {
      return /* Lit */1;
    } else {
      return /* Empty */0;
    }
  }
  throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
}

function solve2(input) {
  var spritePositions = getCycleValues(input).slice(1);
  var pixelSetter = function (param) {
    return spritePainter(spritePositions, 40, param);
  };
  return screen(Belt_Array.makeBy(spritePositions.length, pixelSetter), {
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
  spritePainter ,
  solve2 ,
}
/* No side effect */

// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Belt_Int from "rescript/lib/es6/belt_Int.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Caml_exceptions from "rescript/lib/es6/caml_exceptions.js";
import * as Caml_splice_call from "rescript/lib/es6/caml_splice_call.js";

var MalformedInstruction = /* @__PURE__ */Caml_exceptions.create("Solution05.Parse.MalformedInstruction");

var CrateElementNotFound = /* @__PURE__ */Caml_exceptions.create("Solution05.Parse.CrateElementNotFound");

function parseInstruction(input) {
  var result = Belt_Option.getWithDefault(Belt_Option.map(Caml_option.null_to_opt(/^move (\d+) from (\d+) to (\d+)$/.exec(input)), (function (prim) {
                  return prim;
                })), []).slice(1).map(function (result) {
        return Belt_Option.flatMap((result == null) ? undefined : Caml_option.some(result), Belt_Int.fromString);
      });
  if (result.length !== 3) {
    throw {
          RE_EXN_ID: MalformedInstruction,
          _1: input,
          Error: new Error()
        };
  }
  var count = result[0];
  if (count !== undefined) {
    var from = result[1];
    if (from !== undefined) {
      var to_ = result[2];
      if (to_ !== undefined) {
        return {
                from: from - 1 | 0,
                to_: to_ - 1 | 0,
                count: count
              };
      }
      throw {
            RE_EXN_ID: MalformedInstruction,
            _1: input,
            Error: new Error()
          };
    }
    throw {
          RE_EXN_ID: MalformedInstruction,
          _1: input,
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: MalformedInstruction,
        _1: input,
        Error: new Error()
      };
}

function getCratesContent(line) {
  return line.split("").filter(function (param, i) {
              return (i - 1 | 0) % 4 === 0;
            });
}

function transposeCrates(rows, i) {
  return rows.map(function (row) {
                  return Belt_Option.getWithDefault(Belt_Array.get(row, i), " ");
                }).filter(function (e) {
                return e !== " ";
              }).reverse();
}

function parseCrates(input) {
  var rows = input.map(getCratesContent).reverse();
  var count = Caml_splice_call.spliceApply(Math.max, [rows.map(function (prim) {
              return prim.length;
            })]);
  return Belt_Array.makeBy(count, (function (param) {
                return transposeCrates(rows, param);
              }));
}

function splitLines(input) {
  var lines = input.split("\n");
  var emptyLineIndex = lines.indexOf("");
  var match = Belt_Array.partition(lines, (function (line) {
          var index = lines.indexOf(line);
          return index < emptyLineIndex;
        }));
  var crates = match[0].slice(0, -1);
  var instructions = match[1].slice(1);
  return [
          crates,
          instructions
        ];
}

function isNotEmpty(line) {
  return line.search(/^\s*$/) === -1;
}

function make(input) {
  var match = splitLines(input);
  var crates = parseCrates(match[0]);
  var instructions = match[1].filter(isNotEmpty).map(parseInstruction);
  return [
          crates,
          instructions
        ];
}

var Parse = {
  MalformedInstruction: MalformedInstruction,
  CrateElementNotFound: CrateElementNotFound,
  parseInstruction: parseInstruction,
  getCratesContent: getCratesContent,
  transposeCrates: transposeCrates,
  parseCrates: parseCrates,
  splitLines: splitLines,
  isNotEmpty: isNotEmpty,
  make: make
};

var TheSameCrate = /* @__PURE__ */Caml_exceptions.create("Solution05.Process.TheSameCrate");

function moveCratesTo(crate, from, count, takeMode) {
  var top = Belt_Array.slice(from, 0, count);
  var moved = takeMode ? top : top.reverse();
  return moved.concat(crate);
}

function start(_param, takeMode) {
  while(true) {
    var param = _param;
    var instructions = param[1];
    var crates = param[0];
    if (instructions.length === 0) {
      return crates;
    }
    var match = Belt_Array.getExn(instructions, 0);
    var count = match.count;
    var to_ = match.to_;
    var from = match.from;
    var cratesMoved = crates.map((function(crates,from,to_,count){
        return function (crate, i) {
          var match = i === from;
          var match$1 = i === to_;
          if (!match) {
            if (match$1) {
              return moveCratesTo(crate, Belt_Array.getExn(crates, from), count, takeMode);
            } else {
              return crate;
            }
          }
          if (match$1) {
            throw {
                  RE_EXN_ID: TheSameCrate,
                  Error: new Error()
                };
          }
          return crate.slice(count);
        }
        }(crates,from,to_,count)));
    var otherInstructions = instructions.slice(1);
    _param = [
      cratesMoved,
      otherInstructions
    ];
    continue ;
  };
}

function getTop(crates) {
  return crates.map(function (crate) {
              return Belt_Option.getExn(Belt_Array.get(crate, 0));
            });
}

var Process = {
  TheSameCrate: TheSameCrate,
  moveCratesTo: moveCratesTo,
  start: start,
  getTop: getTop
};

function solve1(input) {
  return getTop(start(make(input), /* One */0)).join("");
}

function solve2(input) {
  return getTop(start(make(input), /* All */1)).join("");
}

export {
  Parse ,
  Process ,
  solve1 ,
  solve2 ,
}
/* No side effect */

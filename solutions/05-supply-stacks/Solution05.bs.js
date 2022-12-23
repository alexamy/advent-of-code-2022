// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Belt_Int from "rescript/lib/es6/belt_Int.js";
import * as Belt_List from "rescript/lib/es6/belt_List.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Caml_exceptions from "rescript/lib/es6/caml_exceptions.js";
import * as Caml_splice_call from "rescript/lib/es6/caml_splice_call.js";

var MalformedInstruction = /* @__PURE__ */Caml_exceptions.create("Solution05.Process.MalformedInstruction");

var CrateElementNotFound = /* @__PURE__ */Caml_exceptions.create("Solution05.Process.CrateElementNotFound");

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
                from: from,
                to_: to_,
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

function parseCrates(input) {
  var rows = input.map(function (line) {
          return line.split("").filter(function (param, i) {
                      return (i - 1 | 0) % 4 === 0;
                    });
        }).reverse();
  var count = Caml_splice_call.spliceApply(Math.max, [rows.map(function (prim) {
              return prim.length;
            })]);
  return Belt_Array.makeBy(count, (function (i) {
                return Belt_List.fromArray(rows.map(function (row) {
                                  return Belt_Option.getWithDefault(Belt_Array.get(row, i), " ");
                                }).filter(function (e) {
                                return e !== " ";
                              }));
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

function split(input) {
  var match = splitLines(input);
  var crates = parseCrates(match[0]);
  var instructions = match[1].map(parseInstruction);
  return [
          crates,
          instructions
        ];
}

var Process = {
  MalformedInstruction: MalformedInstruction,
  CrateElementNotFound: CrateElementNotFound,
  parseInstruction: parseInstruction,
  parseCrates: parseCrates,
  splitLines: splitLines,
  split: split
};

var solve1 = split;

export {
  Process ,
  solve1 ,
}
/* No side effect */

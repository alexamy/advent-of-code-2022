// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Js_string from "rescript/lib/es6/js_string.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_SetString from "rescript/lib/es6/belt_SetString.js";
import * as Caml_exceptions from "rescript/lib/es6/caml_exceptions.js";

var MalformedInput = /* @__PURE__ */Caml_exceptions.create("Solution.MalformedInput");

function solve1(message) {
  var indexes = Belt_Array.range(0, message.length);
  var target = Belt_Array.getBy(indexes, (function (idx) {
          var fours = Js_string.slice(idx, idx + 4 | 0, message);
          var chars = Js_string.split("", fours);
          var uniqueChars = Belt_SetString.fromArray(chars);
          return Belt_SetString.size(uniqueChars) === 4;
        }));
  if (target !== undefined) {
    return target + 4 | 0;
  }
  throw {
        RE_EXN_ID: MalformedInput,
        Error: new Error()
      };
}

export {
  MalformedInput ,
  solve1 ,
}
/* No side effect */

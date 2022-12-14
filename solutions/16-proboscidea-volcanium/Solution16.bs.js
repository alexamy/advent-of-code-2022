// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Belt_Int from "rescript/lib/es6/belt_Int.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Belt_MapString from "rescript/lib/es6/belt_MapString.js";

function toMap(valves) {
  return valves.reduce((function (map, valve) {
                return Belt_MapString.set(map, valve.name, valve);
              }), undefined);
}

function splitMatches(matches) {
  var name = Belt_Array.getExn(matches, 1);
  var rate = Belt_Option.getExn(Belt_Int.fromString(Belt_Array.getExn(matches, 2)));
  var targets = Belt_Array.getExn(matches, 3).split(", ");
  return {
          name: name,
          rate: rate,
          targets: targets
        };
}

function toValveInfo(info) {
  return splitMatches(Belt_Option.getExn(Belt_Option.map(Caml_option.null_to_opt(/^Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? (.*)$/.exec(info)), (function (prim) {
                          return prim;
                        }))).map(function (s) {
                  return Belt_Option.getExn((s == null) ? undefined : Caml_option.some(s));
                }));
}

function start(input) {
  return toMap(input.split("\n").map(toValveInfo));
}

var Process = {
  toMap: toMap,
  splitMatches: splitMatches,
  toValveInfo: toValveInfo,
  start: start
};

var solve1 = start;

function solve2(_input) {
  
}

export {
  Process ,
  solve1 ,
  solve2 ,
}
/* No side effect */

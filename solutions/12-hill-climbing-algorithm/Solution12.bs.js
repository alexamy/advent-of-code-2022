// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";

function at(heightmap, param) {
  var colIndex = param[1];
  return Belt_Option.flatMap(Belt_Array.get(heightmap, param[0]), (function (row) {
                return Belt_Array.get(row, colIndex);
              }));
}

function findIndex(heightmap, ch) {
  var rowIndex = Belt_Array.getIndexBy(heightmap, (function (row) {
          return row.includes(ch);
        }));
  var colIndex = Belt_Option.flatMap(Belt_Option.flatMap(rowIndex, (function (i) {
              return Belt_Array.get(heightmap, i);
            })), (function (row) {
          return Belt_Array.getIndexBy(row, (function (el) {
                        return el === ch;
                      }));
        }));
  if (rowIndex !== undefined && colIndex !== undefined) {
    return [
            rowIndex,
            colIndex
          ];
  }
  
}

var Heightmap = {
  at: at,
  findIndex: findIndex
};

function fromCharCode(prim) {
  return String.fromCharCode(prim);
}

function toCharCode(s) {
  return s.charCodeAt(0);
}

function getCharLess(s) {
  return String.fromCharCode((s.charCodeAt(0) | 0) - 1 | 0);
}

var Char = {
  fromCharCode: fromCharCode,
  toCharCode: toCharCode,
  getCharLess: getCharLess
};

function start(input) {
  return input.split("\n").map(function (s) {
              return s.split("");
            });
}

var Parse = {
  start: start
};

function findShortestPath(heightmap) {
  Belt_Option.getExn(findIndex(heightmap, "E"));
}

var Solution1 = {
  findShortestPath: findShortestPath
};

var solve1 = start;

function solve2(_input) {
  
}

export {
  Heightmap ,
  Char ,
  Parse ,
  Solution1 ,
  solve1 ,
  solve2 ,
}
/* No side effect */

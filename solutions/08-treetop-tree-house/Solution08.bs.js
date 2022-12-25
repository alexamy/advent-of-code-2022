// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Belt_Int from "rescript/lib/es6/belt_Int.js";
import * as Caml_obj from "rescript/lib/es6/caml_obj.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";

function getTree(trees, row, col) {
  return Belt_Array.getExn(Belt_Array.getExn(trees, row), col);
}

function isVisible(trees, _param, _param$1) {
  while(true) {
    var param = _param;
    var param$1 = _param$1;
    var right = param$1[3];
    var bottom = param$1[2];
    var left = param$1[1];
    var top = param$1[0];
    var col = param[1];
    var row = param[0];
    var isEnd = top >= row && bottom <= row && right <= col && left >= col;
    var lastRow = trees.length - 1 | 0;
    var lastCol = Belt_Array.getExn(trees, 0).length - 1 | 0;
    var isEdge = row === 0 || col === 0 || row === lastRow || col === lastCol;
    var tree = getTree(trees, row, col);
    var treeTop = getTree(trees, top, col);
    var treeRight = getTree(trees, row, right);
    var treeBottom = getTree(trees, bottom, col);
    var treeLeft = getTree(trees, row, left);
    var isSomeHigher = top < row && Caml_obj.greaterequal(treeTop, tree) || right > col && Caml_obj.greaterequal(treeRight, tree) || bottom > row && Caml_obj.greaterequal(treeBottom, tree) || left < col && Caml_obj.greaterequal(treeLeft, tree);
    if (isEnd) {
      return true;
    }
    if (isEdge) {
      return true;
    }
    if (isSomeHigher) {
      return false;
    }
    _param$1 = [
      top + 1 | 0,
      left + 1 | 0,
      bottom - 1 | 0,
      right - 1 | 0
    ];
    _param = [
      row,
      col
    ];
    continue ;
  };
}

function start(trees) {
  var visibility = trees.map(function (row, rowIdx) {
        return row.map(function (param, colIdx) {
                    var lastRow = trees.length - 1 | 0;
                    var lastCol = Belt_Array.getExn(trees, 0).length - 1 | 0;
                    return isVisible(trees, [
                                rowIdx,
                                colIdx
                              ], [
                                0,
                                0,
                                lastRow,
                                lastCol
                              ]);
                  });
      });
  return Belt_Array.flatMap(visibility, (function (x) {
                  return x;
                })).filter(function (x) {
              return x === true;
            }).length;
}

var Calculate = {
  getTree: getTree,
  isVisible: isVisible,
  start: start
};

function toNumber(n) {
  return Belt_Option.getExn(Belt_Int.fromString(n));
}

function makeLine(line) {
  return line.split("").map(toNumber);
}

function make(input) {
  return input.split("\n").map(makeLine);
}

var Process = {
  toNumber: toNumber,
  makeLine: makeLine,
  make: make
};

function solve1(input) {
  return start(make(input));
}

function solve2(_input) {
  
}

export {
  Calculate ,
  Process ,
  solve1 ,
  solve2 ,
}
/* No side effect */
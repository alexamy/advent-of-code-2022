// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as Belt_Int from "rescript/lib/es6/belt_Int.js";
import * as Caml_obj from "rescript/lib/es6/caml_obj.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_splice_call from "rescript/lib/es6/caml_splice_call.js";

function isHigherThan(tree, other) {
  return Caml_obj.greaterequal(other, tree);
}

function getDimensions(trees) {
  var rows = trees.length;
  var cols = Belt_Option.getWithDefault(Belt_Array.get(trees, 0), []).length;
  return [
          rows,
          cols
        ];
}

function isAtEdge(trees, param) {
  var col = param[1];
  var row = param[0];
  var match = getDimensions(trees);
  var isRowEdge = row === 0 || row === (match[0] - 1 | 0);
  var isColEdge = col === 0 || col === (match[1] - 1 | 0);
  if (isRowEdge) {
    return true;
  } else {
    return isColEdge;
  }
}

function getTree(trees, param) {
  return Belt_Array.get(Belt_Option.getWithDefault(Belt_Array.get(trees, param[0]), []), param[1]);
}

function getNeighbours(trees, param, offset) {
  var col = param[1];
  var row = param[0];
  var top = getTree(trees, [
        row - offset | 0,
        col
      ]);
  var left = getTree(trees, [
        row,
        col - offset | 0
      ]);
  var bottom = getTree(trees, [
        row + offset | 0,
        col
      ]);
  var right = getTree(trees, [
        row,
        col + offset | 0
      ]);
  return {
          top: top,
          left: left,
          bottom: bottom,
          right: right
        };
}

function mapi(trees, f) {
  return trees.map(function (line, row) {
              return line.map(function (tree, col) {
                          return Curry._2(f, tree, [
                                      row,
                                      col
                                    ]);
                        });
            });
}

var Trees = {
  isHigherThan: isHigherThan,
  getDimensions: getDimensions,
  isAtEdge: isAtEdge,
  getTree: getTree,
  getNeighbours: getNeighbours,
  mapi: mapi
};

function movePosition(param, direction) {
  var match;
  switch (direction) {
    case /* Top */0 :
        match = [
          -1,
          0
        ];
        break;
    case /* Left */1 :
        match = [
          0,
          -1
        ];
        break;
    case /* Right */2 :
        match = [
          0,
          1
        ];
        break;
    case /* Bottom */3 :
        match = [
          1,
          0
        ];
        break;
    
  }
  return [
          param[0] + match[0] | 0,
          param[1] + match[1] | 0
        ];
}

function isVisibleInside(trees, tree, _position, direction) {
  while(true) {
    var position = _position;
    var isHigher = Belt_Option.map(getTree(trees, position), (function (param) {
            return Caml_obj.greaterequal(param, tree);
          }));
    if (isHigher === undefined) {
      return true;
    }
    if (isHigher) {
      return false;
    }
    var newPosition = movePosition(position, direction);
    _position = newPosition;
    continue ;
  };
}

function isVisibleFrom(trees, position, direction) {
  var tree = Belt_Option.getExn(getTree(trees, position));
  var newPosition = movePosition(position, direction);
  return isVisibleInside(trees, tree, newPosition, direction);
}

function isVisible(trees, position) {
  if (isAtEdge(trees, position) || isVisibleFrom(trees, position, /* Top */0) || isVisibleFrom(trees, position, /* Left */1) || isVisibleFrom(trees, position, /* Bottom */3)) {
    return true;
  } else {
    return isVisibleFrom(trees, position, /* Right */2);
  }
}

function start(trees) {
  return Belt_Array.flatMap(mapi(trees, (function (param, position) {
                      return isVisible(trees, position);
                    })), (function (x) {
                  return x;
                })).filter(function (x) {
              return x === true;
            }).length;
}

var CalcVisibility = {
  movePosition: movePosition,
  isVisibleInside: isVisibleInside,
  isVisibleFrom: isVisibleFrom,
  isVisible: isVisible,
  start: start
};

function getScore(_trees, _position) {
  return 0;
}

function start$1(trees) {
  return Caml_splice_call.spliceApply(Math.max, [Belt_Array.flatMap(mapi(trees, (function (param, position) {
                          return 0;
                        })), (function (x) {
                      return x;
                    }))]);
}

var CalcScore = {
  getScore: getScore,
  start: start$1
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

function solve2(input) {
  return start$1(make(input));
}

export {
  Trees ,
  CalcVisibility ,
  CalcScore ,
  Process ,
  solve1 ,
  solve2 ,
}
/* No side effect */

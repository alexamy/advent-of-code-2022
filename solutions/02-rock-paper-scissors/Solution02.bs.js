// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Caml_exceptions from "rescript/lib/es6/caml_exceptions.js";

var MalformedRow = /* @__PURE__ */Caml_exceptions.create("Solution02.MalformedRow");

var UnknownFigure = /* @__PURE__ */Caml_exceptions.create("Solution02.UnknownFigure");

function splitRow(row) {
  var match = row.split(" ");
  if (match.length !== 2) {
    throw {
          RE_EXN_ID: MalformedRow,
          _1: row,
          Error: new Error()
        };
  }
  var enemy = match[0];
  var player = match[1];
  return [
          enemy,
          player
        ];
}

function parse(input) {
  return input.split("\n").filter(function (r) {
                return r !== "";
              }).map(splitRow);
}

function getFigures(param) {
  var player = param[1];
  var enemy = param[0];
  var enemy$1;
  switch (enemy) {
    case "A" :
        enemy$1 = /* Rock */0;
        break;
    case "B" :
        enemy$1 = /* Paper */1;
        break;
    case "C" :
        enemy$1 = /* Scissors */2;
        break;
    default:
      throw {
            RE_EXN_ID: UnknownFigure,
            _1: enemy,
            Error: new Error()
          };
  }
  var player$1;
  switch (player) {
    case "X" :
        player$1 = /* Rock */0;
        break;
    case "Y" :
        player$1 = /* Paper */1;
        break;
    case "Z" :
        player$1 = /* Scissors */2;
        break;
    default:
      throw {
            RE_EXN_ID: UnknownFigure,
            _1: player,
            Error: new Error()
          };
  }
  return [
          enemy$1,
          player$1
        ];
}

function getPlayerScore(player) {
  return player + 1 | 0;
}

function getRoundResult(param) {
  var player = param[1];
  switch (param[0]) {
    case /* Rock */0 :
        switch (player) {
          case /* Rock */0 :
              return /* Draw */1;
          case /* Paper */1 :
              return /* Won */2;
          case /* Scissors */2 :
              return /* Lost */0;
          
        }
    case /* Paper */1 :
        return player;
    case /* Scissors */2 :
        switch (player) {
          case /* Rock */0 :
              return /* Won */2;
          case /* Paper */1 :
              return /* Lost */0;
          case /* Scissors */2 :
              return /* Draw */1;
          
        }
    
  }
}

function getRoundScore(result) {
  switch (result) {
    case /* Lost */0 :
        return 0;
    case /* Draw */1 :
        return 3;
    case /* Won */2 :
        return 6;
    
  }
}

function getScore(param) {
  var player = param[1];
  var playerScore = player + 1 | 0;
  var roundScore = getRoundScore(getRoundResult([
            param[0],
            player
          ]));
  return playerScore + roundScore | 0;
}

function solve1(input) {
  return parse(input).map(getFigures).map(getScore).reduce((function (a, b) {
                return a + b | 0;
              }), 0);
}

export {
  MalformedRow ,
  UnknownFigure ,
  splitRow ,
  parse ,
  getFigures ,
  getPlayerScore ,
  getRoundResult ,
  getRoundScore ,
  getScore ,
  solve1 ,
}
/* No side effect */

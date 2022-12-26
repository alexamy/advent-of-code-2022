// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Caml_exceptions from "rescript/lib/es6/caml_exceptions.js";

var MalformedRow = /* @__PURE__ */Caml_exceptions.create("Solution02.MalformedRow");

var UnknownCharacter = /* @__PURE__ */Caml_exceptions.create("Solution02.UnknownCharacter");

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

function start(input) {
  return input.split("\n").filter(function (r) {
                return r !== "";
              }).map(splitRow);
}

var Parse = {
  splitRow: splitRow,
  start: start
};

function enemy(enemy$1) {
  switch (enemy$1) {
    case "A" :
        return /* Rock */0;
    case "B" :
        return /* Paper */1;
    case "C" :
        return /* Scissors */2;
    default:
      throw {
            RE_EXN_ID: UnknownCharacter,
            _1: enemy$1,
            Error: new Error()
          };
  }
}

function player(player$1) {
  switch (player$1) {
    case "X" :
        return /* Rock */0;
    case "Y" :
        return /* Paper */1;
    case "Z" :
        return /* Scissors */2;
    default:
      throw {
            RE_EXN_ID: UnknownCharacter,
            _1: player$1,
            Error: new Error()
          };
  }
}

function round(round$1) {
  switch (round$1) {
    case "X" :
        return /* Lost */0;
    case "Y" :
        return /* Draw */1;
    case "Z" :
        return /* Won */2;
    default:
      throw {
            RE_EXN_ID: UnknownCharacter,
            _1: round$1,
            Error: new Error()
          };
  }
}

var Figure = {
  enemy: enemy,
  player: player,
  round: round
};

function getResult(enemy, player) {
  switch (enemy) {
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

function getPlayerFigure(enemy, result) {
  switch (enemy) {
    case /* Rock */0 :
        switch (result) {
          case /* Lost */0 :
              return /* Scissors */2;
          case /* Draw */1 :
              return /* Rock */0;
          case /* Won */2 :
              return /* Paper */1;
          
        }
    case /* Paper */1 :
        return result;
    case /* Scissors */2 :
        switch (result) {
          case /* Lost */0 :
              return /* Paper */1;
          case /* Draw */1 :
              return /* Scissors */2;
          case /* Won */2 :
              return /* Rock */0;
          
        }
    
  }
}

var Round = {
  getResult: getResult,
  getPlayerFigure: getPlayerFigure
};

function forPlayer(player) {
  return player + 1 | 0;
}

function forRound(result) {
  switch (result) {
    case /* Lost */0 :
        return 0;
    case /* Draw */1 :
        return 3;
    case /* Won */2 :
        return 6;
    
  }
}

function calculate(param) {
  var player = param[1];
  var result = getResult(param[0], player);
  var roundScore = forRound(result);
  var playerScore = player + 1 | 0;
  return playerScore + roundScore | 0;
}

function sum(arr) {
  return arr.reduce((function (a, b) {
                return a + b | 0;
              }), 0);
}

var Score = {
  forPlayer: forPlayer,
  forRound: forRound,
  calculate: calculate,
  sum: sum
};

function solve1(input) {
  return sum(start(input).map(function (param) {
                    return [
                            enemy(param[0]),
                            player(param[1])
                          ];
                  }).map(calculate));
}

function solve2(input) {
  return sum(start(input).map(function (param) {
                      return [
                              enemy(param[0]),
                              round(param[1])
                            ];
                    }).map(function (param) {
                    var enemy = param[0];
                    return [
                            enemy,
                            getPlayerFigure(enemy, param[1])
                          ];
                  }).map(calculate));
}

export {
  MalformedRow ,
  UnknownCharacter ,
  Parse ,
  Figure ,
  Round ,
  Score ,
  solve1 ,
  solve2 ,
}
/* No side effect */

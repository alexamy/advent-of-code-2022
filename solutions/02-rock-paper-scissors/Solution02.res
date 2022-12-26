@@warning("-33")
open Belt

exception MalformedRow(string)
exception UnknownCharacter(string)

type figure = Rock | Paper | Scissors
type round = Lost | Draw | Won

module Parse = {
  let splitRow = row => {
    switch Js.String2.split(row, " ") {
    | [enemy, player] => (enemy, player)
    | _ => raise(MalformedRow(row))
    }
  }

  let start = input => {
    input
    ->Js.String2.split("\n")
    ->Js.Array2.filter(r => r !== "")
    ->Js.Array2.map(splitRow)
  }
}

module Char = {
  let enemy = enemy => {
    switch enemy {
    | "A" => Rock
    | "B" => Paper
    | "C" => Scissors
    | _ => raise(UnknownCharacter(enemy))
    }
  }

  let player = player => {
    switch player {
    | "X" => Rock
    | "Y" => Paper
    | "Z" => Scissors
    | _ => raise(UnknownCharacter(player))
    }
  }

  let round = round => {
    switch round {
    | "X" => Lost
    | "Y" => Draw
    | "Z" => Won
    | _ => raise(UnknownCharacter(round))
    }
  }
}

module Round = {
  let get = (enemy, player) => {
    switch (enemy, player) {
    | (Rock, Scissors) => Lost
    | (Rock, Rock) => Draw
    | (Rock, Paper) => Won
    | (Scissors, Paper) => Lost
    | (Scissors, Scissors) => Draw
    | (Scissors, Rock) => Won
    | (Paper, Rock) => Lost
    | (Paper, Paper) => Draw
    | (Paper, Scissors) => Won
    }
  }

  let getPlayerFigure = (enemy, round) => {
    switch (enemy, round) {
    | (Rock, Lost) => Scissors
    | (Rock, Draw) => Rock
    | (Rock, Won) => Paper
    | (Scissors, Lost) => Paper
    | (Scissors, Draw) => Scissors
    | (Scissors, Won) => Rock
    | (Paper, Lost) => Rock
    | (Paper, Draw) => Paper
    | (Paper, Won) => Scissors
    }
  }
}

module Score = {
  let forPlayer = player => {
    switch player {
    | Rock => 1
    | Paper => 2
    | Scissors => 3
    }
  }

  let forRound = round => {
    switch round {
    | Lost => 0
    | Draw => 3
    | Won => 6
    }
  }

  let calculate = ((enemy, player)) => {
    let round = Round.get(enemy, player)

    forPlayer(player) + forRound(round)
  }

  let sum = arr => Js.Array2.reduce(arr, (a, b) => a + b, 0)
}

@genType
let solve1 = (input: string) => {
  input
  ->Parse.start
  ->Js.Array2.map(((enemy, player)) => (Char.enemy(enemy), Char.player(player)))
  ->Js.Array2.map(Score.calculate)
  ->Score.sum
}

@genType
let solve2 = (input: string) => {
  input
  ->Parse.start
  ->Js.Array2.map(((enemy, round)) => (Char.enemy(enemy), Char.round(round)))
  ->Js.Array2.map(((enemy, round)) => (enemy, Round.getPlayerFigure(enemy, round)))
  ->Js.Array2.map(Score.calculate)
  ->Score.sum
}

@@warning("-33")
open Belt

exception MalformedRow(string)
exception UnknownCharacter(string)

type figure = Rock | Paper | Scissors
type result = Lost | Draw | Won

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

module Figure = {
  let forEnemy = enemy => {
    switch enemy {
    | "A" => Rock
    | "B" => Paper
    | "C" => Scissors
    | _ => raise(UnknownCharacter(enemy))
    }
  }

  let forPlayer = player => {
    switch player {
    | "X" => Rock
    | "Y" => Paper
    | "Z" => Scissors
    | _ => raise(UnknownCharacter(player))
    }
  }

  let fromString = ((enemy, player)) => {
    (forEnemy(enemy), forPlayer(player))
  }
}

module Round = {
  let fromString = (player) => {
    switch player {
    | "X" => Lost
    | "Y" => Draw
    | "Z" => Won
    | _ => raise(UnknownCharacter(player))
    }
  }

  let getResult = ((enemy, player)) => {
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

  let getPlayerFigure = ((enemy, result)) => {
    switch (enemy, result) {
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

  let forRound = result => {
    switch result {
    | Lost => 0
    | Draw => 3
    | Won => 6
    }
  }

  let calculate = ((enemy, player)) => {
    let result = Round.getResult((enemy, player))
    let roundScore = forRound(result)
    let playerScore = forPlayer(player)

    playerScore + roundScore
  }

  let sum = arr => Js.Array2.reduce(arr, (a, b) => a + b, 0)
}

@genType
let solve1 = (input: string) => {
  input
  ->Parse.start
  ->Js.Array2.map(((enemy, player)) => (Figure.forEnemy(enemy), Figure.forPlayer(player)))
  ->Js.Array2.map(Score.calculate)
  ->Score.sum
}

@genType
let solve2 = (input: string) => {
  input
  ->Parse.start
  ->Js.Array2.map(((enemy, result)) => (Figure.forEnemy(enemy), Round.fromString(result)))
  ->Js.Array2.map(((enemy, result)) => (enemy, Round.getPlayerFigure((enemy, result))))
  ->Js.Array2.map(Score.calculate)
  ->Score.sum
}

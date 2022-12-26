open Belt

exception MalformedRow(string)
exception UnknownFigure(string)

type figure = Rock | Paper | Scissors
type result = Lost | Draw | Won

let splitRow = row => {
  switch Js.String2.split(row, " ") {
  | [enemy, player] => (enemy, player)
  | _ => raise(MalformedRow(row))
  }
}

let parse = input => {
  input
  ->Js.String2.split("\n")
  ->Js.Array2.filter(r => r !== "")
  ->Js.Array2.map(splitRow)
}

let getFigures = ((enemy, player)) => {
  let enemy = switch enemy {
  | "A" => Rock
  | "B" => Paper
  | "C" => Scissors
  | _ => raise(UnknownFigure(enemy))
  }

  let player = switch player {
  | "X" => Rock
  | "Y" => Paper
  | "Z" => Scissors
  | _ => raise(UnknownFigure(player))
  }

  (enemy, player)
}

let getPlayerScore = player => {
  switch player {
  | Rock => 1
  | Paper => 2
  | Scissors => 3
  }
}

let getRoundResult = ((enemy, player)) => {
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

let getRoundScore = result => {
  switch result {
  | Lost => 0
  | Draw => 3
  | Won => 6
  }
}

let getScore = ((enemy, player)) => {
  getPlayerScore(player) + getRoundResult((enemy, player))->getRoundScore
}

@genType
let solve1 = (input: string) => {
  input
  ->parse
  ->Js.Array2.map(getFigures)
  ->Js.Array2.map(getScore)
  ->Js.Array2.reduce((a, b) => a + b, 0)
}

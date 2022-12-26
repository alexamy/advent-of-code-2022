open Belt

exception MalformedRow(string)
exception UnknownFigure(string)

type figure = Rock | Paper | Scissors

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

let getRoundScore = ((enemy, player)) => {
  switch (enemy, player) {
  | (Rock, Scissors) => 0
  | (Rock, Rock) => 3
  | (Rock, Paper) => 6
  | (Scissors, Paper) => 0
  | (Scissors, Scissors) => 3
  | (Scissors, Rock) => 6
  | (Paper, Rock) => 0
  | (Paper, Paper) => 3
  | (Paper, Scissors) => 6
  }
}

let getScore = ((enemy, player)) => {
  getRoundScore((enemy, player)) + getPlayerScore(player)
}

@genType
let solve1 = (input: string) => {
  input
  ->parse
  ->Js.Array2.map(getFigures)
  ->Js.Array2.map(getScore)
  ->Js.Array2.reduce((a, b) => a + b, 0)
}

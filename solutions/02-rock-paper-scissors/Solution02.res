open Belt

exception MalformedRow(string)
exception UnknownFigure(string)

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
  let fromString = ((enemy, player)) => {
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
}

module Round = {
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
}

@genType
let solve1 = (input: string) => {
  input
  ->Parse.start
  ->Js.Array2.map(Figure.fromString)
  ->Js.Array2.map(Score.calculate)
  ->Js.Array2.reduce((a, b) => a + b, 0)
}

@genType
let solve2 = (input: string) => {
  input
  ->Parse.start
}

type instruction =
  | Noop
  | Addx(int)

type cycle = {
  steps: array<int => int>,
  result: int => int,
}

type result = {
  values: array<int>,
  nextValue: int,
}

let identity = x => x

let parseAddx = (cmd: option<string>): instruction => {
  switch cmd {
  | None => Noop
  | Some(n) =>
    switch Belt.Int.fromString(n) {
    | None => Noop
    | Some(n) => Addx(n)
    }
  }
}

let toInstruction = (cmd: string): instruction => {
  let addxRe = %re("/addx (-?\d+)/")
  let result = Js.Re.exec_(addxRe, cmd)
  switch result {
  | None => Noop
  | Some(r) => Js.Re.captures(r)[1]->Js.Nullable.toOption->parseAddx
  }
}

let toFunction = (cmd: instruction): cycle => {
  switch cmd {
  | Noop => { steps: [identity], result: identity }
  | Addx(n) => { steps: [identity, identity], result: x => x + n }
  }
}

let processCycle = (result, cycle): result => {
  nextValue: cycle.result(result.nextValue),
  values: cycle.steps
    ->Js.Array2.map(step => step(result.nextValue))
    ->Js.Array2.concat(result.values, _),
}

@genType
let solve1 = (input: string): int => {
  let initial = { values: [1], nextValue: 1 }
  let indexes = [20, 60, 100, 140, 180, 220]

  let result = input
  ->Js.String2.split("\n")
  ->Js.Array2.map(toInstruction)
  ->Js.Array2.map(toFunction)
  ->Js.Array2.reduce(processCycle, initial)

  indexes
  ->Js.Array2.map(i => i * result.values[i])
  ->Js.Array2.reduce((a, b) => a + b, 0)
}

@genType
let solve2 = (_input: string): int => {
  0
}

type instruction =
  | Noop
  | Addx(int)

type cycle = {
  steps: array<int => int>,
  result: int => int,
}

type result = (array<int>, int)

let identity = x => x

let parseAddx = (cmd: option<string>): instruction => {
  cmd
  ->Belt.Option.mapWithDefault("", identity)
  ->Belt.Int.fromString
  ->Belt.Option.mapWithDefault(Noop, n => Addx(n))
}

let toInstruction = (cmd: string): instruction => {
  let result = %re("/addx (-?\d+)/")->Js.Re.exec_(cmd)
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

let processCycle = ((values, nextValue), cycle): result => {(
  cycle.steps
    ->Js.Array2.map(step => step(nextValue))
    ->Js.Array2.concat(values, _),
  cycle.result(nextValue),
)}

@genType
let solve1 = (input: string): int => {
  let indexes = [20, 60, 100, 140, 180, 220]

  let (values, _) = input
  ->Js.String2.split("\n")
  ->Js.Array2.map(toInstruction)
  ->Js.Array2.map(toFunction)
  ->Js.Array2.reduce(processCycle, ([1], 1))

  indexes
  ->Js.Array2.map(i => i * values[i])
  ->Js.Array2.reduce((a, b) => a + b, 0)
}

@genType
let solve2 = (_input: string): int => {
  0
}

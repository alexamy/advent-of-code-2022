open Belt

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

let parseInstruction = (cmd: string): instruction => {
  cmd
  ->Int.fromString
  ->Option.mapWithDefault(Noop, n => Addx(n))
}

let toInstruction = (cmd: string): instruction => {
  %re("/addx (-?\d+)/")
  ->Js.Re.exec_(cmd)
  ->Option.flatMap(r => Js.Re.captures(r)[1])
  ->Option.getWithDefault(Js.Nullable.return(""))
  ->Js.Nullable.toOption
  ->Option.map(parseInstruction)
  ->Option.getWithDefault(Noop)
}

let toFunction = (cmd: instruction): cycle => {
  switch cmd {
  | Noop => { steps: [identity], result: identity }
  | Addx(n) => { steps: [identity, identity], result: x => x + n }
  }
}

let processCycle = ({ values, nextValue }, { steps, result }): result => {
  nextValue: result(nextValue),
  values: steps
    ->Js.Array2.map(step => step(nextValue))
    ->Js.Array2.concat(values, _),
}

let getCycleValues = (input: string): array<int> => {
  input
  ->Js.String2.split("\n")
  ->Js.Array2.map(toInstruction)
  ->Js.Array2.map(toFunction)
  ->Js.Array2.reduce(processCycle, { values: [1], nextValue: 1 })
  ->(r => r.values)
}

@genType
let solve1 = (input: string): int => {
  let indexes = [20, 60, 100, 140, 180, 220]
  let values = getCycleValues(input)

  indexes
  ->Js.Array2.map(i => i * Option.getWithDefault(values[i], 0))
  ->Js.Array2.reduce((a, b) => a + b, 0)
}

@genType
let solve2 = (_input: string): 'a => {
  None
}

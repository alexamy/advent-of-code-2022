open Belt

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
  ->Option.getWithDefault("")
  ->Int.fromString
  ->Option.mapWithDefault(Noop, n => Addx(n))
}

let toInstruction = (cmd: string): instruction => {
  let result = %re("/addx (-?\d+)/")->Js.Re.exec_(cmd)
  switch result {
  | None => Noop
  | Some(r) => {
      let captures = Js.Re.captures(r)[1]
      switch captures {
      | None => Noop
      | Some(r) => r->Js.Nullable.toOption->parseAddx
      }
    }
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

let getCycleValues = (input: string): array<int> => {
  let (values, _) = input
  ->Js.String2.split("\n")
  ->Js.Array2.map(toInstruction)
  ->Js.Array2.map(toFunction)
  ->Js.Array2.reduce(processCycle, ([1], 1))

  values
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

type instruction =
  | Noop
  | Addx(int)

type cycle = {
  steps: array<int => int>,
  result: int => int,
}

type result = {
  steps: array<int>,
  result: int,
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

@genType
let solve1 = (input: string): int => {
  let res = input
  ->Js.String2.split("\n")
  ->Js.Array2.map(toInstruction)
  ->Js.Array2.map(toFunction)
  ->Js.Array2.reduce((acc, val) => {
    Js.Array2.forEach(val.steps, f => {
      Js.Array2.push(acc.steps, f(acc.result))->ignore
    })
    { steps: acc.steps, result: val.result(acc.result) }
  }, { steps: [1], result: 1 })

  let steps = res.steps

  [20, 60, 100, 140, 180, 220]
  ->Js.Array2.map(i => i*steps[i])
  ->Js.Array2.reduce((a, b) => a + b, 0)
}

@genType
let solve2 = (_input: string): int => {
  0
}

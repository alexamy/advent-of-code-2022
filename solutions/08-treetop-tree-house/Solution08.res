open Belt

module Process = {
  type t = array<array<int>>

  let toNumber = n => n->Int.fromString->Option.getExn
  let makeLine = line => line->Js.String2.split("")->Js.Array2.map(toNumber)

  let make = (input: string): t => {
    input
    ->Js.String2.split("\n")
    ->Js.Array2.map(makeLine)
  }
}

@genType
let solve1 = (input: string) => {
  input
  ->Process.make
}

@genType
let solve2 = (_input: string) => {
  None
}

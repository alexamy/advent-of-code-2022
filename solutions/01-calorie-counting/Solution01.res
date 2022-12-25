open Belt

let parse = (input) => {
  input
  ->Js.String2.split("\n")
  ->Js.Array2.map(Belt.Int.fromString)
}

let rec split = (calories, result) => {
  let length = Js.Array2.length(calories)
  let endIndex = calories
    ->Array.getIndexBy(Option.isNone)
    ->Option.getWithDefault(length)

  let one = calories
    ->Js.Array2.slice(~start=0, ~end_=endIndex)
    ->Js.Array2.map(Option.getWithDefault(_, 0))
  Js.Array2.push(result, one)->ignore

  let others = calories->Js.Array2.sliceFrom(endIndex + 1)

  switch Js.Array2.length(others) {
  | 0 => result
  | _ => split(others, result)
  }
}

let sum = (arr) => Js.Array2.reduce(arr, (a, b) => a + b, 0)
let maxSorter = (a, b) => b - a

@genType
let solve1 = (input: string) => {
  input
  ->parse
  ->split([])
  ->Js.Array2.map(sum)
  ->Js.Math.maxMany_int
}

@genType
let solve2 = (input: string) => {
  input
  ->parse
  ->split([])
  ->Js.Array2.map(sum)
  ->Js.Array2.sortInPlaceWith(maxSorter)
  ->Js.Array2.slice(~start=0, ~end_=3)
  ->sum
}

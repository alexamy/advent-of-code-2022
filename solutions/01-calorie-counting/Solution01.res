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

  let one = Js.Array2.slice(calories, ~start=0, ~end_=endIndex)
  let others = Js.Array2.sliceFrom(calories, endIndex + 1)

  one
  ->Js.Array2.map(Option.getWithDefault(_, 0))
  ->Js.Array2.push(result, _)
  ->ignore

  switch others {
  | [] => result
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

open Belt

let parse = (input) => {
  input
  ->Js.String2.split("\n")
  ->Js.Array2.map(Belt.Int.fromString)
  ->List.fromArray
}

let rec split = (calories, one, acc) => {
  let result = list{one, ...acc}

  switch calories {
  | list{} => result
  | list{None, ...others} => {
    split(others, list{}, result)
  }
  | list{Some(calorie), ...others} => {
    split(others, list{calorie, ...one}, acc)
  }
  }
}

let splitBags = (calories) => {
  calories
  ->split(list{}, list{})
  ->List.toArray
  ->Js.Array2.map(List.toArray)
}

let sum = (arr) => Js.Array2.reduce(arr, (a, b) => a + b, 0)
let maxSorter = (a, b) => b - a

@genType
let solve1 = (input: string) => {
  input
  ->parse
  ->splitBags
  ->Js.Array2.map(sum)
  ->Js.Math.maxMany_int
}

@genType
let solve2 = (input: string) => {
  input
  ->parse
  ->splitBags
  ->Js.Array2.map(sum)
  ->Js.Array2.sortInPlaceWith(maxSorter)
  ->Js.Array2.slice(~start=0, ~end_=3)
  ->sum
}

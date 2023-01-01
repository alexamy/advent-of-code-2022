@@warning("-33")
open Belt

/*
find end point

find elevation one level down and go
if one level down is not found, find the same elevation and go
repeat until reach the start

"a" -> 97
"b" -> 98
"z" -> 122
*/

module Heightmap = {
  type t = array<array<string>>
  type pos = (int, int)

  let at = (heightmap, (rowIndex, colIndex)) => {
    let row = heightmap[rowIndex]->Option.getExn
    let element = row[colIndex]->Option.getExn

    element
  }

  let findIndex = (heightmap, ch) => {
    let rowIndex = heightmap->Array.getIndexBy(row => Js.Array2.includes(row, ch))->Option.getExn
    let colIndex = heightmap[rowIndex]->Option.getExn->Array.getIndexBy(el => el === ch)->Option.getExn

    (rowIndex, colIndex)
  }
}

module Char = {
  let fromCharCode = Js.String2.fromCharCode
  let toCharCode = s => Js.String2.charCodeAt(s, 0)

  let getCharLess = s => s->toCharCode->Int.fromFloat->(i => i - 1)->fromCharCode
}

module Parse = {
  let start = input => {
    input
    ->Js.String2.split("\n")
    ->Js.Array2.map(s => Js.String2.split(s, ""))
  }
}

@genType
let solve1 = (input: string) => {
  input
  ->Parse.start
}

@genType
let solve2 = (_input: string) => {
  None
}

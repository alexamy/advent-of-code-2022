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

  let at = (heightmap, (rowIndex, colIndex)) => {
    heightmap[rowIndex]->Option.flatMap(row => row[colIndex])
  }

  let findIndex = (heightmap, ch) => {
    let rowIndex = heightmap->Array.getIndexBy(row => Js.Array2.includes(row, ch))
    let colIndex = rowIndex
      ->Option.flatMap(i => heightmap[i])
      ->Option.flatMap(row => Array.getIndexBy(row, el => el === ch))

    switch (rowIndex, colIndex) {
    | (Some(r), Some(c)) => Some((r, c))
    | _ => None
    }
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

module Solution1 = {
  let findShortestPath = heightmap => {
    let (endRow, endCol) = Heightmap.findIndex(heightmap, "E")->Option.getExn

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

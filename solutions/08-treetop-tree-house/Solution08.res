open Belt

type trees = array<array<int>>

module Trees = {
  type tree = int
  type t = array<array<tree>>

  type position = (int, int)

  type neighbours = {
    top: option<tree>,
    left: option<tree>,
    bottom: option<tree>,
    right: option<tree>,
  }

  let isHigherThan = (tree1, tree2) => tree1 >= tree2

  let getDimensions = (trees) => {
    let rows = trees->Array.length
    let cols = trees
      ->Array.get(0)
      ->Option.getWithDefault([])
      ->Array.length

    (rows, cols)
  }

  let isAtEdge = (trees, (row, col)) => {
    let (rows, cols) = getDimensions(trees)
    let isRowEdge = row === 0 || row === rows - 1
    let isColEdge = col === 0 || col === cols - 1

    isRowEdge || isColEdge
  }

  let getTree = (trees, (row, col)) => {
    trees
      ->Array.get(row)
      ->Option.getWithDefault([])
      ->Array.get(col)
  }

  let getNeighbours = (trees, (row, col), offset) => {
    let top = getTree(trees, (row - offset, col))
    let left = getTree(trees, (row, col - offset))
    let bottom = getTree(trees, (row + offset, col))
    let right = getTree(trees, (row, col + offset))

    { top, left, bottom, right }
  }
}

module Calculate = {
  let rec isVisibleInner = (trees, (row, col), offset) => {
    let { top, left, bottom, right } = Trees.getNeighbours(trees, (row, col), offset)
    let tree = Trees.getTree(trees, (row, col))->Option.getExn

    let neighbours = [top, left, bottom, right]
    let isAll = Js.Array2.every(neighbours, Option.isNone)
    let someHigher = Js.Array2.some(neighbours,
      other => other->Option.map(Trees.isHigherThan(_, tree))->Option.getWithDefault(false))

    switch (isAll, someHigher) {
    | (true, _) => true
    | (_, true) => false
    | _ => isVisibleInner(trees, (row, col), offset + 1)
    }
  }

  let isVisible = (trees, (row, col)) => {
    Trees.isAtEdge(trees, (row, col)) || isVisibleInner(trees, (row, col), 1)
  }

  let start = (trees: trees) => {
    let visibility = trees->Js.Array2.mapi((row, rowIdx) => Js.Array2.mapi(row, (_, colIdx) => {
      isVisible(trees, (rowIdx, colIdx))
    }))

    visibility
    ->Array.flatMap(x => x)
    ->Js.Array2.filter(x => x === true)
    ->Js.Array2.length
  }
}

module Process = {
  let toNumber = n => n->Int.fromString->Option.getExn
  let makeLine = line => line->Js.String2.split("")->Js.Array2.map(toNumber)

  let make = (input: string): trees => {
    input
    ->Js.String2.split("\n")
    ->Js.Array2.map(makeLine)
  }
}

@genType
let solve1 = (input: string) => {
  input
  ->Process.make
  ->Calculate.start
}

@genType
let solve2 = (_input: string) => {
  None
}

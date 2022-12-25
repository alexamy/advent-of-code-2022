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

  let getDimensions = (trees) => {
    let rows = trees->Array.length
    let cols = trees->Array.getExn(0)->Array.length

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
    let top = getTree(trees, (row - 1, col))
    let left = getTree(trees, (row, col - 1))
    let bottom = getTree(trees, (row + 1, col))
    let right = getTree(trees, (row, col + 1))

    { top, left, bottom, right }
  }
}

module Calculate = {
  let rec isVisible = (trees, (row, col), offset) => {



    // let isEnd = top === row && left === col && bottom === row && right === col

    // let lastRow = trees->Array.length - 1
    // let lastCol = trees->Array.getExn(0)->Array.length - 1
    // let isEdge = row === 0 || col === 0 || row === lastRow || col === lastCol

    // let tree = trees->getTree(row, col)
    // let isTopHigher = top !== row && getTree(trees, top, col) >= tree
    // let isLeftHigher = left !== col && getTree(trees, row, left) >= tree
    // let isBottomHigher = bottom !== row && getTree(trees, bottom, col) >= tree
    // let isRightHigher = right !== col && getTree(trees, row, right) >= tree

    // let isSomeHigher = isTopHigher || isLeftHigher || isBottomHigher || isRightHigher

    // let topNext = Js.Math.min_int(top + 1, row)
    // let leftNext = Js.Math.min_int(left + 1, col)
    // let bottomNext = Js.Math.max_int(bottom - 1, row)
    // let rightNext = Js.Math.max_int(right - 1, row)

    // switch (isEnd, isEdge, isSomeHigher) {
    // | (true, _, _) => true
    // | (_, true, _) => true
    // | (_, _, true) => false
    // | _ => isVisible(trees, (row, col), (topNext, leftNext, bottomNext, rightNext))
    // }
  }

  let start = (trees: trees) => {
    let visibility = trees->Js.Array2.mapi((row, rowIdx) => Js.Array2.mapi(row, (_, colIdx) => {
      let lastRow = trees->Array.length - 1
      let lastCol = trees->Array.getExn(0)->Array.length - 1
      isVisible(trees, (rowIdx, colIdx), 1)
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

open Belt

type trees = array<array<int>>

module Calculate = {
  let getTree = (trees, row, col) => trees->Array.getExn(row)->Array.getExn(col)

  let rec isVisible = (trees, (row, col), (top, right, bottom, left)) => {
    let isEnd = top === row && bottom === row && right === col && left === col

    let lastRow = trees->Array.length - 1
    let lastCol = trees->Array.getExn(0)->Array.length - 1
    let isEdge = row === 0 || col === 0 || row === lastRow || col === lastCol

    let tree = trees->getTree(row, col)
    let treeTop = trees->getTree(top, col)
    let treeRight = trees->getTree(row, right)
    let treeBottom = trees->getTree(bottom, col)
    let treeLeft = trees->getTree(row, left)

    let isSomeHigher = treeTop >= tree || treeRight >= tree || treeBottom >= tree || treeLeft >= tree

    switch (isEnd, isEdge, isSomeHigher) {
    | (true, _, _) => true
    | (_, true, _) => true
    | (_, _, true) => false
    | _ => isVisible(trees, (row, col), (top + 1, right - 1, bottom - 1, left + 1))
    }
  }

  let start = (trees: trees) => {
    let visibility = trees->Js.Array2.mapi((row, rowIdx) => Js.Array2.mapi(row, (_, colIdx) => {
      let lastRow = trees->Array.length - 1
      let lastCol = trees->Array.getExn(0)->Array.length - 1
      isVisible(trees, (rowIdx, colIdx), (0, lastCol, lastRow, 0))
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

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

  let isHigherThan = (tree, other) => other >= tree

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

  let mapi = (trees, f) => {
    Js.Array2.mapi(trees, (line, row) =>
      Js.Array2.mapi(line, (tree, col) => {
        f(tree, (row, col))
      })
    )
  }
}

module Calculate = {
  type direction = Top | Left | Right | Bottom

  let movePosition = ((row, col), direction) => {
    let (rOffset, cOffset) = switch direction {
    | Top => (-1, 0)
    | Bottom => (1, 0)
    | Left => (0, -1)
    | Right => (0, 1)
    }

    (row + rOffset, col + cOffset)
  }

  let rec isVisibleFromRec = (trees, tree, position, direction): bool => {
    let isHigher = trees
    ->Trees.getTree(position)
    ->Option.map(Trees.isHigherThan(tree))

    switch isHigher {
    | None => true
    | Some(true) => false
    | Some(false) => {
        let newPosition = movePosition(position, direction)
        isVisibleFromRec(trees, tree, newPosition, direction)
      }
    }
  }

  let isVisibleFrom = (trees, position, direction) => {
    let tree = trees->Trees.getTree(position)->Option.getExn
    let newPosition = movePosition(position, direction)

    isVisibleFromRec(trees, tree, newPosition, direction)
  }

  let isVisible = (trees, position) => {
    Trees.isAtEdge(trees, position)
    || isVisibleFrom(trees, position, Top)
    || isVisibleFrom(trees, position, Left)
    || isVisibleFrom(trees, position, Bottom)
    || isVisibleFrom(trees, position, Right)
  }

  let start = (trees: trees) => {
    trees
    ->Trees.mapi((_, (row, col)) => isVisible(trees, (row, col)))
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

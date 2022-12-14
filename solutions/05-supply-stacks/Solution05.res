open Belt

type crate = array<string>

type instruction = {
  from: int,
  to_: int,
  count: int,
}

type input = (array<crate>, array<instruction>)

module Parse = {
  exception MalformedInstruction(string)
  exception CrateElementNotFound(array<string>, int)

  let parseInstruction = (input: string): instruction => {
    let result =
    %re("/^move (\d+) from (\d+) to (\d+)$/")
    ->Js.Re.exec_(input)
    ->Option.map(Js.Re.captures)
    ->Option.getWithDefault([])
    ->Js.Array2.sliceFrom(1)
    ->Js.Array2.map(result => {
      result
      ->Js.Nullable.toOption
      ->Option.flatMap(Belt.Int.fromString)
    })

    switch result {
    | [Some(count), Some(from), Some(to_)] => { count, from: from - 1, to_: to_ - 1 }
    | _ => raise(MalformedInstruction(input))
    }
  }

  let getCratesContent = line => {
    line
    ->Js.String2.split("")
    ->Js.Array2.filteri((_, i) => mod(i - 1, 4) === 0)
  }

  let transposeCrates = (rows, i) => {
    rows
    ->Js.Array2.map(row => Option.getWithDefault(row[i], " "))
    ->Js.Array2.filter(e => e !== " ")
    ->Js.Array2.reverseInPlace
  }

  let parseCrates = (input: array<string>): array<crate> => {
    let rows = input
    ->Js.Array2.map(getCratesContent)
    ->Js.Array2.reverseInPlace

    let count = rows
    ->Js.Array2.map(Js.Array2.length)
    ->Js.Math.maxMany_int

    Array.makeBy(count, transposeCrates(rows))
  }

  let splitLines = (input: string) => {
    let lines = Js.String2.split(input, "\n")
    let emptyLineIndex = Js.Array2.indexOf(lines, "")

    let (cratesRaw, instructionsRaw) = Array.partition(lines, line => {
      let index = Js.Array2.indexOf(lines, line)
      index < emptyLineIndex
    })

    let crates = Js.Array2.slice(cratesRaw, ~start=0, ~end_=-1)
    let instructions = Js.Array2.sliceFrom(instructionsRaw, 1)

    (crates, instructions)
  }

  let isNotEmpty = (line: string) => {
    Js.String2.search(line, %re("/^\s*$/")) === -1
  }

  let make = (input: string): input => {
    let (cratesLines, instructionsLines) = splitLines(input)

    let crates = parseCrates(cratesLines)
    let instructions = instructionsLines
    ->Js.Array2.filter(isNotEmpty)
    ->Js.Array2.map(parseInstruction)

    (crates, instructions)
  }
}

module Process = {
  exception TheSameCrate

  type takeMode =
  | One
  | All

  let moveCratesTo = (crate, from, count, takeMode) => {
    let top = Array.slice(from, ~offset=0, ~len=count)
    let moved = switch takeMode {
    | All => top
    | One => Js.Array2.reverseInPlace(top)
    }

    Js.Array2.concat(moved, crate)
  }

  let rec start = ((crates, instructions), takeMode) => {
    if(Js.Array2.length(instructions) === 0) {
      crates
    } else {
      let { from, to_, count } = Array.getExn(instructions, 0)
      let cratesMoved = Js.Array2.mapi(crates, (crate, i) => {
        switch (i === from, i === to_) {
        | (false, false) => crate
        | (true, true) => raise(TheSameCrate)
        | (true, _) => Js.Array2.sliceFrom(crate, count)
        | (_, true) => moveCratesTo(crate, Array.getExn(crates, from), count, takeMode)
        }
      })

      let otherInstructions = Js.Array2.sliceFrom(instructions, 1)
      start((cratesMoved, otherInstructions), takeMode);
    }
  }

  let getTop = (crates) => {
    Js.Array2.map(crates, crate => Option.getExn(crate[0]))
  }
}

@genType
let solve1 = (input: string) => {
  input
  ->Parse.make
  ->Process.start(Process.One)
  ->Process.getTop
  ->Js.Array2.joinWith("")
}

@genType
let solve2 = (input: string) => {
  input
  ->Parse.make
  ->Process.start(Process.All)
  ->Process.getTop
  ->Js.Array2.joinWith("")
}

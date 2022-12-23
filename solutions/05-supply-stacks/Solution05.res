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

  let parseCrates = (input: array<string>): array<crate> => {
    let rows = input
    ->Js.Array2.map(line => {
      line
      ->Js.String2.split("")
      ->Js.Array2.filteri((_, i) => mod(i - 1, 4) === 0)
    })
    ->Js.Array2.reverseInPlace

    let count = rows
    ->Js.Array2.map(Js.Array2.length)
    ->Js.Math.maxMany_int

    let crates = Array.makeBy(count, i => {
      rows
      ->Js.Array2.map(row => Option.getWithDefault(row[i], " "))
      ->Js.Array2.filter(e => e !== " ")
      ->Js.Array2.reverseInPlace
    })

    crates
  }

  let splitLines = (input: string) => {
    let lines = Js.String2.split(input, "\n")
    let emptyLineIndex = Js.Array2.indexOf(lines, "")

    let (cratesRaw, instructionsRaw) = lines
    ->Array.partition(line => {
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

  let logCrates = crates => {
    crates->Js.Array2.map(crate => Js.Array2.joinWith(crate, ""))
  }

  let start = ((crates, instructions): input) => {
    Js.Array2.reduce(instructions, (crates, { count, from, to_ }) => {
      crates
      ->Js.Array2.mapi((crate, i) => {
        let crateFrom = Array.getExn(crates, from)
        let crateTo = Array.getExn(crates, to_)

        switch (i === from, i === to_) {
        | (true, false) => {
          Js.Array2.sliceFrom(crateFrom, count)
        }
        | (false, true) => {
          crateFrom
          ->Array.slice(~offset=0, ~len=count)
          ->Js.Array2.reverseInPlace
          ->Js.Array2.concat(crateTo)
        }
        | (false, false) => crate
        | (true, true) => raise(TheSameCrate)
        }
      })
    }, crates)
  }

  let getTop = (crates) => {
    Js.Array2.map(crates, crate => Option.getExn(crate[0]))
  }
}

@genType
let solve1 = (input: string) => {
  input
  ->Parse.make
  ->Process.start
  ->Process.getTop
  ->Js.Array2.joinWith("")
}

@genType
let solve2 = (_input: string) => {
  None
}

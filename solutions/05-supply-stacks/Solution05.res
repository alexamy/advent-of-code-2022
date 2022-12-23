open Belt

module Process = {
  exception MalformedInstruction(string)
  exception CrateElementNotFound(array<string>, int)

  type instruction = {
    from: int,
    to_: int,
    count: int,
  }

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
    | [Some(count), Some(from), Some(to_)] => { count, from, to_ }
    | _ => raise(MalformedInstruction(input))
    }
  }

  let parseCrates = (input: array<string>) => {
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
      ->List.fromArray
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

  let split = (input: string) => {
    let (cratesLines, instructionsLines) = splitLines(input)
    let crates = parseCrates(cratesLines)
    let instructions = Js.Array2.map(instructionsLines, parseInstruction)

    (crates, instructions)
  }
}

@genType
let solve1 = (input: string): 'a => {
  input->Process.split

}

open Belt

module Process = {
  exception InstructionParse

  type instruction = {
    from: int,
    to_: int,
    count: int,
  }

  let parseInstruction = (input: string): instruction => {
    let result =
    %re("/^move (\d+) from (\d+) to (\d+)$/")
    ->Js.Re.exec_(input)
    ->Option.map(result => {
      result
      ->Js.Re.captures
      ->Js.Array2.map(Js.Nullable.toOption)
    })
    ->Option.getWithDefault([])
    ->Js.Array2.sliceFrom(1)
    ->Js.Array2.map(result => {
      result
      ->Option.flatMap(Belt.Int.fromString)
      ->Option.getWithDefault(0)
    })

    switch result {
    | [count, from, to_] => { count, from, to_ }
    | _ => raise(InstructionParse)
    }
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
    let (crates, instructions) = splitLines(input)

    (crates, Js.Array2.map(instructions, parseInstruction))
  }
}

@genType
let solve1 = (input: string): 'a => {
  input->Process.split

}

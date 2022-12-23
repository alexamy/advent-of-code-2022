open Belt

module Process = {
  type instruction = {
    from: int,
    to_: int,
    count: int,
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
    input->splitLines
  }
}

@genType
let solve1 = (input: string): 'a => {
  input->Process.split

}

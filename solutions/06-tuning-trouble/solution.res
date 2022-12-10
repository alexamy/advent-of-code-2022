exception MalformedInput

@genType
let solve1 = (message: string): int => {
  let indexes = Belt.Array.range(0, Js.String.length(message))
  let target = Belt.Array.getBy(indexes, (idx) => {
    let chars = message
      ->Js.String2.slice(~from=idx, ~to_=idx+4)
      ->Js.String2.split("")
      ->Belt.Set.String.fromArray
      ->Belt.Set.String.size

    chars == 4
  })

  switch target {
  | None => raise(MalformedInput)
  | Some(index) => index + 4
  }
}

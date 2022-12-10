exception MalformedInput

@genType
let solve1 = (message: string): int => {
  let indexes = Belt.Array.range(0, Js.String.length(message))
  let target = Belt.Array.getBy(indexes, (idx) => {
    let fours = Js.String.slice(~from=idx, ~to_=idx+4, message)
    let chars = Js.String.split("", fours)
    let uniqueChars = Belt.Set.String.fromArray(chars)
    Belt.Set.String.size(uniqueChars) == 4
  })

  switch target {
  | None => raise(MalformedInput)
  | Some(index) => index + 4
  }
}

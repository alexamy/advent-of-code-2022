exception MalformedInput

let solve = (message: string, extraCount: int): int => {
  let indexes = Belt.Array.range(0, Js.String.length(message))
  let target = Belt.Array.getBy(indexes, (idx) => {
    message
      ->Js.String2.slice(~from=idx, ~to_=idx+extraCount)
      ->Js.String2.split("")
      ->Belt.Set.String.fromArray
      ->Belt.Set.String.size
      ->Js.Int.equal(extraCount)
  })

  switch target {
  | None => raise(MalformedInput)
  | Some(index) => index + extraCount
  }
}

@genType
let solve1 = solve(_, 4)

@genType
let solve2 = solve(_, 14)

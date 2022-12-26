@@warning("-33")
open Belt

module Process = {
  type valve = {
    name: string,
    rate: int,
    targets: array<string>,
  }

  let splitMatches = (matches) => {
    let name = Array.getExn(matches, 1)
    let rate = Array.getExn(matches, 2)->Int.fromString->Option.getExn
    let targets = Array.getExn(matches, 3)->Js.String2.split(", ")

    { name, rate, targets }
  }

  let toValveInfo = (info) => {
    %re("/^Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? (.*)$/")
    ->Js.Re.exec_(info)
    ->Option.map(Js.Re.captures)
    ->Option.getExn
    ->Js.Array2.map(s => s->Js.Nullable.toOption->Option.getExn)
    ->splitMatches
  }

  let start = (input) => {
    input
    ->Js.String2.split("\n")
    ->Js.Array2.map(toValveInfo)
  }
}

@genType
let solve1 = (input: string) => {
  input
  ->Process.start
}

@genType
let solve2 = (_input: string) => {
  None
}

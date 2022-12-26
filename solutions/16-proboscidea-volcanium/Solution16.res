@@warning("-33")
open Belt

module Process = {
  type valve = {
    name: string,
    rate: int,
    targets: array<string>,
  }

  let toValveInfo = (info) => {
    %re("/^Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? (.*)$/")
    ->Js.Re.exec_(info)
    ->Option.map(Js.Re.captures)
    ->Option.getExn
    ->Js.Array2.map(Js.Nullable.toOption)
    ->(matches => {
      let name = Array.getExn(matches, 1)->Option.getExn
      let rate = Array.getExn(matches, 2)->Option.flatMap(Int.fromString)->Option.getExn
      let targets = Array.getExn(matches, 3)->Option.getExn->Js.String2.split(", ")

      { name, rate, targets }
    })
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

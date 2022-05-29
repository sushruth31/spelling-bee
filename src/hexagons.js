let hTop = "445px"
let h1 = "495px"
let h2 = "600px"
let hBottom = "655px"
let hCenter = "550px"
let wLeft = "100px"
let wMid = "200px",
  wRight = "300px"

let positions = [
  [hTop, wMid],
  [h1, wRight],
  [h2, wRight],
  [hBottom, wMid],
  [h2, wLeft],
  [h1, wLeft],
]

let createStyle = (top, left, style) => ({
  top,
  left,
  ...style,
})

let hexStyles = positions.map(p => createStyle(...p))
let centerStyle = createStyle(hCenter, wMid, {})

export default function Hexagons({ lettersOfTheDay, addLetter }) {
  return (
    <>
      {lettersOfTheDay.outerLetters.map((ltr, i) => {
        return (
          <button
            onClick={addLetter(ltr)}
            style={hexStyles[i]}
            className="hexagon flex items-center justify-center"
          >
            <div className="font-bold text-3xl">{ltr}</div>
          </button>
        )
      })}
      <button
        onClick={addLetter(lettersOfTheDay.centerLetter)}
        className="hexagonCenter flex items-center justify-center "
        style={centerStyle}
      >
        <div className="font-bold text-3xl">{lettersOfTheDay.centerLetter}</div>
      </button>
    </>
  )
}

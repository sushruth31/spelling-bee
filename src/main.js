import { useEffect, useRef, useState } from "react"
import useVis from "./useVis"
import englishWords from "./englishwords"
import useInterval from "./useInterval"
import RotateRightIcon from "@mui/icons-material/RotateRight"

const NUM_LETTERS = 7

function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let idxToShuffle = getRandomNumber(arr.length)
    ;[arr[i], arr[idxToShuffle]] = [arr[idxToShuffle], arr[i]]
  }
  return arr
}

function getRandomNumber(max, min = 0) {
  let diff = max - min
  let rand = Math.random()
  return Math.floor(rand * diff) + min
}

function getUniqueLetters(arr, number) {
  let letters = []
  for (let i = 0; i < number; i++) {
    let ltr
    while (!ltr) {
      let attempt = arr[getRandomNumber(arr.length)]
      if (!letters.includes(attempt)) {
        ltr = attempt
      }
    }
    letters.push(ltr)
  }
  return letters
}

function createLettersOfTheDay() {
  let vowels = ["A", "E", "I", "O", "U"]
  let consts = Array.from(Array(26))
    .map((_, i) => String.fromCharCode(i + 65))
    .filter(l => !vowels.includes(l))

  //create the word. 2 or 3 vowels

  let numOfVowels = Math.random() > 0.5 ? 3 : 2
  let letters = shuffle([
    ...getUniqueLetters(vowels, numOfVowels),
    ...getUniqueLetters(consts, NUM_LETTERS - numOfVowels),
  ])

  let centerLetter = letters.shift()
  return {
    letters,
    centerLetter,
    timestamp: new Date().getTime(),
  }
}

let createStyle = (top, left, style) => ({
  top,
  left,
  ...style,
})

function isWordInDict(word) {
  //check this word against words in dict
  return englishWords.some(word => word.toLowerCase() === word.toLowerCase())
}

export default function Main() {
  let [lettersOfTheDay, setLettersOfTheDay] = useState(createLettersOfTheDay)
  let [attempts, setAttempts] = useState([])
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

  let hexStyles = positions.map(p => createStyle(...p))
  let centerStyle = createStyle(hCenter, wMid, {})
  let [inputText, setInputText] = useState([])
  let [delay, setDelay] = useState(500)
  let caretVis = useVis(true)
  let [error, setError] = useState("")

  let deleteLetter = () => {
    caretVis.show()
    setInputText(p => p.slice(0, p.length - 1))
  }
  let addLetter = ltr => () => {
    setDelay(null)
    setInputText(p => [...p, ltr])
  }

  //reinstate the caret blink
  useEffect(() => {
    setDelay(500)
  }, [inputText])

  useInterval(caretVis.toggle, delay, caretVis.show)

  let handleKey = e => {
    console.log(e.key)
    if (e.key === "Control" || e.key === "Shift" || e.key === "Meta") return
    let key = e.key.toUpperCase()
    if (key === "BACKSPACE" || key === "DELETE") {
      return deleteLetter()
    }
    addLetter(key)()
  }

  useEffect(() => {
    window.addEventListener("keyup", handleKey)
    return () => window.removeEventListener("keyup", handleKey)
  }, [])

  let textColor = ltr => {
    if (ltr === lettersOfTheDay.centerLetter) {
      return "#f7da21"
    }
    if (lettersOfTheDay.letters.includes(ltr)) {
      return "black"
    }
    return "#e6e6e6"
  }

  let fireError = txt => {
    setError(txt)
    setTimeout(() => {
      setError("")
    }, 1000)
  }

  let bottomBtnClassName =
    "border border-zinc-300 rounded-3xl py-2 px-6 active:bg-zinc-300"

  let handleEnter = () => {
    if (!inputText.length) return

    if (inputText.length < 4) {
      return fireError("Too Short")
    }
    if (!isWordInDict(inputText.join(""))) {
      return fireError("Not in Dict")
    }
    addToWordList()
  }

  function addToWordList() {}

  return (
    <div className="flex flex-col items-center justify-center p-20">
      {error && (
        <div className="absolute bg-black text-white top-52 rounded p-2">
          {error}
        </div>
      )}
      <div className="w-80 h-10 flex items-center px-4">
        {inputText.map(ltr => (
          <div
            style={{ color: textColor(ltr) }}
            className={`font-bold text-3xl`}
          >
            {ltr}
          </div>
        ))}
        {caretVis.visible && <div className="h-full w-1 bg-[#f7da21]"></div>}
      </div>
      <div style={{ top: 200 }}>
        {lettersOfTheDay.letters.map((ltr, i) => {
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
          <div className="font-bold text-3xl">
            {lettersOfTheDay.centerLetter}
          </div>
        </button>
      </div>

      <div className="flex absolute bottom-28 items-center w-[80%] justify-around">
        <button onClick={deleteLetter} className={bottomBtnClassName}>
          Delete
        </button>
        <button
          onClick={() =>
            setLettersOfTheDay(p => ({
              ...p,
              letters: shuffle(p.letters),
            }))
          }
          className={bottomBtnClassName}
        >
          <RotateRightIcon />
        </button>
        <button onClick={handleEnter} className={bottomBtnClassName}>
          Enter
        </button>
      </div>
    </div>
  )
}

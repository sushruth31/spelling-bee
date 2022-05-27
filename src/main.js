import { useEffect, useRef, useState, useCallback } from "react"
import useVis from "./useVis"
import englishWords from "./englishwords"
import useInterval from "./useInterval"
import RotateRightIcon from "@mui/icons-material/RotateRight"
import GuessedWords from "./guessedwords"
import TextInput from "./textinput"

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

  if (createWordBank(letters) < 5) {
    return createLettersOfTheDay()
  }

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

function isWordInDict(word, dict) {
  //check this word against words in dict
  return dict.some(w => w.toLowerCase() === word.toLowerCase())
}

function createWordBank(lettersOfTheDay) {
  return englishWords.filter(word =>
    word
      .split("")
      .every(ltr =>
        lettersOfTheDay.map(l => l.toLowerCase()).includes(ltr.toLowerCase())
      )
  )
}

export default function Main() {
  let [lettersOfTheDay, setLettersOfTheDay] = useState(createLettersOfTheDay)
  let dropdown = useVis()
  let [wordBank, setWordBank] = useState(() =>
    createWordBank([
      ...lettersOfTheDay.letters,
      ...lettersOfTheDay.centerLetter,
    ])
  )
  window.words = wordBank
  let [guessedWords, setGuessedWords] = useState([])
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
  let [error, setError] = useState("")
  let [canEnterBePressed, setCanEnterBePressed] = useState(true)

  let deleteLetter = () => {
    setInputText(p => p.slice(0, p.length - 1))
  }
  let addLetter = ltr => f => {
    typeof f === "function" && f()
    setInputText(p => [...p, ltr])
  }

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
    setCanEnterBePressed(false)
    setTimeout(() => setError(""), 800)
    setTimeout(() => setInputText([]), 1000)
    setTimeout(() => setCanEnterBePressed(true), 1500)
  }

  let bottomBtnClassName =
    "border border-zinc-300 rounded-3xl py-2 px-6 active:bg-zinc-300"

  let handleEnter = () => {
    if (!inputText.length) return

    if (inputText.length < 4) {
      return fireError("Too Short")
    }
    //check if word is in guesed words
    if (
      guessedWords.some(
        word => word.toLowerCase() === inputText.join("").toLowerCase()
      )
    ) {
      return fireError("You already guessed this word!")
    }

    if (!isWordInDict(inputText.join(""), wordBank)) {
      return fireError("Not in Dict")
    }

    addToWordList()
  }

  function addToWordList() {
    setGuessedWords(p => [...p, inputText.join("")])
    setInputText([])
  }

  return (
    <>
      <GuessedWords
        isOpen={dropdown.visible}
        toggle={dropdown.toggle}
        guessedWords={guessedWords}
      />
      <div className="flex flex-col items-center justify-center p-20">
        {error && (
          <div className="absolute bg-black text-white top-52 rounded p-2">
            {error}
          </div>
        )}
        <TextInput
          addLetter={addLetter}
          canEnterBePressed={canEnterBePressed}
          deleteLetter={deleteLetter}
          textColor={textColor}
          inputText={inputText}
          handleEnter={handleEnter}
        />
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
    </>
  )
}

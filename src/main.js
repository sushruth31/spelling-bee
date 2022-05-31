import { useRef, useState, useMemo, useEffect } from "react"
import useVis from "./useVis"
import englishWords from "./englishwords"
import GuessedWords from "./guessedwords"
import TextInput from "./textinput"
import Buttons from "./buttons"
import Hexagons from "./hexagons"
import ScoreSteps from "./scoresteps"

const NUM_LETTERS = 7
export const YELLOW = "#f7da21"
export const GREY = "#e6e6e6"

export function calculateScore(words) {
  return words.reduce((score, word) => {
    if (word.length < 4) {
      throw Error("this should not happen")
    }
    if (word.length === 4) {
      return ++score
    } else {
      return score + word.length
    }
  }, 0)
}

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

function pickRandom(arr) {
  return arr[getRandomNumber(arr.length)]
}

function getUniqueLetters(arr, number) {
  let letters = new Set()
  for (let i = 0; i < number; i++) {
    let ltr
    while (!ltr) {
      let attempt = pickRandom(arr)
      if (!letters.has(attempt)) {
        ltr = attempt
      }
    }
    letters.add(ltr)
  }
  return [...letters]
}

function createLettersOfTheDay() {
  let vowels = ["A", "E", "I", "O", "U"]
  let consts = Array.from(Array(26))
    .map((_, i) => String.fromCharCode(i + 65))
    .filter(l => !vowels.includes(l))

  //create the word. 2 or 3 vowels

  let numOfVowels = Math.random() > 0.5 ? 2 : 3
  let outerLetters = shuffle([
    ...getUniqueLetters(vowels, numOfVowels),
    ...getUniqueLetters(consts, NUM_LETTERS - numOfVowels),
  ])
  //pop off center letter
  let centerLetter = outerLetters.shift()

  return {
    outerLetters,
    centerLetter,
    timestamp: new Date().getTime(),
  }
}

function isWordInDict(word, dict) {
  //check this word against words in dict
  return dict.some(w => w.toLowerCase() === word.toLowerCase())
}

function createWordBank(outerLetters, centerLetter) {
  outerLetters = outerLetters.map(l => l.toLowerCase())
  centerLetter = centerLetter.toLowerCase()
  let dict = englishWords
    .map(word => word.toLowerCase())
    .filter(word => word.includes(centerLetter))

  let search = new Set([...outerLetters, centerLetter])
  let results = dict.filter(dictWord =>
    [...dictWord].every(ltr => search.has(ltr))
  )
  return results.length < 4
    ? createWordBank(outerLetters, centerLetter)
    : results
}

export default function Main() {
  let [lettersOfTheDay, setLettersOfTheDay] = useState(createLettersOfTheDay)
  let dropdown = useVis()
  let wordBank = useMemo(
    () =>
      createWordBank(
        lettersOfTheDay.outerLetters,
        lettersOfTheDay.centerLetter
      ),
    []
  )

  let [guessedWords, setGuessedWords] = useState([])
  let [inputText, setInputText] = useState([])
  let [error, setError] = useState("")
  let [delay, setDelay] = useState(500)
  let [canEnterBePressed, setCanEnterBePressed] = useState(true)
  let [isWinner, setIsWinner] = useState(false)

  function handleWin() {
    setIsWinner(true)
    setInputText([]) //just in case
    alert("you win!")
  }

  useEffect(() => {
    //check if all words are guessed. win
    if (guessedWords.length === wordBank.length) {
      handleWin()
    }
  }, [guessedWords])

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
    if (lettersOfTheDay.outerLetters.includes(ltr)) {
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

  function rotateWords() {
    setLettersOfTheDay(p => ({
      ...p,
      letters: shuffle(p.outerLetters),
    }))
  }

  function handleKey(e) {
    if (e.key === "Control" || e.key === "Shift" || e.key === "Meta") return
    let key = e.key.toUpperCase()
    if (key === "BACKSPACE" || key === "DELETE") {
      return btnRef.current.delete()
    }
    if (key === "ENTER" && canEnterBePressed) {
      return btnRef.current.enter()
    }

    if (key === "ENTER") {
      return btnRef.current.enterNoOp()
    }

    addLetter(key)(() => setDelay(null))
  }

  let btnRef = useRef(null)

  return (
    <div className="p-2">
      <ScoreSteps wordBank={wordBank} score={calculateScore(guessedWords)} />
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
          inputText={inputText}
          delay={delay}
          setDelay={setDelay}
          handleKey={isWinner ? () => {} : handleKey}
          textColor={textColor}
        />
        <Hexagons addLetter={addLetter} lettersOfTheDay={lettersOfTheDay} />

        <Buttons
          ref={btnRef}
          handleEnter={handleEnter}
          deleteLetter={deleteLetter}
          rotateWords={rotateWords}
        />
        <div>{JSON.stringify(wordBank)}</div>
      </div>
    </div>
  )
}

import { useState } from "react"
import Header from "./header"
import Main from "./main"
import { ModalProvider } from "./modalcontext"

export const NUM_LETTERS = 7

export function loadData(key) {
  try {
    let data = JSON.parse(localStorage.getItem(key))
    let currTime = new Date().getTime()
    //check timestamp. if no good return createletters
    if (!data.timestamp || currTime > data.timestamp) {
      throw Error("no timestamp. creating new letters...")
    }
    return data
  } catch {
    return createLettersOfTheDay()
  }
}

export function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let idxToShuffle = getRandomNumber(arr.length)
    ;[arr[i], arr[idxToShuffle]] = [arr[idxToShuffle], arr[i]]
  }
  return arr
}

export function getRandomNumber(max, min = 0) {
  let diff = max - min
  let rand = Math.random()
  return Math.floor(rand * diff) + min
}

export function pickRandom(arr) {
  return arr[getRandomNumber(arr.length)]
}

export function createLettersOfTheDay() {
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
    timestamp: new Date().getTime() + 87012000,
    guessedWords: [],
  }
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

function App() {
  let [lettersOfTheDay, setLettersOfTheDay] = useState(() => loadData("data"))
  return (
    <>
      <ModalProvider>
        <Header />
        <Main
          lettersOfTheDay={lettersOfTheDay}
          setLettersOfTheDay={setLettersOfTheDay}
        />
      </ModalProvider>
    </>
  )
}

export default App

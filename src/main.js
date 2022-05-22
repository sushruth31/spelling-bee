import { useState } from "react"
import Hexagon from "react-hexagon"
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

export default function Main() {
  let [lettersOfTheDay, setLettersOfTheDay] = useState(createLettersOfTheDay)
  let [attempts, setAttempts] = useState([])

  return (
    <>
      <div style={{ top: 200 }}>
        <div class="hexagon hex1"></div>
        <div class="hexagon hex2"></div>
        <div class="hexagon hex3"></div>
        <div class="hexagon hex4"></div>
        <div class="hexagon hex5"></div>
        <div class="hexagon hex6"></div>
      </div>
    </>
  )
}

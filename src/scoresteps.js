import { calculateScore } from "./main"

export const levels = [
  "Beginner",
  "Good Start",
  "Moving Up",
  "Good",
  "Solid",
  "Nice",
  "Great",
  "Amazing",
  "Genius",
]

export default function ScoreSteps({ score, wordBank }) {
  let maxPossibleScore = calculateScore(wordBank)
  if (score > maxPossibleScore) throw Error("should not happen")
  let increment = Math.ceil(maxPossibleScore / levels.length)
  let levelMap = {}
  levels.forEach((lvl, i) => (levelMap[lvl] = increment * i + 1))
  let currentLevel
  for (let [i, val] of Object.entries(Object.values(levelMap))) {
    if (score >= val) {
      continue
    } else {
      //assign the previous level
      currentLevel = Object.keys(levelMap).find((_, idx) => i - 1 === idx)
      break
    }
  }

  return (
    <>
      <div>score: {score}</div>
      <div>{maxPossibleScore}</div>
      <div>{JSON.stringify(levelMap)}</div>
      <div>current level: {currentLevel}</div>
    </>
  )
}

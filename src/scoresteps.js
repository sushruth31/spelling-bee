import { calculateScore, YELLOW, GREY } from "./main"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import { memo } from "react"

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

function ScoreSteps({ score, wordBank }) {
  let maxPossibleScore = calculateScore(wordBank)
  if (score > maxPossibleScore) throw Error("should not happen")
  let increment = Math.floor(maxPossibleScore / levels.length)
  let levelMap = {}
  levels.forEach((lvl, i) => (levelMap[lvl] = increment * i))
  let entries = Object.entries(levelMap).sort((a, b) => a[1] - b[1])
  let currentLevel = entries.reduce((acc, [k, v]) => {
    if (score > v) {
      return [k, v]
    }
    return acc
  })[0]

  let currentLevelIdx = levels.findIndex(l => l === currentLevel)

  return (
    <div className="flex items-center mb-6">
      <div className="flex whitespace-nowrap font-bold">{currentLevel}</div>
      <Box sx={{ width: "100%" }}>
        <Stepper>
          {levels.map((label, i) => {
            let completed = i <= currentLevelIdx
            let active = i === currentLevelIdx
            return (
              <Step completed={completed} key={label}>
                <StepLabel
                  icon={
                    <div
                      style={{
                        backgroundColor:
                          completed || (i === 0 && currentLevelIdx === 0)
                            ? YELLOW
                            : GREY,
                        borderRadius: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: !active ? 17 : 50,
                        height: !active ? 17 : 50,
                      }}
                    >
                      <div>{active ? score : String.fromCharCode(6158)}</div>
                    </div>
                  }
                />
              </Step>
            )
          })}
        </Stepper>
      </Box>
    </div>
  )
}

export default memo(ScoreSteps)

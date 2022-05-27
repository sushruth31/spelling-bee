import useInterval from "./useInterval"
import useVis from "./useVis"
import React, { useState, useEffect } from "react"

function TextInput({ inputText, textColor, addLetter, deleteLetter }) {
  let caretVis = useVis(true)
  let [delay, setDelay] = useState(500)
  useInterval(caretVis.toggle, delay, caretVis.show)
  //reinstate the caret blink
  useEffect(() => {
    setDelay(500)
  }, [inputText])

  let handleKey = e => {
    if (e.key === "Control" || e.key === "Shift" || e.key === "Meta") return
    let key = e.key.toUpperCase()
    if (key === "BACKSPACE" || key === "DELETE") {
      return deleteLetter()
    }
    setDelay(null)
    addLetter(key)()
  }

  useEffect(() => {
    window.addEventListener("keyup", handleKey)
    return () => window.removeEventListener("keyup", handleKey)
  }, [])

  return (
    <div className="w-80 h-10 flex items-center px-4">
      {inputText.map((ltr, i) => (
        <div
          key={i}
          style={{ color: textColor(ltr) }}
          className={`font-bold text-3xl`}
        >
          {ltr}
        </div>
      ))}
      {caretVis.visible && <div className="h-full w-1 bg-[#f7da21]"></div>}
    </div>
  )
}

export default React.memo(TextInput)

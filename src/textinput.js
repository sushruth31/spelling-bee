import useInterval from "./useInterval"
import useVis from "./useVis"
import { useState, useEffect } from "react"
import useEventListener from "./useeventlistener"

export default function TextInput({
  inputText,
  textColor,
  addLetter,
  deleteLetter,
  handleEnter,
  canEnterBePressed,
}) {
  let caretVis = useVis(true)
  let [delay, setDelay] = useState(500)
  useEventListener("keyup", handleKey)
  useInterval(caretVis.toggle, delay, caretVis.show)
  //reinstate the caret blink
  useEffect(() => {
    setDelay(500)
  }, [inputText])

  function handleKey(e) {
    if (
      e.key === "Control" ||
      e.key === "Shift" ||
      e.key === "Meta" ||
      !canEnterBePressed
    )
      return
    let key = e.key.toUpperCase()
    if (key === "BACKSPACE" || key === "DELETE") {
      return deleteLetter()
    }
    if (key === "ENTER") {
      return handleEnter()
    }
    addLetter(key)(() => setDelay(null))
  }

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

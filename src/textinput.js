import useInterval from "./useInterval"
import useVis from "./useVis"
import { useState, useEffect } from "react"
import useEventListener from "./useeventlistener"

export default function TextInput({
  inputText,
  delay,
  setDelay,
  textColor,
  handleKey,
}) {
  let caretVis = useVis(true)
  useEventListener("keyup", handleKey)
  useInterval(caretVis.toggle, delay, caretVis.show)
  //reinstate the caret blink
  useEffect(() => {
    setDelay(500)
  }, [inputText])

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

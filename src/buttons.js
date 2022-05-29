import RotateRightIcon from "@mui/icons-material/RotateRight"
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

const ButtonNames = {
  DELETE: "delete",
  ENTER: "enter",
}

function Buttons({ rotateWords, deleteLetter, handleEnter }, ref) {
  let [clicked, setClicked] = useState(null)
  let bottomBtnClassName =
    "border border-zinc-300 rounded-3xl py-2 px-6 active:bg-zinc-300"
  let activeClassName =
    "border border-zinc-300 bg-zinc-300 rounded-3xl py-2 px-6"

  useImperativeHandle(ref, () => ({
    delete: () => {
      deleteLetter()
      setClicked(ButtonNames.DELETE)
      setTimeout(() => setClicked(null), 100)
    },
    enter: () => {
      handleEnter()
      setClicked(ButtonNames.ENTER)
      setTimeout(() => setClicked(null), 100)
    },
    enterNoOp: () => {
      setClicked(ButtonNames.ENTER)
      setTimeout(() => setClicked(null), 100)
    },
  }))

  let createClassName = type =>
    clicked === type ? activeClassName : bottomBtnClassName

  return (
    <div className="flex absolute bottom-28 items-center w-[80%] justify-around">
      <button
        onClick={deleteLetter}
        className={createClassName(ButtonNames.DELETE)}
      >
        Delete
      </button>
      <button onClick={rotateWords} className={bottomBtnClassName}>
        <RotateRightIcon />
      </button>
      <button
        onClick={handleEnter}
        className={createClassName(ButtonNames.ENTER)}
      >
        Enter
      </button>
    </div>
  )
}

export default forwardRef(Buttons)

import RotateRightIcon from "@mui/icons-material/RotateRight"
import { forwardRef, useState } from "react"

const ButtonNames = {
  DELETE: "delete",
  ENTER: "enter",
}

function Buttons({ rotateWords, deleteLetter, handleEnter }, ref) {
  let { deleteRef, enterRef } = ref.current
  let [clicked, setClicked] = useState(null)
  let bottomBtnClassName =
    "border border-zinc-300 rounded-3xl py-2 px-6 active:bg-zinc-300"
  let activeClassName =
    "border border-zinc-300 bg-zinc-300 rounded-3xl py-2 px-6"

  return (
    <div className="flex absolute bottom-28 items-center w-[80%] justify-around">
      <button
        ref={deleteRef}
        onClick={() => {
          deleteLetter()
          setClicked(ButtonNames.DELETE)
          setTimeout(() => setClicked(null), 100)
        }}
        className={
          clicked === ButtonNames.DELETE ? activeClassName : bottomBtnClassName
        }
      >
        Delete
      </button>
      <button onClick={rotateWords} className={bottomBtnClassName}>
        <RotateRightIcon />
      </button>
      <button
        ref={enterRef}
        onClick={handleEnter}
        className={bottomBtnClassName}
      >
        Enter
      </button>
    </div>
  )
}

export default forwardRef(Buttons)

import moment from "moment"
import { useRef, forwardRef } from "react"
import useModal from "./useModal"

const Button = forwardRef((props, ref) => {
  return (
    <button
      ref={ref}
      className="text-lg h-14 hover:bg-zinc-100 rounded px-4"
      {...props}
    />
  )
})

const Menu = forwardRef(({ isVisible }, ref) => {
  return (
    <>
      {isVisible && (
        <div
          style={{ zIndex: 4000 }}
          className="absolute border border-black w-32 top-52 right-6"
        >
          <ul ref={ref}>
            <li>How to Play</li>
            <li>Rankings</li>
            <li>Community</li>
          </ul>
        </div>
      )}
    </>
  )
})

export default function Header() {
  let ref = useRef(null)
  let listRef = useRef(null)
  let modal = useModal([ref, listRef])

  return (
    <>
      <Menu ref={listRef} isVisible={modal.visible} />
      <div className="w-screen flex px-10 items-center h-36 border border-b-black">
        <div className="flex items-center w-96 justify-between ">
          <div>
            <h1 className="font-bold text-3xl">Spelling Bee </h1>
            <div>Edited by Sushruth</div>
          </div>
          <div className="text-2xl">{moment().format("MMM Do, YYYY")}</div>
        </div>
      </div>

      <div className="w-screen flex  items-center h-16 border border-b-black">
        <div className="flex px-10 items-center justify-around w-full">
          <Button>Yesterday's Answers</Button>
          <Button>Todays' Hints</Button>
          <Button ref={ref} onClick={modal.toggle}>
            More
          </Button>
        </div>
      </div>
    </>
  )
}

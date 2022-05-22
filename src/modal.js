import { createPortal } from "react-dom"
import { useModal } from "./modalcontext"

export default function Modal() {
  let { isOpen, closeModal, content } = useModal()

  if (isOpen) {
    return createPortal(
      <div
        onClick={closeModal}
        className="fixed top-0 left-0 h-screen w-full flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.8)" }}
      >
        <div className="bg-white relative p-5 shadow-lg rounded flex flex-col items-start text-lg text-gray-800">
          {content}
        </div>
      </div>,
      document.getElementById("modal")
    )
  }
}

import { createContext, useContext, useState } from "react"
import Modal from "./modal"
import useVis from "./useVis"
const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  let o = useVis(false)
  let [content, setContent] = useState(null)

  let handleModal = content => e => {
    o.toggle()
    if (content) {
      setContent(content)
    }
  }

  return (
    <ModalContext.Provider
      value={{ isOpen: o.visible, handleModal, content, closeModal: o.hide }}
    >
      <Modal />
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)

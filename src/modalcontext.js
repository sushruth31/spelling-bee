import { createContext, useContext, useState } from "react"

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  let [isOpen, setIsOpen] = useState(false)
  let [content, setContent] = useState(null)

  let closeModal = () => setIsOpen(false)

  let handleModal = content => e => {
    setIsOpen(p => !p)
    if (content) {
      setContent(content)
    }
  }

  return (
    <ModalContext.Provider value={{ isOpen, handleModal, content, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)

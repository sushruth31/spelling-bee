import Header from "./header"
import Modal from "./modal"
import { ModalProvider } from "./modalcontext"

function App() {
  return (
    <>
      <ModalProvider>
        <Modal />
        <Header />
      </ModalProvider>
    </>
  )
}

export default App

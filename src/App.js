import Header from "./header"
import Main from "./main"
import Modal from "./modal"
import { ModalProvider } from "./modalcontext"

function App() {
  return (
    <>
      <ModalProvider>
        <Modal />
        <Header />
        <Main />
      </ModalProvider>
    </>
  )
}

export default App

import Header from "./header"
import Main from "./main"
import { ModalProvider } from "./modalcontext"

function App() {
  return (
    <>
      <ModalProvider>
        <Header />
        <Main />
      </ModalProvider>
    </>
  )
}

export default App

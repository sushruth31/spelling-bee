import { useEffect, useRef, useState } from "react"

export default function useVis(init = false, modalRefs = []) {
  let [visible, setVisible] = useState(init)
  let show = () => setVisible(true)
  let hide = () => setVisible(false)
  let toggle = () => setVisible(p => !p)

  useEffect(() => {
    let handler = e => {
      if (
        modalRefs.some(
          ref => ref.current === e.target || ref.current?.contains(e.target)
        )
      ) {
        return
      }
      hide()
    }
    window.addEventListener("click", handler)
    return () => window.removeEventListener("click", handler)
  }, [])

  return { visible, show, hide, toggle }
}

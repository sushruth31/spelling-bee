import { useEffect, useRef, useState } from "react"

export default function useVis(modalRefs = [], init = false) {
  let fRef = useRef(null)
  let [visible, setVisible] = useState(init)
  let show = () => setVisible(true)
  let hide = () => setVisible(false)
  let toggle = () => setVisible(p => !p)

  useEffect(() => {
    fRef.current = e => {
      if (
        modalRefs.some(
          ref => ref.current === e.target || ref.current?.contains(e.target)
        )
      ) {
        return
      }
      hide()
    }
    window.addEventListener("click", fRef.current)
    return () => window.removeEventListener("click", fRef.current)
  }, [])

  return { visible, show, hide, toggle }
}

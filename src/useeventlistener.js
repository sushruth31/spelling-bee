import { useEffect, useRef } from "react"

export default function useEventListener(type, f) {
  let ref = useRef(f)

  useEffect(() => {
    ref.current = f
  }, [f])

  useEffect(() => {
    let handler = e => ref.current(e)
    window.addEventListener(type, handler)
    return () => window.removeEventListener(type, handler)
  }, [type])
}

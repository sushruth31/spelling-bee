import { useEffect, useRef } from "react"

export default function useInterval(f, delay, onStopTimer) {
  let fnRef = useRef(f)

  useEffect(() => {
    fnRef.current = f
  })

  useEffect(() => {
    if (!delay && delay !== 0) {
      return onStopTimer && onStopTimer()
    }
    let id = setInterval(fnRef.current, delay)
    return () => clearInterval(id)
  }, [delay])
}

import { useState } from "react"
import PWABadge from "./PWABadge.tsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <PWABadge />
    </>
  )
}

export default App

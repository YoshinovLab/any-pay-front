import { useState } from "react"
import PWABadge from "./PWABadge.tsx"
import icon from "/favicon.svg?url"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <img src={icon} alt="icon" width={100} />
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <PWABadge />
    </>
  )
}

export default App

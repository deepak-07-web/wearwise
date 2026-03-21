import { useState } from "react"
import Home from "./pages/Home"
import Wardrobe from "./pages/Wardrobe"
import Suggestion from "./pages/Suggestion"

function App() {
  const [page, setPage] = useState("home")

  return (
    <div>
      <nav>
        <span style={{color: "white", fontWeight: "700", fontSize: "1.2rem", marginRight: "auto"}}>
          👗 WearWise
        </span>
        {["home", "wardrobe", "suggestion"].map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            style={{
              background: page === p ? "#e94560" : "transparent",
              borderColor: page === p ? "#e94560" : "#ffffff40"
            }}
          >
            {p === "home" ? "🏠 Home" : p === "wardrobe" ? "👔 Wardrobe" : "✨ Suggestion"}
          </button>
        ))}
      </nav>

      {page === "home" && <Home setPage={setPage} />}
      {page === "wardrobe" && <Wardrobe />}
      {page === "suggestion" && <Suggestion />}
    </div>
  )
}

export default App
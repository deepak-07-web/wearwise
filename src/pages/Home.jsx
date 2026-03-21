function Home({ setPage }) {
  return (
    <div className="main">
      <div style={{textAlign: "center", padding: "40px 0"}}>
        <h1 style={{fontSize: "3rem"}}>👗 WearWise</h1>
        <p style={{fontSize: "1.2rem", color: "#666", marginBottom: "40px"}}>
          Your AI powered personal outfit assistant
        </p>

        <div style={{display: "flex", gap: "16px", justifyContent: "center", marginBottom: "60px"}}>
          <button onClick={() => setPage("wardrobe")}>
            👔 Manage Wardrobe
          </button>
          <button onClick={() => setPage("suggestion")} style={{background: "#1a1a2e"}}>
            ✨ Get Suggestion
          </button>
        </div>

        <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px"}}>
          <div style={{background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 2px 10px #0001"}}>
            <div style={{fontSize: "2rem", marginBottom: "12px"}}>📸</div>
            <h2>Upload Clothes</h2>
            <p style={{color: "#666"}}>Add your clothes with photos to build your wardrobe</p>
          </div>
          <div style={{background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 2px 10px #0001"}}>
            <div style={{fontSize: "2rem", marginBottom: "12px"}}>🌤️</div>
            <h2>Weather Aware</h2>
            <p style={{color: "#666"}}>Get suggestions based on real time weather in your city</p>
          </div>
          <div style={{background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 2px 10px #0001"}}>
            <div style={{fontSize: "2rem", marginBottom: "12px"}}>🤖</div>
            <h2>AI Powered</h2>
            <p style={{color: "#666"}}>Smart outfit suggestions powered by Groq AI</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
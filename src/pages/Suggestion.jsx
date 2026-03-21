import { useState } from "react"
import axios from "axios"

function Suggestion() {
  const [city, setCity] = useState("")
  const [occasion, setOccasion] = useState("")
  const [mood, setMood] = useState("")
  const [gender, setGender] = useState("")
  const [loading, setLoading] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [messages, setMessages] = useState([])

  const getSuggestion = async () => {
    setLoading(true)
    const res = await axios.get(`https://wearwise-backend-gu9i.onrender.com/suggest?city=${city}&occasion=${occasion}&mood=${mood}&gender=${gender}`)
    setMessages([{ role: "assistant", content: res.data.suggestion }])
    setLoading(false)
  }

  const sendMessage = async () => {
    if (!chatInput.trim()) return
    const newMessages = [...messages, { role: "user", content: chatInput }]
    setMessages(newMessages)
    setChatInput("")
    setLoading(true)
    const res = await axios.post("hhttps://wearwise-backend-gu9i.onrender.com/chat", { messages: newMessages })
    setMessages([...newMessages, { role: "assistant", content: res.data.reply }])
    setLoading(false)
  }

  return (
    <div className="main">
      <h1>✨ Get Outfit Suggestion</h1>

      <div style={{background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 2px 10px #0001", marginBottom: "24px"}}>
        <h2>Tell us about your day</h2>
        <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "16px"}}>
          <input placeholder="🌆 Enter your city" value={city} onChange={e => setCity(e.target.value)} />
          <select value={occasion} onChange={e => setOccasion(e.target.value)}>
            <option value="">🎯 Select Occasion</option>
            <option value="college">🎓 College</option>
            <option value="office">💼 Office</option>
            <option value="wedding">💍 Wedding</option>
            <option value="temple">🛕 Temple</option>
            <option value="gym">💪 Gym</option>
            <option value="casual">😊 Casual</option>
            <option value="party">🎉 Party</option>
          </select>
          <select value={mood} onChange={e => setMood(e.target.value)}>
            <option value="">😊 Select Mood</option>
            <option value="energetic">⚡ Energetic</option>
            <option value="lazy">😴 Lazy</option>
            <option value="confident">😎 Confident</option>
            <option value="relaxed">😌 Relaxed</option>
          </select>
          <select value={gender} onChange={e => setGender(e.target.value)}>
            <option value="">👤 Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="prefer not to say">Prefer not to say</option>
          </select>
        </div>
        <button onClick={getSuggestion} style={{width: "100%", padding: "14px"}}>
          {loading ? "Getting Suggestion..." : "✨ Get AI Suggestion"}
        </button>
      </div>

      {messages.length > 0 && (
        <div style={{background: "white", borderRadius: "16px", boxShadow: "0 2px 10px #0001", overflow: "hidden"}}>
          <div style={{padding: "24px", maxHeight: "400px", overflowY: "auto"}}>
            {messages.map((msg, i) => (
              <div key={i} style={{display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", marginBottom: "16px"}}>
                <div style={{
                  maxWidth: "75%",
                  padding: "14px 18px",
                  borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: msg.role === "user" ? "#e94560" : "#1a1a2e",
                  color: "white",
                  lineHeight: "1.7",
                  whiteSpace: "pre-wrap"
                }}>
                  {msg.role === "assistant" && <strong style={{color: "#e94560", display: "block", marginBottom: "8px"}}>🤖 AI Stylist</strong>}
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{display: "flex", justifyContent: "flex-start", marginBottom: "16px"}}>
                <div style={{padding: "14px 18px", borderRadius: "18px 18px 18px 4px", background: "#1a1a2e", color: "white"}}>
                  ✍️ Typing...
                </div>
              </div>
            )}
          </div>
          <div style={{padding: "16px", borderTop: "1px solid #f0f0f0", display: "flex", gap: "12px"}}>
            <input
              placeholder="Ask anything eg. why this shirt? any alternatives?"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              style={{flex: 1}}
            />
            <button onClick={sendMessage} style={{padding: "12px 24px"}}>Send</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Suggestion
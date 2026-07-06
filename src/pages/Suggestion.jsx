import React, { useState } from 'react'
import axios from 'axios'

const suggestionStyles = `
.suggest-page-bg {
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 40px 0;
  box-sizing: border-box;
  /* Updated to your beautiful new vanity studio backdrop */
  background-image: 
    linear-gradient(rgba(244, 245, 250, 0.4), rgba(244, 245, 250, 0.4)),
    url('/suggestion-bg.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.suggest-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px;
  font-family: 'Poppins', sans-serif;
}

.suggest-header h1 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.suggest-header p {
  color: #4b5563;
  font-weight: 500;
  font-size: 1rem;
  margin-top: 4px;
  margin-bottom: 32px;
}

.input-glass-panel {
  background: rgba(255, 255, 255, 0.25) !important;
  backdrop-filter: blur(16px) saturate(120%) !important;
  -webkit-backdrop-filter: blur(16px) saturate(120%) !important;
  border: 1px solid rgba(255, 255, 255, 0.4) !important;
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
  margin-bottom: 40px;
}

.suggest-form-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .suggest-form-grid { grid-template-columns: 1fr; }
}

.suggest-form-grid input {
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.6) !important;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  outline: none;
  transition: all 0.25s ease;
  color: #1a1a2e;
}

.suggest-form-grid input:focus {
  border-color: #e94560 !important;
  background: white !important;
  box-shadow: 0 0 0 4px rgba(233, 69, 96, 0.15) !important;
}

.generate-btn {
  background: linear-gradient(135deg, #1a1a2e 0%, #252542 100%);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 15px rgba(26, 26, 46, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: 100%;
}

.generate-btn:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #e94560 0%, #c62f48 100%);
  box-shadow: 0 6px 20px rgba(233, 69, 96, 0.35);
}

.outfit-showcase-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .outfit-showcase-grid { grid-template-columns: 1fr; }
}

.outfit-card {
  background: rgba(255, 255, 255, 0.75) !important;
  backdrop-filter: blur(20px) saturate(140%) !important;
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.04);
}

.outfit-card h3 {
  margin-top: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #e94560;
  border-bottom: 2px solid rgba(233, 69, 96, 0.1);
  padding-bottom: 12px;
  margin-bottom: 16px;
}

.outfit-line {
  margin: 10px 0;
  font-size: 0.95rem;
  color: #374151;
}

.outfit-line strong {
  color: #1a1a2e;
  font-weight: 600;
}

.meta-info-card {
  background: rgba(255, 255, 255, 0.6) !important;
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  margin-bottom: 24px;
}

.meta-info-card h4 {
  margin: 0 0 12px 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #1a1a2e;
}

.meta-info-card p {
  margin: 6px 0;
  font-size: 0.9rem;
  color: #4b5563;
  line-height: 1.5;
}

.quick-tip-banner {
  background: linear-gradient(90deg, rgba(233, 69, 96, 0.1) 0%, rgba(255, 255, 255, 0.4) 100%) !important;
  border-left: 4px solid #e94560;
  padding: 16px 20px;
  border-radius: 0 12px 12px 0;
  font-size: 0.9rem;
  font-weight: 500;
  color: #1a1a2e;
}

.loading-pulse {
  text-align: center;
  padding: 40px;
  font-weight: 600;
  color: #1a1a2e;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}
`;

if (typeof document !== 'undefined') {
  const existing = document.getElementById('suggest-inline-styles');
  if (existing) existing.remove();
  
  const styleElement = document.createElement('style');
  styleElement.id = 'suggest-inline-styles';
  styleElement.innerText = suggestionStyles;
  document.head.appendChild(styleElement);
}

function Suggestion() {
  const [city, setCity] = useState("")
  const [occasion, setOccasion] = useState("")
  const [mood, setMood] = useState("")
  const [gender, setGender] = useState("")
  const [rawOutput, setRawOutput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!city || !occasion) {
      alert("Please fill in at least City and Occasion parameters.")
      return
    }
    setLoading(true)
    try {
      const response = await axios.get("http://127.0.0.1:8000/suggest", {
        params: { city, occasion, mood, gender }
      })
      setRawOutput(response.data.suggestion)
    } catch (error) {
      console.error("Error generating suggestions", error)
    } finally {
      setLoading(false)
    }
  }

  const parseSection = (text, startKey, endKey) => {
    if (!text) return ""
    const startIdx = text.indexOf(startKey)
    if (startIdx === -1) return ""
    const sub = text.substring(startIdx + startKey.length)
    if (!endKey) return sub.trim()
    const endIdx = sub.indexOf(endKey)
    return endIdx === -1 ? sub.trim() : sub.substring(0, endIdx).trim()
  }

  const cleanLine = (block, key) => {
    const line = block.split('\n').find(l => l.toLowerCase().includes(key.toLowerCase()))
    return line ? line.replace(/^[-*\s:\s]*/, '').replace(new RegExp(`^${key}`, 'i'), '').replace(/^[:\s]*/, '').trim() : "Not specified"
  }

  const outfit1Block = parseSection(rawOutput, "OUTFIT 1 (Best Pick):", "OUTFIT 2")
  const outfit2Block = parseSection(rawOutput, "OUTFIT 2 (Alternative):", "Why these items:")
  const whyBlock = parseSection(rawOutput, "Why these items:", "Quick Tip:")
  const tipBlock = parseSection(rawOutput, "Quick Tip:", null)

  return (
    <div className="suggest-page-bg">
      <div className="suggest-container">
        <header className="suggest-header">
          <h1>AI Outfit Planner</h1>
          <p>Contextual, smart rotation recommendations tailored to weather thresholds and personal inventory arrays.</p>
        </header>

        <div className="input-glass-panel">
          <div className="suggest-form-grid">

          <input placeholder="City" value={city} onChange={e => setCity(e.target.value)} />            
            {/* 🌟 ENRICHED: Occasions List */}
            <input placeholder="Occasion eg. college, office..." list="suggest-occasions" value={occasion} onChange={e => setOccasion(e.target.value)} />
            <datalist id="suggest-occasions">
              <option value="College" />
              <option value="Office" />
              <option value="Date" />
              <option value="Temple" />
              <option value="Casual" />
              <option value="Formal" />
              <option value="Wedding" />
              <option value="Festival" />
              <option value="Party" />
              <option value="Gym" />
              <option value="Sports" />
              <option value="Beach" />
              <option value="Travel" />
              <option value="Interview" />
            </datalist>

            {/* 🌟 ENRICHED: Moods List */}
            <input placeholder="Mood eg. confident, relaxed..." list="suggest-moods" value={mood} onChange={e => setMood(e.target.value)} />
            <datalist id="suggest-moods">
              <option value="Energetic" />
              <option value="Lazy" />
              <option value="Confident" />
              <option value="Relaxed" />
              <option value="Professional" />
              <option value="Elegant" />
              <option value="Fun" />
              <option value="Minimal" />
              <option value="Stylish" />
              <option value="Cozy" />
              <option value="Bold" />
            </datalist>

            {/* 🌟 Gender Selection Options */}
            <input placeholder="Gender eg. male, female..." list="suggest-genders" value={gender} onChange={e => setGender(e.target.value)} />
            <datalist id="suggest-genders">
              <option value="Male" />
              <option value="Female" />
              <option value="Unisex" />
            </datalist>
          </div>
          <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
            {loading ? "Analyzing Wardrobe Matrix..." : "Generate Smart Options"}
          </button>
        </div>

        {loading && <div className="loading-pulse">Consulting engine logs and mapping available items...</div>}

        {!loading && rawOutput && (
          <div className="results-wrapper">
            <div className="outfit-showcase-grid">
              
              <div className="outfit-card">
                <h3>Outfit 1: Primary Selection</h3>
                <div className="outfit-line"><strong>Top:</strong> {cleanLine(outfit1Block, "Top")}</div>
                <div className="outfit-line"><strong>Bottom:</strong> {cleanLine(outfit1Block, "Bottom")}</div>
                <div className="outfit-line"><strong>Footwear:</strong> {cleanLine(outfit1Block, "Footwear")}</div>
                <div className="outfit-line"><strong>Accessories:</strong> {cleanLine(outfit1Block, "Accessories")}</div>
                <div className="outfit-line" style={{ marginTop: '14px', fontStyle: 'italic', color: '#4b5563' }}>
                  <strong>Stylist Note:</strong> {cleanLine(outfit1Block, "Why")}
                </div>
              </div>

              <div className="outfit-card">
                <h3>Outfit 2: Rotational Alternative</h3>
                <div className="outfit-line"><strong>Top:</strong> {cleanLine(outfit2Block, "Top")}</div>
                <div className="outfit-line"><strong>Bottom:</strong> {cleanLine(outfit2Block, "Bottom")}</div>
                <div className="outfit-line"><strong>Footwear:</strong> {cleanLine(outfit2Block, "Footwear")}</div>
                <div className="outfit-line"><strong>Accessories:</strong> {cleanLine(outfit2Block, "Accessories")}</div>
                <div className="outfit-line" style={{ marginTop: '14px', fontStyle: 'italic', color: '#4b5563' }}>
                  <strong>Stylist Note:</strong> {cleanLine(outfit2Block, "Why")}
                </div>
              </div>

            </div>

            {whyBlock && (
              <div className="meta-info-card">
                <h4>Selection Engineering Summary</h4>
                {whyBlock.split('\n').filter(l => l.trim().length > 0).map((line, i) => (
                  <p key={i}>{line.replace(/^[-*\s]*/, '')}</p>
                ))}
              </div>
            )}

            {tipBlock && (
              <div className="quick-tip-banner">
                💡 <strong>Pro Styling Insight:</strong> {tipBlock.replace(/^[:\s]*/, '')}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Suggestion;
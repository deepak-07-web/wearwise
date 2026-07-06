import { useState, useEffect } from "react"
import axios from "axios"

const wardrobeStyles = `
.wardrobe-page-bg {
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 40px 0;
  box-sizing: border-box;
  /* Fixed path with your exact double extension */
  background-image: 
    linear-gradient(rgba(244, 245, 250, 0.4), rgba(244, 245, 250, 0.4)),
    url('/closet-bg.jpg.png'); 
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.wardrobe-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  font-family: 'Poppins', sans-serif;
}

.wardrobe-header-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}

.wardrobe-header h1 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.wardrobe-header-icon {
  width: 34px;
  height: 34px;
  fill: #1a1a2e;
}

.wardrobe-header p {
  color: #374151;
  font-weight: 500;
  font-size: 1rem;
  margin-top: 4px;
  margin-bottom: 32px;
}

/* 🌟 PREMIUM POLISH: Converted to a stunning premium frosted glass panel */
.form-card {
  background: rgba(255, 255, 255, 0.25) !important;
  backdrop-filter: blur(16px) saturate(120%) !important;
  -webkit-backdrop-filter: blur(16px) saturate(120%) !important;
  border: 1px solid rgba(255, 255, 255, 0.4) !important;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.06);
  margin-bottom: 40px;
}

.form-card h2 {
  font-size: 1.25rem;
  margin-bottom: 24px;
  color: #1a1a2e;
  font-weight: 700;
}

.wardrobe-form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .wardrobe-form-grid { grid-template-columns: 1fr; }
}

/* 🌟 Input fields tweaked for premium glass integration */
.wardrobe-form-grid input {
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.6) !important;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  outline: none;
  transition: all 0.25s ease;
  box-sizing: border-box;
  color: #1a1a2e;
}

.wardrobe-form-grid input:focus {
  border-color: #e94560 !important;
  background: white !important;
  box-shadow: 0 0 0 4px rgba(233, 69, 96, 0.15) !important;
}

.wardrobe-form-grid input::placeholder {
  color: #555566;
  font-size: 0.9rem;
}

.file-input-wrapper {
  position: relative;
  display: flex;
  width: 100%;
}

.file-input-wrapper input[type="file"] {
  position: absolute;
  left: 0; top: 0; opacity: 0; width: 100%; height: 100%;
  cursor: pointer;
}

.file-label {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.5) !important;
  backdrop-filter: blur(4px);
  border: 1px dashed rgba(26, 26, 46, 0.2);
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1a1a2e;
  transition: all 0.25s ease;
  cursor: pointer;
  box-sizing: border-box;
}

.file-input-wrapper:hover .file-label {
  background: rgba(255, 255, 255, 0.8) !important;
  border-color: #e94560;
  color: #e94560;
}

/* Update your Wardrobe Add button styling to match the Suggestion box color */
.add-btn {
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
}

.add-btn:hover {
  transform: translateY(-2px);
  /* Elegant dark overlay glow on hover instead of switching to pink */
  background: linear-gradient(135deg, #252542 0%, #1a1a2e 100%);
  box-shadow: 0 6px 20px rgba(26, 26, 46, 0.35);
}

.wardrobe-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 900px) { .wardrobe-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .wardrobe-grid { grid-template-columns: 1fr; } }

.cloth-card {
  background: rgba(255, 255, 255, 0.75) !important;
  backdrop-filter: blur(20px) saturate(140%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(140%) !important;
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.04);
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cloth-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(26, 26, 46, 0.1);
  border-color: rgba(233, 69, 96, 0.3) !important;
}

.fav-star {
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: 1.4rem;
  cursor: pointer;
  z-index: 5;
  user-select: none;
  transition: transform 0.2s;
}

.fav-star:hover { transform: scale(1.15); }
.active-star { filter: drop-shadow(0 0 4px rgba(250, 204, 21, 0.6)); }

.placeholder-art {
  width: 100%;
  height: 220px;
  background: rgba(244, 246, 249, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4.5rem;
}

.cloth-img {
  width: 100%;
  height: 220px;
  object-fit: contain;
  background: rgba(255, 255, 255, 0.6);
  padding: 12px;
  box-sizing: border-box;
}

.cloth-details {
  padding: 20px;
}

.cloth-details h2 {
  font-size: 1.15rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 6px;
}

.cloth-meta {
  color: #4b5563;
  font-size: 0.85rem;
  margin-bottom: 4px;
}

.cloth-tag {
  color: #e94560;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.delete-btn {
  background: rgba(239, 68, 68, 0.05);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}

.delete-btn:hover {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
}
`;

if (typeof document !== 'undefined') {
  const existing = document.getElementById('wardrobe-inline-styles');
  if (existing) existing.remove();
  
  const styleElement = document.createElement('style');
  styleElement.id = 'wardrobe-inline-styles';
  styleElement.innerText = wardrobeStyles;
  document.head.appendChild(styleElement);
}

function Wardrobe() {
  const [clothes, setClothes] = useState([])
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [color, setColor] = useState("")
  const [occasion, setOccasion] = useState("")
  const [fabric, setFabric] = useState("")
  const [file, setFile] = useState(null)

  useEffect(() => { fetchClothes() }, [])

  const fetchClothes = async () => {
    const res = await axios.get("http://127.0.0.1:8000/clothes")
    setClothes(res.data)
  }

  const addCloth = async () => {
    const formData = new FormData()
    formData.append("name", name)
    formData.append("type", type)
    formData.append("color", color)
    formData.append("occasion", occasion)
    formData.append("fabric", fabric)
    if (file) {
      formData.append("file", file)
    }
    await axios.post("http://127.0.0.1:8000/clothes", formData)
    fetchClothes()
    setName(""); setType(""); setColor(""); setOccasion(""); setFabric(""); setFile(null)
  }

  const deleteCloth = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/clothes/${id}`)
    fetchClothes()
  }

  const toggleFavourite = async (id) => {
    await axios.put(`http://127.0.0.1:8000/clothes/${id}/favourite`)
    fetchClothes()
  }

  const getEmoji = (type) => {
    const t = type.toLowerCase()
    if (t.includes("pant") || t.includes("cargo") || t.includes("jeans")) return "👖"
    if (t.includes("shirt") || t.includes("tshirt")) return "👕"
    if (t.includes("dress") || t.includes("saree")) return "👗"
    if (t.includes("shoe")) return "👟"
    if (t.includes("jacket") || t.includes("hoodie")) return "🧥"
    if (t.includes("shorts")) return "🩳"
    return "👔"
  }

  return (
    <div className="wardrobe-page-bg">
      <div className="wardrobe-container">
        <header className="wardrobe-header">
          <div className="wardrobe-header-wrapper">
            <svg className="wardrobe-header-icon" viewBox="0 0 24 24">
              <path d="M18.14 8.76l-3.32-1.92a2.83 2.83 0 0 0-1.63-.5h-.38v-.7a1.69 1.69 0 0 0 1.25-1.62A1.7 1.7 0 0 0 12.37 2.3a1.72 1.72 0 0 0-1.67 1.72 1.69 1.69 0 0 0 1.25 1.62v.7h-.38a2.83 2.83 0 0 0-1.63.5L5.62 8.76a1.35 1.35 0 0 0-.58 1.11v9.33A2.47 2.47 0 0 0 7.5 21.7h9a2.47 2.47 0 0 0 2.46-2.5V9.87a1.35 1.35 0 0 0-.82-1.11zM12 7.84a.85.85 0 0 1 .49.15l3.32 1.91v2.3H8.19v-2.3l3.32-1.91a.85.85 0 0 1 .49-.15z" />
            </svg>
            <h1>My Wardrobe</h1>
          </div>
          <p>Manage, curate, and catalog your pieces for smart styling.</p>
        </header>

        {/* 🌟 Refined Panel */}
        <div className="form-card">
          <h2>Add New Cloth</h2>
          <div className="wardrobe-form-grid">
            <input placeholder="Name eg. Blue Shirt" value={name} onChange={e => setName(e.target.value)} />

            <input placeholder="Type eg. shirt, cargo..." list="type-options" value={type} onChange={e => setType(e.target.value)} />
            <datalist id="type-options">
              <option value="Shirt" /><option value="T-Shirt" /><option value="Pants" /><option value="Cargo" />
              <option value="Baggy" /><option value="Skinny Jeans" /><option value="Kurta" /><option value="Saree" />
              <option value="Dress" /><option value="Jacket" /><option value="Shorts" /><option value="Gym Wear" />
              <option value="Hoodie" /><option value="Blazer" /><option value="Trackpants" /><option value="Dhoti" />
            </datalist>

            <input placeholder="Color eg. blue, black..." list="color-options" value={color} onChange={e => setColor(e.target.value)} />
            <datalist id="color-options">
              <option value="Black" /><option value="White" /><option value="Blue" /><option value="Navy Blue" />
              <option value="Red" /><option value="Green" /><option value="Yellow" /><option value="Pink" />
              <option value="Grey" /><option value="Brown" /><option value="Beige" /><option value="Orange" />
              <option value="Purple" /><option value="Maroon" />
            </datalist>

            <input placeholder="Occasion eg. casual, formal..." list="occasion-options" value={occasion} onChange={e => setOccasion(e.target.value)} />
            <datalist id="occasion-options">
              <option value="Casual" /><option value="Formal" /><option value="College" /><option value="Office" />
              <option value="Wedding" /><option value="Temple" /><option value="Gym" /><option value="Party" />
              <option value="Beach" /><option value="Festival" /><option value="Date" /><option value="Sports" />
            </datalist>

            <input placeholder="Fabric eg. cotton, denim..." list="fabric-options" value={fabric} onChange={e => setFabric(e.target.value)} />
            <datalist id="fabric-options">
              <option value="Cotton" /><option value="Polyester" /><option value="Silk" /><option value="Wool" />
              <option value="Denim" /><option value="Linen" /><option value="Rayon" /><option value="Nylon" />
              <option value="Velvet" /><option value="Chiffon" /><option value="Fleece" /><option value="Lycra" />
            </datalist>

            <div className="file-input-wrapper">
              <input type="file" id="cloth-file" onChange={e => setFile(e.target.files[0])} />
              {/* 🌟 Removed the camera emoji here for a pristine professional look */}
              <label htmlFor="cloth-file" className="file-label">
                {file ? file.name.slice(0, 15) + "..." : "Choose Image File"}
              </label>
            </div>
          </div>
          <button className="add-btn" onClick={addCloth}>Add Item to Wardrobe</button>
        </div>

        <div className="wardrobe-grid">
          {[...clothes].sort((a, b) => b.is_favourite - a.is_favourite).map(cloth => (
            <div key={cloth.id} className="cloth-card">
              <div 
                className={`fav-star ${cloth.is_favourite ? 'active-star' : ''}`}
                onClick={() => toggleFavourite(cloth.id)}
              >
                {cloth.is_favourite ? "⭐" : "☆"}
              </div>
              
              {cloth.image_url.includes("placehold") ? (
                <div className="placeholder-art">
                  {getEmoji(cloth.type)}
                </div>
              ) : (
                <img src={cloth.image_url} alt={cloth.name} className="cloth-img" />
              )}
              
              <div className="cloth-details">
                <h2>{cloth.name}</h2>
                <p className="cloth-meta">{cloth.type} • {cloth.color} • {cloth.fabric}</p>
                <p className="cloth-tag">{cloth.occasion}</p>
                <button className="delete-btn" onClick={() => deleteCloth(cloth.id)}>
                  Remove 
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wardrobe;
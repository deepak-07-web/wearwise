import { useState, useEffect } from "react"
import axios from "axios"

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
    const res = await axios.get("https://wearwise-backend-gu9i.onrender.com/clothes")
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
    await axios.post("https://wearwise-backend-gu9i.onrender.com/clothes", formData)
    fetchClothes()
    setName(""); setType(""); setColor(""); setOccasion(""); setFabric(""); setFile(null)
  }

  const deleteCloth = async (id) => {
    await axios.delete(`https://wearwise-backend-gu9i.onrender.com/clothes/${id}`)
    fetchClothes()
  }
  const toggleFavourite = async (id) => {
    await axios.put(`https://wearwise-backend-gu9i.onrender.com/clothes/${id}/favourite`)
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
    <div className="main">
      <h1>👔 My Wardrobe</h1>

      <div style={{background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 2px 10px #0001", marginBottom: "32px"}}>
        <h2>Add New Cloth</h2>
        <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "12px"}}>

          <input placeholder="Name eg. Blue Shirt" value={name} onChange={e => setName(e.target.value)} />

          <input placeholder="Type eg. shirt, cargo..." list="type-options" value={type} onChange={e => setType(e.target.value)} />
          <datalist id="type-options">
            <option value="Shirt" />
            <option value="T-Shirt" />
            <option value="Pants" />
            <option value="Cargo" />
            <option value="Baggy" />
            <option value="Skinny Jeans" />
            <option value="Kurta" />
            <option value="Saree" />
            <option value="Dress" />
            <option value="Jacket" />
            <option value="Shorts" />
            <option value="Gym Wear" />
            <option value="Hoodie" />
            <option value="Blazer" />
            <option value="Trackpants" />
            <option value="Dhoti" />
          </datalist>

          <input placeholder="Color eg. blue, black..." list="color-options" value={color} onChange={e => setColor(e.target.value)} />
          <datalist id="color-options">
            <option value="Black" />
            <option value="White" />
            <option value="Blue" />
            <option value="Navy Blue" />
            <option value="Red" />
            <option value="Green" />
            <option value="Yellow" />
            <option value="Pink" />
            <option value="Grey" />
            <option value="Brown" />
            <option value="Beige" />
            <option value="Orange" />
            <option value="Purple" />
            <option value="Maroon" />
          </datalist>

          <input placeholder="Occasion eg. casual, formal..." list="occasion-options" value={occasion} onChange={e => setOccasion(e.target.value)} />
          <datalist id="occasion-options">
            <option value="Casual" />
            <option value="Formal" />
            <option value="College" />
            <option value="Office" />
            <option value="Wedding" />
            <option value="Temple" />
            <option value="Gym" />
            <option value="Party" />
            <option value="Beach" />
            <option value="Festival" />
            <option value="Date" />
            <option value="Sports" />
          </datalist>

          <input placeholder="Fabric eg. cotton, denim..." list="fabric-options" value={fabric} onChange={e => setFabric(e.target.value)} />
          <datalist id="fabric-options">
            <option value="Cotton" />
            <option value="Polyester" />
            <option value="Silk" />
            <option value="Wool" />
            <option value="Denim" />
            <option value="Linen" />
            <option value="Rayon" />
            <option value="Nylon" />
            <option value="Velvet" />
            <option value="Chiffon" />
            <option value="Fleece" />
            <option value="Lycra" />
          </datalist>

          <input type="file" onChange={e => setFile(e.target.files[0])} style={{padding: "8px"}} />

        </div>
        <button onClick={addCloth}>+ Add Cloth</button>
      </div>

      <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px"}}>
        {clothes.map(cloth => (
          <div key={cloth.id} style={{background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 10px #0001", position: "relative"}}>
  <div
    onClick={() => toggleFavourite(cloth.id)}
    style={{position: "absolute", top: "10px", right: "10px", fontSize: "1.5rem", cursor: "pointer", zIndex: 1}}
  >
    {cloth.is_favourite ? "⭐" : "☆"}
  </div>
            {cloth.image_url.includes("placehold") ? (
              <div style={{width: "100%", height: "200px", background: "#f0f4f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5rem"}}>
                {getEmoji(cloth.type)}
              </div>
            ) : (
              <img src={cloth.image_url} alt={cloth.name} style={{width: "100%", height: "200px", objectFit: "cover"}} />
            )}
            <div style={{padding: "16px"}}>
              <h2 style={{marginBottom: "4px"}}>{cloth.name}</h2>
              <p style={{color: "#666", fontSize: "0.85rem"}}>{cloth.type} • {cloth.color} • {cloth.fabric}</p>
              <p style={{color: "#e94560", fontSize: "0.85rem", marginBottom: "12px"}}>{cloth.occasion}</p>
              <button onClick={() => deleteCloth(cloth.id)} style={{background: "#ff4444", padding: "8px 16px", fontSize: "0.8rem"}}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wardrobe
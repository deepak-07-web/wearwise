import React, { useState } from 'react';
import Home from './pages/Home';
import Wardrobe from './pages/Wardrobe';
import Suggestion from './pages/Suggestion';

const globalNavbarStyles = `
/* Positioning and cleaning up the global navbar */
.global-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between; /* This separates the left logo/arrow from the right buttons */
  background-color: #1a1a2e;
  padding: 14px 24px;
  box-sizing: border-box;
  width: 100%;
}

.nav-left-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Designing a clean back arrow button */
.back-home-arrow {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.2s;
}

.back-home-arrow:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-logo-icon {
  width: 24px;
  height: 24px;
  fill: white;
}

/* 🌟 Pushes this entire button container all the way to the top right */
.nav-links-right {
  display: flex;
  gap: 16px;
  margin-left: auto; /* Solidifies the right-side alignment push */
}

.nav-btn {
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  background: transparent;
  color: #94a3b8;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
}

.nav-btn:hover {
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
}

.nav-btn.active-tab {
  background: #e94560;
  color: white;
  border-color: #e94560;
  box-shadow: 0 0 12px rgba(233, 69, 96, 0.4);
}
`;

// Injecting the refined global nav styles safely into the browser head
if (typeof document !== 'undefined') {
  const existing = document.getElementById('global-nav-styles');
  if (existing) existing.remove();
  
  const styleElement = document.createElement('style');
  styleElement.id = 'global-nav-styles';
  styleElement.innerText = globalNavbarStyles;
  document.head.appendChild(styleElement);
}

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="app-container" style={{ margin: 0, padding: 0 }}>
      {/* 🌟 Hides the entire top navbar context ONLY when viewing the home page dashboard */}
      {page !== "home" && (
        <nav className="global-navbar">
          <div className="nav-left-section">
            {/* 🌟 FIX 1: Back arrow explicitly resets the react view-state back to "home" instead of breaking out */}
            <button className="back-home-arrow" onClick={() => setPage("home")}>
              ←
            </button>
            <div className="nav-logo" onClick={() => setPage("home")}>
              <svg className="nav-logo-icon" viewBox="0 0 24 24">
                <path d="M18.14 8.76l-3.32-1.92a2.83 2.83 0 0 0-1.63-.5h-.38v-.7a1.69 1.69 0 0 0 1.25-1.62A1.7 1.7 0 0 0 12.37 2.3a1.72 1.72 0 0 0-1.67 1.72 1.69 1.69 0 0 0 1.25 1.62v.7h-.38a2.83 2.83 0 0 0-1.63.5L5.62 8.76a1.35 1.35 0 0 0-.58 1.11v9.33A2.47 2.47 0 0 0 7.5 21.7h9a2.47 2.47 0 0 0 2.46-2.5V9.87a1.35 1.35 0 0 0-.82-1.11zM12 7.84a.85.85 0 0 1 .49.15l3.32 1.91v2.3H8.19v-2.3l3.32-1.91a.85.85 0 0 1 .49-.15z" />
              </svg>
              WearWise
            </div>
          </div>

          {/* 🌟 FIX 2: Pushed over cleanly to the top-right side alignment */}
          <div className="nav-links-right">
            <button 
              className={`nav-btn ${page === "wardrobe" ? "active-tab" : ""}`} 
              onClick={() => setPage("wardrobe")}
            >
              📋 Wardrobe
            </button>
            <button 
              className={`nav-btn ${page === "suggestion" ? "active-tab" : ""}`} 
              onClick={() => setPage("suggestion")}
            >
              ✨ Suggestion
            </button>
          </div>
        </nav>
      )}

      {/* Component Core Router Display */}
      {page === "home" && <Home setPage={setPage} />}
      {page === "wardrobe" && <Wardrobe />}
      {page === "suggestion" && <Suggestion />}
    </div>
  );
}

export default App;
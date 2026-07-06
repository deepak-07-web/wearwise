import React from 'react'

const homeStyles = `
.home-page-wrapper {
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-interactive-overlay {
  position: absolute;
  /* Shifted down to 65% to center perfectly in the open pocket shown in edited-image_3.jpg */
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  z-index: 10;
  width: 100%;
  max-width: 500px;
}

.home-action-btn {
  padding: 16px 36px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.home-action-btn.wardrobe-toggle {
  background: linear-gradient(135deg, #e94560 0%, #c62f48 100%);
  color: white;
  box-shadow: 0 4px 20px rgba(233, 69, 96, 0.35);
}

.home-action-btn.wardrobe-toggle:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(233, 69, 96, 0.5);
}

.home-action-btn.suggestion-toggle {
  background: #1a1a2e;
  color: white;
  box-shadow: 0 4px 20px rgba(26, 26, 46, 0.3);
}

.home-action-btn.suggestion-toggle:hover {
  background: #252542;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(26, 26, 46, 0.45);
}
`;

if (typeof document !== 'undefined') {
  const existing = document.getElementById('home-inline-styles');
  if (existing) existing.remove();
  
  const styleElement = document.createElement('style');
  styleElement.id = 'home-inline-styles';
  styleElement.innerText = homeStyles;
  document.head.appendChild(styleElement);
}

function Home({ setPage }) {
  const inlineBg = {
    backgroundImage: "url('/home-bg.png')"
  };

  return (
    <div className="home-page-wrapper" style={inlineBg}>
      <div className="home-interactive-overlay">
        <button 
          className="home-action-btn wardrobe-toggle" 
          onClick={() => setPage("wardrobe")}
        >
           Manage Wardrobe
        </button>
        <button 
          className="home-action-btn suggestion-toggle" 
          onClick={() => setPage("suggestion")}
        >
           Get Suggestion
        </button>
      </div>
    </div>
  )
}

export default Home;
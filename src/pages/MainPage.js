import React from 'react';
import { Link } from 'react-router-dom';
import '../style/MainPage.css'; // Assuming you're styling using a CSS file

function MainPage() {
  return (
    <div className="main-page">
      <div className="content">
        <h1>openMind</h1>
        <h4>Accelerating BCI research and development</h4>
      </div>
    </div>
  );
}

export default MainPage;
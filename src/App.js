import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './pages/MainPage.js';
import DataPage from './pages/DataPage.js';
import HardwarePage from './pages/HardwarePage.js';
import AnalysisPage from './pages/AnalysisPage.js';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/data">EEG data</Link></li>
          <li><Link to="/hardware">EEG hardware</Link></li>
          <li><Link to="/analysis">EEG online analysis</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/data" element={<DataPage />} />
        <Route path="/hardware" element={<HardwarePage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
      </Routes>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './pages/MainPage.js';
import EEGPage from './pages/EEGPage.js';
import FrontPage from './pages/shopPage.js';
import ChatPage from './pages/ChatPage.js';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/eeg">EEG Products</Link></li>
          <li><Link to="/shoppage">Front Page</Link></li>
          <li><Link to="/chat">Chat</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/eeg" element={<EEGPage />} />
        <Route path="/shoppage" element={<FrontPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Court from './pages/Court';
import UnderHood from './pages/UnderHood';
import Feedback from './pages/Feedback';

function App() {
  return (
    <BrowserRouter>
      <div className="page-container">
        <Navbar />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/ask" element={<Court />} />
            <Route path="/architecture" element={<UnderHood />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Education from './pages/Education';
import Hobbies from './pages/Hobbies';
import Goals from './pages/Goals';
import Experience from './pages/Experience';
import Gallery from './pages/Gallery';
import Feedback from './pages/Feedback';
import Photobooth from './pages/Photobooth';
import './styles/App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [photo, setPhoto] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleTakePhoto = () => {
    // Logic to take a photo and set it to state
    setPhoto('/path/to/taken/photo.jpg'); // Example path
  };

  return (
    <Router>
      <div className="app">
        <video className="background-video" autoPlay loop muted>
          <source src="/src/images/background/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/education" element={<Education />} />
            <Route path="/hobbies" element={<Hobbies />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/photobooth" element={<Photobooth />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

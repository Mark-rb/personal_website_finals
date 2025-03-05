import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <NavLink to="/" className="brand-link" onClick={closeMenu}>
          My Portfolio
        </NavLink>
      </div>

      {isMobile && (
        <button 
          className={`hamburger ${isOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      )}

      <AnimatePresence>
        {(!isMobile || isOpen) && (
          <motion.div 
            className={`nav-links ${isMobile ? 'mobile' : ''}`}
            initial={isMobile ? { opacity: 0, x: "100%" } : false}
            animate={isMobile ? { opacity: 1, x: 0 } : {}}
            exit={isMobile ? { opacity: 0, x: "100%" } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              About Me
            </NavLink>
            <NavLink to="/education" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              Education
            </NavLink>
            <NavLink to="/hobbies" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              Hobbies
            </NavLink>
            <NavLink to="/goals" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              Goals
            </NavLink>
            <NavLink to="/experience" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              IT Experience
            </NavLink>
            <NavLink to="/gallery" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              Photo Gallery
            </NavLink>
            <NavLink to="/feedback" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              Feedback
            </NavLink>
            <NavLink to="/photobooth" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              Photobooth
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && isMobile && (
        <motion.div 
          className="mobile-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeMenu}
        />
      )}
    </nav>
  );
};

export default Navbar; 
import { motion } from 'framer-motion';
import '../styles/Home.css';

const Home = () => {
  return (
    <motion.div 
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="hero-section">
        <motion.h1 
          className="hero-title"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Welcome to My Portfolio
        </motion.h1>
        <motion.p 
          className="hero-subtitle"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Exploring my journey through technology, education, and personal growth
        </motion.p>
        <motion.div 
          className="cta-container"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <a href="/about" className="cta-button primary">Learn About Me</a>
          <a href="/experience" className="cta-button secondary">View My Experience</a>
        </motion.div>
      </div>
      
      <motion.div 
        className="featured-section"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2>Featured Highlights</h2>
        <div className="highlights-grid">
          <div className="highlight-card">
            <h3>Education</h3>
            <p>Discover my academic journey and achievements</p>
          </div>
          <div className="highlight-card">
            <h3>IT Experience</h3>
            <p>Explore my technical skills and projects</p>
          </div>
          <div className="highlight-card">
            <h3>Goals</h3>
            <p>Learn about my aspirations and future plans</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home; 
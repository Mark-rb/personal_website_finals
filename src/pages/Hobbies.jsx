import { motion } from 'framer-motion';
import '../styles/Hobbies.css';

const Hobbies = () => {
  const hobbies = [
    {
      id: 1,
      title: 'Gaming',
      description: 'Immersing myself with different games and enjoying interactive entertainment.',
      icon: '🎮',
      category: 'Entertainment'
    },
    {
      id: 2,
      title: 'Content Creation',
      description: 'Creating and sharing engaging digital content in tiktok.',
      icon: '🎥',
      category: 'Digital'
    },
    {
      id: 3,
      title: 'Binge Watching',
      description: 'Enjoying watching animes, movies, and shows across different streaming platforms.',
      icon: '📺',
      category: 'Entertainment'
    }
    // Add more hobbies as needed
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="hobbies-container">
      <motion.h1 
        className="page-title"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        My Hobbies & Interests
      </motion.h1>

      <motion.div 
        className="hobbies-grid"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {hobbies.map((hobby) => (
          <motion.div 
            key={hobby.id}
            className="hobby-card"
            variants={item}
          >
            <div className="hobby-icon">{hobby.icon}</div>
            <div className="hobby-content">
              <h2>{hobby.title}</h2>
              <span className="hobby-category">{hobby.category}</span>
              <p>{hobby.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Hobbies;

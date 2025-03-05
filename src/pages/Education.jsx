import { motion } from 'framer-motion';
import '../styles/Education.css';

const Education = () => {
  const educationHistory = [
    {
      id: 1,
      year: '2021-2023',
      degree: 'ABM STRAND',
      institution: 'Paranque National High School Baclaran',
      description: 'Focuses on business, finance, marketing, and management. It helps students develop skills in decision-making, financial literacy, and entrepreneurship.',
      achievements: ['With Honors']
    },
    {
      id: 2,
      year: '2023-Present',
      degree: 'Bachelor of Science in Information Technology',
      institution: 'Asia Pacific College',
      description: 'Studied core computer science concepts, software development, and system architecture.',
      achievements: ['App Development']
    },
    // Add more education entries as needed
  ];

  return (
    <motion.div 
      className="education-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="education-content">
        <motion.h1 
          className="page-title"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Education Journey
        </motion.h1>

        <div className="timeline">
          {educationHistory.map((edu, index) => (
            <motion.div 
              key={edu.id}
              className="timeline-item"
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.2 }}
            >
              <div className="timeline-content">
                <div className="time-badge">{edu.year}</div>
                <div className="education-card">
                  <h2>{edu.degree}</h2>
                  <h3>{edu.institution}</h3>
                  <p>{edu.description}</p>
                  <div className="achievements">
                    <h4>Key Achievements:</h4>
                    <ul>
                      {edu.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="certifications"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2>Additional Certifications</h2>
          <div className="cert-grid">
            <div className="cert-card">
              <h3>Mobile Legends SHS Champion</h3>
              <p>Paranque National High School Baclaran</p>
              <span className="cert-date">2021</span>
            </div>
            {/* Add more certification cards as needed */}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Education; 
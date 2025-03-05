import { motion } from 'framer-motion';
import '../styles/Experience.css';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      role: 'App Developer',
      period: '2024',
      description: 'Made an app that helps students list their works.',
      technologies: ['Java', 'Android Studio'],
      achievements: [
        'Implemented task management system for students',
        'Created user-friendly interface for work organization',
        'Integrated local storage for offline access'
      ]
    },
    {
      id: 2,
      role: 'Web Developer',
      period: '2024',
      description: 'Developed an AI app that can communicate with the users like a real person.',
      technologies: ['Java', 'Dart', 'Android Studio'],
      achievements: [
        'Integrated natural language processing for user interactions',
        'Developed real-time chat interface',
        'Implemented user feedback system for AI responses'
      ]
    },
    // Add more experiences as needed
  ];

  const skills = {
    technical: [
      { name: 'Figma', level: 80 },
      { name: 'Java', level: 60 },
      { name: 'Python', level: 50 },
      { name: 'Html', level: 70 },
    ],
    soft: [
      'Communication',
      'Self-Motivation',
      'Patience',
      'Problem-Solving',
    ]
  };

  return (
    <div className="experience-container">
      <motion.h1 
        className="page-title"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        IT Experience
      </motion.h1>

      <div className="experience-content">
        <motion.section 
          className="work-history"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Work History</h2>
          <div className="timeline">
            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id}
                className="experience-card"
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.2 }}
              >
                <div className="experience-header">
                  <h3>{exp.role}</h3>
                  <span className="company">{exp.company}</span>
                  <span className="period">{exp.period}</span>
                </div>
                <p className="description">{exp.description}</p>
                <div className="tech-stack">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="tech-badge">{tech}</span>
                  ))}
                </div>
                <div className="achievements">
                  <h4>Key Achievements:</h4>
                  <ul>
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="skills-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            {skills.technical.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-header">
                  <span>{skill.name}</span>
                  <span className="skill-level">{skill.level}%</span>
                </div>
                <div className="skill-bar-container">
                  <motion.div 
                    className="skill-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.8 + (index * 0.1) }}
                  />
                </div>
              </div>
            ))}
          </div>

          <h2>Soft Skills</h2>
          <div className="soft-skills">
            {skills.soft.map((skill, index) => (
              <motion.span 
                key={index}
                className="soft-skill-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + (index * 0.1) }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Experience;

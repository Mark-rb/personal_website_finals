import { motion } from 'framer-motion';
import '../styles/Goals.css';

const Goals = () => {
  const goals = [
    {
      id: 1,
      title: 'Gaming',
      description: 'Improve my gaming skills and achieve competitive goals.',
      objectives: [
        { text: 'Reach Platinum rank in Valorant', progress: 75 },
        { text: 'Build a gaming community', progress: 50 },
        { text: 'Stream games regularly', progress: 30 }
      ]
    },
    {
      id: 2,
      title: 'Content Creating',
      description: 'Develop engaging content and grow social media presence.',
      objectives: [
        { text: 'Reach 20k Tiktok followers', progress: 65 },
        { text: 'Create weekly video content', progress: 15 },
        { text: 'Master video editing skills', progress: 50 }
      ]
    },
    {
      id: 3,
      title: 'Sports',
      description: 'Enhance physical fitness and sports performance.',
      objectives: [
        { text: 'Play Basketball regularly', progress: 50 },
        { text: 'Play Volleyball regularly', progress: 40 },
        { text: 'Play Badminton regularly', progress: 50 }
      ]
    }
  ];

  return (
    <div className="goals-container">
      <motion.h1 
        className="page-title"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        My Goals
      </motion.h1>

      <div className="goals-content">
        {goals.map((goal, index) => (
          <motion.div 
            key={goal.id}
            className="goal-card"
            initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 * index }}
          >
            <div className="goal-header">
              <h2>{goal.title}</h2>
            </div>
            <p className="goal-description">{goal.description}</p>
            
            <div className="objectives-list">
              {goal.objectives.map((objective, i) => (
                <div key={i} className="objective-item">
                  <div className="objective-header">
                    <span>{objective.text}</span>
                    <span className="progress-percentage">{objective.progress}%</span>
                  </div>
                  <div className="progress-bar-container">
                    <motion.div 
                      className="progress-bar"
                      initial={{ width: 0 }}
                      animate={{ width: `${objective.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 + (0.1 * i) }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Goals;

import { motion } from 'framer-motion';
import '../styles/About.css';
import profileImage from '../images/profile/profile.png';

const About = () => {
  return (
    <motion.div 
      className="about-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="about-content">
        <motion.div 
          className="profile-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="profile-image-container">
            <img 
              src={profileImage} 
              alt="Profile" 
              className="profile-image"
            />
            <div className="social-icons-container">
              <a href="https://www.facebook.com/markrevin.barbon.7" target="_blank" rel="noopener noreferrer" className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@mr.lutangggg?_r=1&_d=secCgYIASAHKAESPgo8XBfd2u6a4op0e%2FiJU6tKqVJ49AjevL%2FhVdkKeSpkdD%2FVccC6bUF%2BMEhEsZr7mOTzKN%2FBOQEbWX40FQXIGgA%3D&checksum=4983d2bed1f4491100860f11359a3699c7294ad1e682e8d765a574adc9a3912d&sec_uid=MS4wLjABAAAADx3qY07yHFFuJTUH9K8afpMGaV9J3VfAxOyQyRl1o1dnVEcTeE5ISMkrb4ZcIAD_&sec_user_id=MS4wLjABAAAADx3qY07yHFFuJTUH9K8afpMGaV9J3VfAxOyQyRl1o1dnVEcTeE5ISMkrb4ZcIAD_&share_app_id=1180&share_author_id=7041082047934678018&share_link_id=2FDE0410-1299-475D-905E-A13E2FA28BA9&sharer_language=en&social_share_type=4&source=h5_t&timestamp=1741182323&tt_from=copy&u_code=dm6idl2lb87e7d&ug_btm=b8727%2Cb0&user_id=7041082047934678018&utm_campaign=client_share&utm_medium=ios&utm_source=copy" target="_blank" rel="noopener noreferrer" className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="#000000" d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/mark-revin-barbon-168b42288" target="_blank" rel="noopener noreferrer" className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://github.com/Mark-rb?tab=repositories" target="_blank" rel="noopener noreferrer" className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="#333333" d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="profile-info">
            <h1>About Me</h1>
            <p className="intro-text">
            Hello, I’m Mark Revin Barbon! I’m passionate about gaming and love creating engaging game content on TikTok. Currently, I’m an IT student, constantly striving to learn, grow, and improve my skills in technology and creativity.
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="details-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="detail-card">
            <h2>Professional Summary</h2>
            <p>
            IT student with skills in coding, gaming, and content creation. Experienced in Android app development using Java and creating engaging gaming content on TikTok. Passionate about technology, problem-solving, and continuous learning.
            </p>
          </div>

          <div className="detail-card">
            <h2>Skills & Expertise</h2>
            <div className="skills-grid">
              <div className="skill-item">Gaming</div>
              <div className="skill-item">Coding</div>
              <div className="skill-item">Editing</div>
              <div className="skill-item">Creating Content</div>
              {/* Add more skills as needed */}
            </div>
          </div>

          <div className="detail-card">
            <h2>Interests</h2>
            <p>
            Beyond technology, I'm passionate about gaming as it enhances my creativity, strategy, and problem-solving skills. I enjoy exploring game mechanics, staying updated with industry trends, and continuously improving in both gaming and technology.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;

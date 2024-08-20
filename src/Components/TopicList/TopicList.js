import React, { useState, useContext } from 'react';
import JICON from '../../Files/Java.png';
import PYTHON from '../../Files/PHYTHON.jpg';
import REACT from '../../Files/React.jpg';
import APTI from '../../Files/Apti.webp';
import JEE from '../../Files/JEE2.jpg';
import NEET from '../../Files/Neet2.jpg';
import './TopicList.css'; // New CSS file for the updated design
import { QuizContext } from '../QuizContext/QuizContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../LoginSignup/Modal';
import NavbarComponent from '../SubComponent/NavbarComponent/NavbarComponent';
import FooterComponent from '../SubComponent/FooterComponent/FooterComponent';
import LoginComponent from '../LoginSignup/LoginComponent';

const TopicList = () => {
  const { setQuizTopic, username } = useContext(QuizContext);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const updateQuizTopic = (topic) => {
    if (!username) {
      setShowLoginModal(true);
    } else {
      switch(topic) {
        case 'profile':
          navigate('/profile');
          break;
        case 'result':
          navigate('/result');
          break;
        case 'Leader':
          navigate('/leaderboard');
          break;
        case 'AI':
          navigate('/AI');
          break;
        default:
          setQuizTopic(topic);
          navigate('/QuizPage');
          break;
      }
    }
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="nt-home-container">
      <NavbarComponent />
      <div className="nt-content">
        <h1 className="nt-title">Choose Your Quiz Topic</h1>
        <div className="nt-grid">
          <div className="nt-card" onClick={() => updateQuizTopic('Java')}>
            <img src={JICON} alt="Java" className="nt-icon" />
            <div className="nt-card-content">
              <h2>Java Basics</h2>
              <p>Test your Java knowledge</p>
            </div>
          </div>
          <div className="nt-card" onClick={() => updateQuizTopic('Python')}>
            <img src={PYTHON} alt="Python" className="nt-icon" />
            <div className="nt-card-content">
              <h2>Python Essentials</h2>
              <p>Challenge your Python skills</p>
            </div>
          </div>
          <div className="nt-card" onClick={() => updateQuizTopic('React')}>
            <img src={REACT} alt="React" className="nt-icon" />
            <div className="nt-card-content">
              <h2>React Proficiency</h2>
              <p>Measure your React expertise</p>
            </div>
          </div>
          <div className="nt-card" onClick={() => updateQuizTopic('Aptitude')}>
            <img src={APTI} alt="Aptitude" className="nt-icon" />
            <div className="nt-card-content">
              <h2>Aptitude</h2>
              <p>Test your Intelligence</p>
            </div>
          </div>
          <div className="nt-card" onClick={() => updateQuizTopic('NEET')}>
            <img src={NEET} alt="NEET" className="nt-icon" />
            <div className="nt-card-content">
              <h2>NEET</h2>
              <p>Prepare for your medical entrance</p>
            </div>
          </div>
          <div className="nt-card" onClick={() => updateQuizTopic('JEE')}>
            <img src={JEE} alt="JEE" className="nt-icon" />
            <div className="nt-card-content">
              <h2>JEE</h2>
              <p>Get ready for engineering entrance</p>
            </div>
          </div>
        </div>
      </div>
      
      <FooterComponent/>

      <Modal show={showLoginModal} onClose={handleLoginClose}>
        <LoginComponent onClose={handleLoginClose} />
      </Modal>
    </div>
    
  );
};

export default TopicList;

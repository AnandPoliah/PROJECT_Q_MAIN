import React, { useState, useContext, useEffect } from 'react';
import APTI from '../../Files/Apti.webp';
import JEE from '../../Files/JEE2.jpg';
import NEET from '../../Files/Neet2.jpg';
import GK from '../../Files/GK.webp';
import './AdaptList.css'; // Ensure this file includes the styles provided
import { QuizContext } from '../QuizContext/QuizContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../LoginSignup/Modal';
import LoginComponent from '../LoginSignup/LoginComponent';
import Navigationbar from '../SubComponent/NavbarComponent/NavbarComponent';

const AdaptList = () => {
  const { setQuizTopic, username } = useContext(QuizContext);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);

  useEffect(() => {
    // Automatically show the welcome popup on page load
    setShowWelcomePopup(true);
  }, []);

  const updateQuizTopic = (topic) => 
    {
    // if (!username) {
    //   setShowLoginModal(true);
    // }
    
      switch(topic) {
        case 'JEE':
          navigate('/Adapt', { state: { topic } });
          break;
        case 'NEET':
          navigate('/Adapt', { state: { topic } });
          break;
        case 'GATE':
          navigate('/Adapt', { state: { topic } });
          break;
        case 'quizQuestions':
          navigate('/Adapt', { state: { topic } });
          break;
        default:
          setQuizTopic(topic);
          navigate('/QuizPage');
          break;
      
    }
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  const handlePopupClose = () => {
    setShowWelcomePopup(false);
  };

  return (
    <div className="nt-home-container">
      <Navigationbar />
      <div className="nt-content">
        <h1 className="nt-title">Choose Your Quiz Topic</h1>
        <div className="nt-grid">
          <div className="nt-card" onClick={() => updateQuizTopic('JEE')}>
            <img src={JEE} alt="Java" className="nt-icon" />
            <div className="nt-card-content">
              <h2>JEE</h2>
              <p>Get ready for engineering entrance</p>
            </div>
          </div>
          <div className="nt-card" onClick={() => updateQuizTopic('NEET')}>
            <img src={NEET} alt="Python" className="nt-icon" />
            <div className="nt-card-content">
              <h2>NEET</h2>
              <p>Prepare for your medical entrance</p>
            </div>
          </div>
          <div className="nt-card" onClick={() => updateQuizTopic('GATE')}>
            <img src={APTI} alt="JEE" className="nt-icon" />
            <div className="nt-card-content">
              <h2>GATE</h2>
              <p>Get ready for your GATE exams</p>
            </div>
          </div>
          <div className="nt-card" onClick={() => updateQuizTopic('quizQuestions')}>
            <img src={GK} alt="JEE" className="nt-icon" />
            <div className="nt-card-content">
              <h2>General Knowledge</h2>
              <p>Try on some random Questions</p>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showLoginModal} onClose={handleLoginClose}>
        <LoginComponent onClose={handleLoginClose} />
      </Modal>

      {showWelcomePopup && (
        <div > 
        <div className="welcome-popup">
          <div className="welcome-content">
            <h2 style ={{ fontSize: '30px'}}>What does this do?</h2>

            <p>1.Select a quiz topic of your choice</p>
            <p>2.Answers the questions in it</p>
            <p>3.The Response of the First three questions is tracked and used to recommend the remaining questions</p>
            <p>4.The Following Question is rendered based on your past wrongly answered question</p>
            <button className="welcome-close-button" onClick={handlePopupClose}>Got it</button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default AdaptList;

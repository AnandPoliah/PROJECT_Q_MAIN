import React, { useContext, useState } from 'react';
import './NavbarComponent.css';
import QICON from '../../../Files/QICON.jpg';
import { FaJava, FaPython, FaReact, FaTrophy, FaRobot, FaUserCircle, FaChartLine, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Modal from '../../LoginSignup/Modal';
import LoginComponent from '../../LoginSignup/LoginComponent';
import { QuizContext } from '../../QuizContext/QuizContext';

const NavbarComponent = () => {
  const { setQuizTopic, username } = useContext(QuizContext);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const updateQuizTopic = (topic) => 
  {
    if (!username) 
    {
      setShowLoginModal(true);
    } 
    else{
      switch (topic) {
        case 'profile':
          navigate('/profile');
          break;
        case 'Adapt':
          navigate('/AdaptList');
          break;
        case 'Leader':
          navigate('/leaderboard');
          break;
        case 'AI':
          navigate('/form');
          break;
        case 'Create':
          navigate('/create');
          break;
        case 'Home':
          navigate('/');
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
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <img src={QICON} alt="QICON" className="navbar-image" onClick={() => updateQuizTopic("Home")} />
          </li>
          <li className="tooltip-container">
            <FaChartLine className='navbar-icon' onClick={() => updateQuizTopic('Adapt')} />
            <div className="tooltip">Adaptive Learning</div>
          </li>
          <li className="tooltip-container">
            <FaRobot className="navbar-icon" onClick={() => updateQuizTopic('AI')} />
            <div className="tooltip">AI Quiz</div>
          </li>
          <li className="tooltip-container">
            <FaPlus className="navbar-icon" onClick={() => updateQuizTopic('Create')} />
            <div className="tooltip">Create</div>
          </li>
          <li className="tooltip-container">
            <FaTrophy className="navbar-icon" onClick={() => updateQuizTopic('Leader')} />
            <div className="tooltip">Leaderboard</div>
          </li>
          <li className="tooltip-container">
            <FaUserCircle className="navbar-icon" onClick={() => updateQuizTopic('profile')} />
            <div className="tooltip">Profile</div>
          </li>
        </ul>
      </nav>

      <Modal show={showLoginModal} onClose={handleLoginClose}>
        <LoginComponent onClose={handleLoginClose} />
      </Modal>
    </div>
  );
};

export default NavbarComponent;

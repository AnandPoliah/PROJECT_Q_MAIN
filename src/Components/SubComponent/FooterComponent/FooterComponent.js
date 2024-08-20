// src/components/Footer.js

import React, { useState } from 'react';
import './FooterComponent.css';  // Import footer-specific styles

import FB from '../../../Files/FB.png';
import IG from '../../../Files/instagram.png';
import X from '../../../Files/twitter.png';

const FooterComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAboutClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <footer className="nt-footer">
      <div className="nt-footer-content">
        <div className="nt-contact">
          <h2>Contact Us</h2>
          <p>Email: <a href="mailto:support@quizmaster.com">support@quizmaster.com</a></p>
          <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
        </div>
        <div className="nt-social">
          <h2>Follow Us</h2>
          <div className="nt-social-links">
            <a href="https://facebook.com/quizmaster" target="_blank" rel="noopener noreferrer">
              <img src={FB} alt="Facebook" />
            </a>
            <a href="https://twitter.com/quizmaster" target="_blank" rel="noopener noreferrer">
              <img src={X} alt="Twitter" />
            </a>
            <a href="https://instagram.com/quizmaster" target="_blank" rel="noopener noreferrer">
              <img src={IG} alt="Instagram" />
            </a>
          </div>
        </div>
        <div className="nt-about">
          <h2 onClick={handleAboutClick}>About Us</h2>
          <p>QuizMaster brings you engaging quizzes across various topics. Challenge yourself and expand your knowledge!</p>
        </div>
      </div>
      <div className="nt-footer-bottom">
        <p>&copy; {new Date().getFullYear()} QuizMaster. All rights reserved.</p>
      </div>

      {/* Modal for Disclaimer */}
      {isModalOpen && (
        <div className="nt-modal-overlay">
          <div className="nt-modal">
            <h2>Disclaimer</h2>
            <p>
              The information provided on this website is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
            </p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default FooterComponent;

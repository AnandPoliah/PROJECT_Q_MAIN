import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import { QuizContext } from '../QuizContext/QuizContext';

const ProfilePage = () => {
  const [testResults, setTestResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedQuizName, setSelectedQuizName] = useState('All');
  const {username,setUsername}=useContext(QuizContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/result`)
      .then(response => {
        setTestResults(response.data);
        setFilteredResults(response.data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    const filtered = testResults.filter(entry => entry.participant===username && 
      (selectedTopic === 'All' || entry.qtopic === selectedTopic) &&
      (selectedQuizName === 'All' || entry.qname === selectedQuizName)
    );
    setFilteredResults(filtered);
  }, [selectedTopic, selectedQuizName, testResults,username]);

  const topics = [...new Set(testResults.map(entry => entry.qtopic)), 'All'];
  const quizNames = [...new Set(testResults.map(entry => entry.qname)), 'All'];

  const handleLogout = () => {
    setUsername(null);
    navigate('/');
  };

  return (
    <div className="profile-page-container">
      <h1 className="profile-header" style={{ fontSize:'40px'}}>User Profile</h1>

      <div className="user-details">
        <h2>Details</h2>
        <p style={{ fontSize: '20px' }}><strong>Username:</strong> {username}</p>
        </div>

      <div className="test-results">
        <h2>Previous Test Results</h2>

        <div className="filters">
          <label>Filter by Quiz Topic:</label>
          <select style={{color:"black"}}value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)}>
            {topics.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>

          <label>Filter by Quiz Name:</label>
          <select style={{color:'black'}} value={selectedQuizName} onChange={e => setSelectedQuizName(e.target.value)}>
            {quizNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Quiz Topic</th>
              <th>Quiz Name</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((entry, index) => (
              <tr key={index}>
                <td>{entry.qtopic}</td>
                <td>{entry.qname}</td>
                <td>{entry.mark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;

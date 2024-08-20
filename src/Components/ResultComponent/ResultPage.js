import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { QuizContext } from '../QuizContext/QuizContext';
import { Link, useLocation } from 'react-router-dom';
import './ResultPage.css';
import NavbarComponent from '../SubComponent/NavbarComponent/NavbarComponent';

function ResultPage() {
  const { mark, quizTopic, quizName, username } = useContext(QuizContext);
  const location = useLocation();
  const { quizId, correctFocusTopic } = location.state || {};
  const [wrongTopics, setWrongTopics] = useState([]);

  useEffect(() => {
    const resDet = {
      participant: username,
      mark: mark,
      qname: quizName,
      qtopic: quizTopic,
      quizId: quizId
    };

    axios.post('http://localhost:8080/result/insertResult', resDet)
      .then(response => {
        console.log("result uploaded");
      })
      .catch(error => {
        alert('Result error:', error);
      });

    // Update the wrong topics count based on the fetched quiz data
    axios.get(`${process.env.REACT_APP_API_URL2}/Questions`)
      .then(response => {
        const filteredQuiz = response.data.find(quiz => quiz.quizId === quizId);
        if (filteredQuiz) 
        {
          const topicCounts = {};

          filteredQuiz.questions.forEach(question => {
            const topic = question.focusTopic;
            if (topic) {
              topicCounts[topic] = (topicCounts[topic] || 0) + 1;
            }
          });

          const topicsArray = Object.keys(topicCounts).map(topic => ({
            topic,
            totalQuestions: topicCounts[topic],
            totalCorrect: correctFocusTopic[topic] || 0
          }));

          setWrongTopics(topicsArray);
        }
        else {
          console.warn('No quiz found with quizId:', quizId); // Warn if no quiz is found
        }
      })
      .catch(error => console.error('Error fetching quiz data:', error));
  }, [username, mark, quizName, quizTopic, quizId, correctFocusTopic]);

  return (
    <div className="unique-result-container">
      <div className='unique-navbar-container'>
        <NavbarComponent />
      </div>
      <h2 className="unique-result-header">Result Page</h2>
      <div className="unique-result-info">
        <ul>
          <li>Quiz Topic: {quizTopic}</li>
          <li>Quiz Name: {quizName}</li>
          <li>You Scored: {mark}</li>
        </ul>
      </div>
      <table className="unique-result-table">
        <thead>
          <tr>
            <th>Quiz Topic</th>
            <th>Total Questions</th>
            <th>No of Correct</th>
            <th>No of Wrong</th>
          </tr>
        </thead>
        <tbody>
          {wrongTopics.map((quiz, index) => (
            <tr key={index}>
              <td>{quiz.topic}</td>
              <td>{quiz.totalQuestions}</td>
              <td>{quiz.totalCorrect}</td>
              <td>{quiz.totalQuestions - quiz.totalCorrect}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultPage;

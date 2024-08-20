import React, { useContext } from 'react';
import { QuizContext } from '../QuizContext/QuizContext';
import './AiResult.css';
import NavbarComponent from '../SubComponent/NavbarComponent/NavbarComponent';

function AiResult() {
  const { username, aimark, aifoctopic } = useContext(QuizContext);

  return (
    <div>
      <div className='navbar-container'>
        <NavbarComponent />
      </div>
      <div className="result-container">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        </div>
        <h2 className="result-header">Result Page</h2>
        <div className="result-info">
          <ul>
            <li>UserName: {username}</li>
            <li>You Scored: {aimark}</li>
          </ul>
        </div>
        {aifoctopic.length > 0 ? (  // Check if aifoctopic has data before rendering the table
          <table className="result-table">
            <thead>
              <tr>
                <th>Focus Topic</th>
                <th>Total Questions</th>
                <th>No of Correct</th>
                <th>No of Wrong</th>
              </tr>
            </thead>
            <tbody>
              {aifoctopic.map((quiz, index) => (
                <tr key={index}>
                  <td>{quiz.topic}</td>
                  <td>{quiz.totalQuestions}</td>
                  <td>{quiz.correct}</td>
                  <td>{quiz.totalQuestions - quiz.correct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No quiz data available</p>  // Fallback if there's no data
        )}
      </div>
    </div>
  );
}

export default AiResult;

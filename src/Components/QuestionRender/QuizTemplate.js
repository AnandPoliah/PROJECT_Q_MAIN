import React, { useEffect, useState } from 'react';
import './QuizTemplate.css';
import QB1 from '../../Files/QB-1.jpg';
import QB2 from '../../Files/QB-2.jpg';
import QB3 from '../../Files/QB-3.jpg';
import QB4 from '../../Files/QB-4.png';
import QB5 from '../../Files/QB-5.png';
import QB6 from '../../Files/QB-6.jpg';
import QB7 from '../../Files/QB-7.jpg';

const QuizTemplate = ({
  sentence1, option1, option2, option3, option4,
  onCheckboxChange, resetCheckbox, quizTopic, quizName,
  onNextClick, buttonName, correctOption, isSubmitMode
}) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [rollno, setRoll] = useState(Math.floor(Math.random() * 62));
  const [timeLeft, setTimeLeft] = useState(15);  // Timer state
  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    // Reset all states when the question changes
    setSelectedCheckbox(null);
    setRoll(Math.floor(Math.random() * 62) + 1);
    setTimeLeft(15);
    setTimerExpired(false);  // Reset the timer expired state
  }, [resetCheckbox]);

  useEffect(() => {
    if (buttonName === 'Submit' && timeLeft > 0 && !timerExpired && isSubmitMode) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !timerExpired) {
      setTimerExpired(true);  // Mark the timer as expired
      handleSubmit();  // Automatically submit when time runs out
    }
  }, [timeLeft, buttonName, isSubmitMode, timerExpired]);

  const handleCheckboxChange = (id) => {
    if (timerExpired || !isSubmitMode) return;  // Prevent changing selection after timer expiration or submission

    const newSelection = selectedCheckbox === id ? null : id;
    setSelectedCheckbox(newSelection);
    onCheckboxChange(newSelection);
  };

  const handleSubmit = () => {
    if (isSubmitMode && !timerExpired) {  // Only submit if in submit mode and timer hasn't expired
      onNextClick(selectedCheckbox);  // Evaluate and move to the next step
    }
  };

  const handleNext = () => {
    // Move to the next question
    onNextClick();
  };

  const handleChange1 = (image) => {
    setBackgroundImage(image);
  };

  const handleChange2 = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div className='total' style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }}>
      <div className='background-options'>
        <label><input type="radio" value="" checked={backgroundImage === ''} onChange={() => handleChange1('')} /> </label>
        <label><input type="radio" value="QB1" checked={backgroundImage === QB1} onChange={() => handleChange1(QB1)} /> </label>
        <label><input type="radio" value="QB2" checked={backgroundImage === QB2} onChange={() => handleChange1(QB2)} /> </label>
        <label><input type="radio" value="QB3" checked={backgroundImage === QB3} onChange={() => handleChange1(QB3)} /> </label>
        <label><input type="radio" value="QB4" checked={backgroundImage === QB4} onChange={() => handleChange1(QB4)} /> </label>
        <label><input type="radio" value="QB5" checked={backgroundImage === QB5} onChange={() => handleChange1(QB5)} /> </label>
        <label><input type="radio" value="QB6" checked={backgroundImage === QB6} onChange={() => handleChange1(QB6)} /> </label>
        <label><input type="radio" value="QB7" checked={backgroundImage === QB7} onChange={() => handleChange1(QB7)} /> </label>
      </div>
      <h1 className='quiz-header'>{quizTopic}</h1>
      <h1 className='quiz-subheader'>{quizName}</h1>
      <div className='BigDiv' style={{ backgroundColor: backgroundColor }}>
        <div className='timer-container'>
          {isSubmitMode && !timerExpired && (
            <div className='timer'>Time left: {timeLeft} seconds</div>
          )}
        </div>
        <div className='background-color-options'>
          <label><input type="radio" value="" checked={backgroundColor === ''} onChange={() => handleChange2('')} /> </label>
          <label><input type="radio" value="peachpuff" checked={backgroundColor === 'peachpuff'} onChange={() => handleChange2('peachpuff')} /> </label>
          <label><input type="radio" value="lightgreen" checked={backgroundColor === 'lightgreen'} onChange={() => handleChange2('lightgreen')} /> </label>
          <label><input type="radio" value="lightcyan" checked={backgroundColor === 'lightcyan'} onChange={() => handleChange2('lightcyan')} /> </label>
        </div>
        <div className='BigDiv01'>
          {/*<div>{rollno}</div>*/}
          <div className='BigDiv0101'>{sentence1}</div>
        </div>
        <div className='BigDiv02'>
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`BigDiv0201 ${selectedCheckbox === num ? 'selected' : ''} 
                ${!isSubmitMode && num === correctOption ? 'correct' : ''} 
                ${!isSubmitMode && selectedCheckbox === num && num !== correctOption ? 'incorrect' : ''}`}
              onClick={() => handleCheckboxChange(num)}
            >
              <div className='BigDiv020101'>{[option1, option2, option3, option4][num - 1]}</div>
            </div>
          ))}
        </div>
        {isSubmitMode && !timerExpired ? (
          <button className='button-next' onClick={handleSubmit}>{buttonName}</button>
        ) : (
          <button className='button-next' onClick={handleNext}>Next</button>
        )}
      </div>
    </div>
  );
};

export default QuizTemplate;

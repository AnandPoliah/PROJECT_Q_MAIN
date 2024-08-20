import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { QuizContext } from '../../QuizContext/QuizContext';
import { FaBars, FaJava, FaPython, FaReact, FaCode, FaLeaf, FaStethoscope, FaTools, FaLightbulb } from 'react-icons/fa';
import './SidebarComponent.css';
import NavbarComponent from '../NavbarComponent/NavbarComponent';

const iconMap = {
    'Java': FaJava,
    'Python': FaPython,
    'React': FaReact,
    'NEET': FaStethoscope,
    'JEE': FaTools,
    'Aptitude': FaLightbulb
};

const SidebarComponent = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [quizTopics, setQuizTopics] = useState([]);
    const { setQuizTopic } = useContext(QuizContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/quiz/getQuiz')
            .then(response => {
                const uniqueTopics = [...new Set(response.data.map(quiz => quiz.quizTopic))];
                setQuizTopics(uniqueTopics);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const updateQuizTopic = (topic) => {
        switch (topic) {
            case 'profile':
                navigate('/profile');
                break;
            case 'result':
                navigate('/result');
                break;
            case 'leader':
                navigate('/leaderboard');
                break;
            case 'AI':
                navigate('/AI');
                break;
            case 'Home':
                navigate('/');
                break;
            default:
                setQuizTopic(topic);
                navigate('/QuizPage');
                break;
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <NavbarComponent/>
            <FaBars className="sidebar-toggle-icon" onClick={toggleSidebar} />
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-brand">
                    <h2>QUIZ</h2>
                </div>
                <ul className="sidebar-menu">
                    <div className='side-top'>
                        {quizTopics.map((topic, index) => {
                            const IconComponent = iconMap[topic] || FaCode; // Default icon if none is mapped
                            return (
                                <li key={index}>
                                    <button onClick={() => updateQuizTopic(topic)} className="sidebar-link">
                                        <IconComponent className="sidebar-icon" />
                                        <span className="sidebar-text">{topic}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default SidebarComponent;

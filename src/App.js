import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { QuizContext, QuizProvider } from './Components/QuizContext/QuizContext';
import SignupComponent from './Components/LoginSignup/SignupComponent';
import HomeComponent from './Components/HomeComponent/HomeComponent';
import TopicList from './Components/TopicList/TopicList'
import Quizdisplay from './Components/QuizDisplay/Quizdisplay';
import QuestionList from './Components/QuestionRender/QuestionList';
import QuizTemplate from './Components/QuestionRender/QuizTemplate';
import QuizAi from './Components/QuizAi/QuizAi';
import QuizIntro from './Components/QuizAi/QuizIntro'
import AdaptiveQuiz from './Components/AdaptiveQuiz/AdaptiveQuiz';
import AdaptList from './Components/AdaptiveQuiz/AdaptList';
import QuizCreator from './Components/QuizCreator/QuizCreator';
import ResultPage from './Components/ResultComponent/ResultPage';
import LeaderBoard from './Components/LeaderBoard/LeaderBoard';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import AiResult from './Components/QuizAi/AiResult';

function ProtectedRoute({ children }) 
{
  const { username } = useContext(QuizContext);
  return username ? children : <Navigate to="/" />;
}

function App() {
  return (
    <QuizProvider>
      <BrowserRouter>
        <Routes>

        
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/" element={<HomeComponent />} />

          <Route path="/TopicList" element={<TopicList/>} />
          <Route path="/QuizPage" element={<ProtectedRoute><Quizdisplay /></ProtectedRoute>} />

          <Route path="/Quiz" element={<ProtectedRoute><QuestionList /></ProtectedRoute>} />
          <Route path="/QuizTemplate" element={<ProtectedRoute><QuizTemplate/></ProtectedRoute>} />
          
          <Route path="/form" element={<ProtectedRoute><QuizIntro/></ProtectedRoute>}/>
          <Route path="/AI" element={<ProtectedRoute><QuizAi/></ProtectedRoute>}/>
          <Route path='/AiResult' element={<ProtectedRoute><AiResult/></ProtectedRoute>}/>
          
          <Route path="/Adapt" element={<ProtectedRoute><AdaptiveQuiz/></ProtectedRoute>}/>
          <Route path="AdaptList" element={<ProtectedRoute><AdaptList/></ProtectedRoute>} />

          <Route path="/create" element={<ProtectedRoute><QuizCreator/></ProtectedRoute>}/>
          
          <Route path="/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><LeaderBoard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
          

          
          

        </Routes>
      </BrowserRouter>
    </QuizProvider>
  );
}

export default App;

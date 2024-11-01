import React, { useState } from 'react';
import { Route, Routes, useLocation, BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './pages/landing/landing';
import GlobalStyle from './globalstyles';
import MainPage from './pages/mainpage/main';
import LoginPage from './pages/loginpage/login';
import MultiPage from './pages/multi/multi';
import Room from './pages/multi/room/room';
import ProtectedRoute from './pages/loginpage/protected';
import SignupPage from './pages/signup/signup';
import DefendPage from './pages/multi/defend/defend';
import { SelectAnswerPage } from './pages/multi/defend/select/select';
import { MultiModeResultPage } from './pages/multi/result/multiResult';
import QuizGamePage from './pages/multi/game/quizGame';
import NavBar from './components/navbar/navbar';

function App() {
  const [nickname, setNickname] = useState<string | null>(localStorage.getItem("nickname"));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("uuid"));
  const location = useLocation();

  const navBarPaths = ["/login", "/main", "/multi", "/signup", "/"];
  const showNavBar = navBarPaths.includes(location.pathname);

  return (
    <>
      <GlobalStyle />
      {showNavBar && (
        <NavBar 
          nickname={nickname} 
          setNickname={setNickname} 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn} 
        />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage setNickname={setNickname} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 보호된 경로들 */}
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <MainPage /> 
            </ProtectedRoute>
          }
        />
        <Route
          path="/multi"
          element={ 
            <ProtectedRoute>
              <MultiPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/room/:id"
          element={
            <ProtectedRoute>
              <Room />
            </ProtectedRoute>
          }
        />
        <Route
          path="/multi/game" 
          element={
            <ProtectedRoute>
              <QuizGamePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/multi/defend"
          element={
            <ProtectedRoute>
              <DefendPage />
            </ProtectedRoute>
          }
        />
          <Route
          path="/multi/defend/select/:id"
          element={
            <ProtectedRoute>
              <SelectAnswerPage />
            </ProtectedRoute>
          }
        />
          <Route
          path="/multi/result"
          element={
            <ProtectedRoute>
              <MultiModeResultPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

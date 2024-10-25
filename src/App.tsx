import React from 'react';
import LandingPage from './pages/landing/landing';
import GlobalStyle from './globalstyles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/mainpage/main';
import LoginPage from './pages/loginpage/login';
import MultiPage from './pages/multi/multi';
import Room from './pages/multi/room/room';
import ProtectedRoute from './pages/loginpage/protected';
import SignupPage from './pages/signup/signup';
import AttackPage from './pages/multi/attack/attack';
import DefendPage from './pages/multi/defend/defend';
import { SolvingPage } from './pages/multi/defend/solving/solving';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
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
            path="/multi/attack"
            element={
              <ProtectedRoute>
                <AttackPage />
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
            path="/multi/defend/solving"
            element={
              <ProtectedRoute>
                <SolvingPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

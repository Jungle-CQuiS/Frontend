import React from 'react';
import LandingPage from './pages/landing/landing';
import GlobalStyle from './globalstyles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/mainpage/main';
import LoginPage from './pages/loginpage/login';
import MultiPage from './pages/multi/multi';
import Room from './pages/multi/room/room';
import ProtectedRoute from './pages/loginpage/protected';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          {/* / 페이지는 자유롭게 접근 가능 */}
          <Route path="/" element={<LandingPage />} />

          {/* 로그인 페이지 */}
          <Route path="/login" element={<LoginPage />} />

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
        </Routes>
      </Router>
    </>
  );
}

export default App;

import React from 'react';
import LandingPage from './pages/landing/landing';
import GlobalStyle from './globalstyles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/mainpage/main';
import LoginPage from './pages/loginpage/login';

function App() {
  return (
    <>
      <GlobalStyle /> {/* 글로벌 스타일은 최상단에서 적용 */}
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

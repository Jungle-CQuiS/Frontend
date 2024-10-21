import React from 'react';
import LandingPage from './pages/landing/landing';
import GlobalStyle from './globalstyles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/mainpage/main';
import LoginPage from './pages/loginpage/login';
import MultiPage from './pages/multi/multi';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/multi" element={<MultiPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

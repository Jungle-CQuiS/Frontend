import React, { useState } from 'react';
import { Route, Routes, useLocation, BrowserRouter as Router } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
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
// FIXME: Provider들 한번에 관리해서 호출하기.
import { StompProvider } from './contexts/StompContext';
import { GameStateProvider } from './contexts/GameStateContext/GameStateContext';
import { TeamStateProvider } from './contexts/TeamStateContext/TeamStateContext';
import { GameUserProvider } from './contexts/GameUserContext/GameUserContext';
import QuizGamePage from './pages/multi/game/quizGame';
import NavBar from './components/navbar/navbar';
import MyPage from './pages/mypage/mypage';
import AddProblemPage from './pages/mypage/addProblem/addProblem';
import { SingleModePage } from './pages/single/single';
import SingleModeQuiz from './pages/single/quiz/singleQuiz';

function App() {
  const [nickname, setNickname] = useState<string | null>(localStorage.getItem("nickname"));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("uuid"));
  const location = useLocation();

  const navBarPaths = ["/login", "/main", "/multi", "/signup", "/", "/mypage", "/mypage/addProblem", "/single"];
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
          path="/mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypage/addProblem"
          element={
            <ProtectedRoute>
              <AddProblemPage />
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

        {/* using web socket */}
        <Route element={
          <GameStateProvider>
            <TeamStateProvider>
              <GameUserProvider>
              <StompProvider>
                <Outlet />
              </StompProvider>
              </GameUserProvider>
            </TeamStateProvider>
          </GameStateProvider>
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
            path="/multi/defend/select"
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
          <Route
          path="/single"
          element={
            <ProtectedRoute>
              <SingleModePage />
            </ProtectedRoute>
          }
        />
          <Route
          path="/single/quiz"
          element={
            <ProtectedRoute>
              <SingleModeQuiz />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

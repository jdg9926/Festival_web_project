// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AdminDashboard from './page/AdminDashboard';
import MyPage from './page/MyPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ username: '', roles: [] });

  // 페이지 로드 시 JWT 토큰 체크
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));// JWT 디코딩
        const roles = payload.roles || [];
        setUser({ username: payload.sub, roles });
        setIsAuthenticated(true);
      } catch (err) {
        console.error('JWT parsing error:', err);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser({ username: '', roles: [] });
      }
    }
  }, []);
  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    const roles = userData.roles ? userData.roles.split(',') : [];
    setUser({ username: userData.username, roles });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser({ username: '', roles: [] });
  };

  return (
 <Router>
    <Routes>
      {/* 로그인 페이지 */}
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <LoginForm
              onLogin={handleLogin}
              onSwitchToRegister={() => <Navigate to="/register" replace />}
            />
          ) : user?.roles?.includes('ROLE_ADMIN') ? (
            <Navigate to="/admin" />
          ) : (
            <Navigate to="/mypage" />
          )
        }
      />

      {/* 회원가입 페이지 */}
      <Route
        path="/register"
        element={
          !isAuthenticated ? (
            <RegisterForm onRegister={() => <Navigate to="/login" replace />} />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* 관리자 페이지 */}
      <Route
        path="/admin"
        element={
          isAuthenticated && user?.roles?.includes('ROLE_ADMIN') ? (
            <AdminDashboard onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* 일반 사용자 페이지 */}
      <Route
        path="/mypage"
        element={
          isAuthenticated ? (
            <MyPage onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* 루트 경로 */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            user?.roles?.includes('ROLE_ADMIN') ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/mypage" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
      </Router>
  );
}

export default App;

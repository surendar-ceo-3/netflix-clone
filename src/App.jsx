import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BrowsePage from './pages/BrowsePage';
import ProfilePage from './pages/ProfilePage';
import AccountPage from './pages/AccountPage';
import TVShowsPage from './pages/TVShowsPage';
import MoviesPage from './pages/MoviesPage';
import NewPopularPage from './pages/NewPopularPage';
import MyListPage from './pages/MyListPage';
import NotFoundPage from './pages/NotFoundPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <BrowsePage />
        </ProtectedRoute>
      } />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/browse" element={
        <ProtectedRoute>
          <BrowsePage />
        </ProtectedRoute>
      } />
      <Route path="/tv-shows" element={
        <ProtectedRoute>
          <TVShowsPage />
        </ProtectedRoute>
      } />
      <Route path="/movies" element={
        <ProtectedRoute>
          <MoviesPage />
        </ProtectedRoute>
      } />
      <Route path="/new-popular" element={
        <ProtectedRoute>
          <NewPopularPage />
        </ProtectedRoute>
      } />
      <Route path="/my-list" element={
        <ProtectedRoute>
          <MyListPage />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />
      <Route path="/account" element={
        <ProtectedRoute>
          <AccountPage />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  useEffect(() => {
    document.title = "Netflix Clone | Built by Surendar";
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        {/* Floating Badge */}
        <div className="fixed bottom-4 left-4 z-50 bg-black/70 backdrop-blur text-white text-xs px-3 py-1 rounded-full border border-red-500/30">
          <span className="text-red-500">🔥</span> Surendar's Netflix
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './Pages/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Tours from './Pages/Tours/Tours'
import Contact from './Pages/Contact/Contact'
import Cairo from './Pages/Countries/Cairo/Cairo'
import Rome from './Pages/Countries/Roma/Roma'
import Paris from './Pages/Countries/Paris/Paris'
import Moscow from './Pages/Countries/Moscow/Moscow'
import Brazil from './Pages/Countries/Brazil/Brazil'
import Tokyo from './Pages/Countries/Tokyo'
import Sydney from './Pages/Countries/Sydney' 
import US from './Pages/Countries/US'
import TourDetail from './Pages/Tours/TourDetail'
import GuidesDirectory from './Pages/Tours/GuidesDirectory'
import TourDetailNYC from './Pages/Tours/TourDetailNYC';
import TourDetailGrandCanyon from './Pages/Tours/TourDetailGrandCanyon';
import TourDetailBarcelona from './Pages/Tours/TourDetailBarcelona';
import TourDetailCalifornia from './Pages/Tours/TourDetailCalifornia';
import TourDetailRussia from './Pages/Tours/TourDetailRussia';
import TourDetailSahara from './Pages/Tours/TourDetailSahara';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import Profile from './Pages/Profile/Profile';
import EditProfile from './Pages/Profile/EditProfile';
import './App.css'

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Admin Route component
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

// Main App Content
const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-grow ${!isHomePage ? 'pt-5 mt-5' : ''}`}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          
          {/* Admin route */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          
          {/* Protected routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/profile/edit" element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          } />
          <Route path="/Cairo" element={
            <ProtectedRoute>
              <Cairo />
            </ProtectedRoute>
          } />
          <Route path="/Rome" element={
            <ProtectedRoute>
              <Rome />
            </ProtectedRoute>
          } />
          <Route path="/Paris" element={
            <ProtectedRoute>
              <Paris />
            </ProtectedRoute>
          } />
          <Route path="/Brazil" element={
            <ProtectedRoute>
              <Brazil />
            </ProtectedRoute>
          } />
          <Route path="/Tours" element={
            <ProtectedRoute>
              <Tours />
            </ProtectedRoute>
          } />
          <Route path="/Tours/nyc" element={
            <ProtectedRoute>
              <TourDetailNYC />
            </ProtectedRoute>
          } />
          <Route path="/Tours/barcelona" element={
            <ProtectedRoute>
              <TourDetailBarcelona />
            </ProtectedRoute>
          } />
          <Route path="/Tours/california" element={
            <ProtectedRoute>
              <TourDetailCalifornia />
            </ProtectedRoute>
          } />
          <Route path="/Tours/grand-canyon" element={
            <ProtectedRoute>
              <TourDetailGrandCanyon />
            </ProtectedRoute>
          } />
          <Route path="/Tours/russia" element={
            <ProtectedRoute>
              <TourDetailRussia />
            </ProtectedRoute>
          } />
          <Route path="/Tours/sahara" element={
            <ProtectedRoute>
              <TourDetailSahara />
            </ProtectedRoute>
          } />
          <Route path="/US" element={
            <ProtectedRoute>
              <US />
            </ProtectedRoute>
          } />
          <Route path="/Sydney" element={
            <ProtectedRoute>
              <Sydney />
            </ProtectedRoute>
          } />
          <Route path="/Moscow" element={
            <ProtectedRoute>
              <Moscow />
            </ProtectedRoute>
          } />
          <Route path="/Tokyo" element={
            <ProtectedRoute>
              <Tokyo />
            </ProtectedRoute>
          } />
          <Route path="/Tours/:id" element={
            <ProtectedRoute>
              <TourDetail />
            </ProtectedRoute>
          } />
          <Route path="/Contact" element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          } />
          <Route path="/guides-directory" element={
            <ProtectedRoute>
              <GuidesDirectory />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

// Main App component
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
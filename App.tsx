import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import AuthChoice from './components/Auth/AuthChoice';
import LoginForm from './components/Auth/LoginForm';
import TeacherDashboard from './components/Teacher/Dashboard';
import StudentDashboard from './components/Student/Dashboard';
import ProfileForm from './components/Profile/ProfileForm';
import LoadingState from './components/Common/LoadingState';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingState message="Checking authentication..." />;
  }
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return <Layout>{children}</Layout>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingState message="Checking authentication..." />;
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={
          <PublicRoute>
            <AuthChoice />
          </PublicRoute>
        } 
      />
      <Route 
        path="/login/teacher" 
        element={
          <PublicRoute>
            <LoginForm role="TEACHER" />
          </PublicRoute>
        } 
      />
      <Route 
        path="/login/student" 
        element={
          <PublicRoute>
            <LoginForm role="STUDENT" />
          </PublicRoute>
        } 
      />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            {user?.role === 'TEACHER' ? <TeacherDashboard /> : <StudentDashboard />}
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfileForm />
          </ProtectedRoute>
        } 
      />
      
      {/* Teacher-only routes */}
      <Route 
        path="/timetables" 
        element={
          <ProtectedRoute>
            <div className="p-8">
              <h1 className="text-2xl font-bold">Timetable Management</h1>
              <p className="text-gray-600 mt-2">Coming soon...</p>
            </div>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/homeworks" 
        element={
          <ProtectedRoute>
            <div className="p-8">
              <h1 className="text-2xl font-bold">Homework Management</h1>
              <p className="text-gray-600 mt-2">Coming soon...</p>
            </div>
          </ProtectedRoute>
        } 
      />
      
      {/* Student-only routes */}
      <Route 
        path="/timetable" 
        element={
          <ProtectedRoute>
            <div className="p-8">
              <h1 className="text-2xl font-bold">My Timetable</h1>
              <p className="text-gray-600 mt-2">Coming soon...</p>
            </div>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/homework" 
        element={
          <ProtectedRoute>
            <div className="p-8">
              <h1 className="text-2xl font-bold">My Homework</h1>
              <p className="text-gray-600 mt-2">Coming soon...</p>
            </div>
          </ProtectedRoute>
        } 
      />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
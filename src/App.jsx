import React from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { testConnection } from './lib/supabase'
import LandingPage from './pages/LandingPage'
import AuthForm from './components/Auth/AuthForm'
import Dashboard from './pages/Dashboard'
import Reminders from './pages/Reminders'
import History from './pages/History'
import './App.css'

const ProtectedRoute = ({ children }) => {
  const { user } = React.useContext(React.createContext({}))
  return user ? children : <Navigate to="/auth" />
}

const PublicRoute = ({ children }) => {
  const { user } = React.useContext(React.createContext({}))
  return user ? <Navigate to="/dashboard" /> : children
}

const AppContent = () => {
  React.useEffect(() => {
    // Test Supabase connection on app load
    testConnection()
  }, [])

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Landing Page - Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            
            {/* Authentication - Public Route */}
            <Route 
              path="/auth" 
              element={
                <PublicRoute>
                  <AuthForm />
                </PublicRoute>
              } 
            />
            
            {/* App Routes - Protected */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reminders" 
              element={
                <ProtectedRoute>
                  <Reminders />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/history" 
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              } 
            />
            
            {/* Redirect unknown routes to landing */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

function App() {
  return <AppContent />
}

export default App
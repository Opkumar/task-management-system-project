/**
 * @file App.jsx
 * @description Main application component with routing configuration
 * @handles Routes for Login, Register, Dashboard, Kanban, and 404 pages
 * @uses Protected routes based on authentication status
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Page imports
import Dashboard from './pages/Dashboard'
import KanbanBoard from './pages/KanbanBoard'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

/**
 * Main App Component
 * Sets up routing with authentication protection
 * @component
 * @returns {JSX.Element} Application routes
 */
export default function App() {
  // Get authentication status from Redux store
  const { isAuthenticated } = useSelector(state => state.auth)

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes - accessible without authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes - redirect to login if not authenticated */}
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/kanban" element={isAuthenticated ? <KanbanBoard /> : <Navigate to="/login" />} />
        
        {/* Catch-all route for 404 pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

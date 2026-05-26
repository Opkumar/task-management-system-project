/**
 * @file Sidebar.jsx
 * @description Left sidebar navigation component with menu items and logout
 * @displays Navigation links and user logout functionality
 */

import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'

/**
 * Sidebar Component
 * Renders navigation menu with links to various pages
 * Includes logout button for authentication management
 * @component
 * @returns {JSX.Element} Sidebar navigation UI
 */
export default function Sidebar() {
  // Redux dispatch hook
  const dispatch = useDispatch()

  // Menu items configuration
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Projects', path: '/projects', icon: '📁' },
    { name: 'Kanban', path: '/kanban', icon: '📋' },
    { name: 'Analytics', path: '/analytics', icon: '📈' },
    { name: 'Sprint Boards', path: '/sprints', icon: '🏃' },
    { name: 'Teams', path: '/teams', icon: '👥' },
    { name: 'Messages', path: '/messages', icon: '💬' },
    { name: 'Settings', path: '/settings', icon: '⚙️' }
  ]

  /**
   * Handle logout
   * Dispatches logout action to clear authentication state
   */
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <aside className="w-72 bg-white/5 border-r border-white/10 backdrop-blur-xl min-h-screen p-6 flex flex-col">
      {/* Application branding and title */}
      <h1 className="text-3xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-10">
        TaskFlow Enterprise
      </h1>

      {/* Main navigation menu */}
      <nav className="flex-1 space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center gap-3 w-full text-left px-5 py-4 rounded-2xl bg-white/5 hover:bg-violet-500 transition-all duration-300"
          >
            {/* Menu item icon */}
            <span className="text-2xl">{item.icon}</span>
            {/* Menu item label */}
            <span className="text-white font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Logout button at bottom */}
      <button
        onClick={handleLogout}
        className="w-full px-5 py-4 rounded-2xl bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium transition-all duration-300"
      >
        🚪 Logout
      </button>
    </aside>
  )
}

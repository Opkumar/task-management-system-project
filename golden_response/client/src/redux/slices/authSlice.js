/**
 * @file authSlice.js
 * @description Redux slice for managing authentication state
 * @handles login, logout, error management
 */

import { createSlice } from '@reduxjs/toolkit'

/**
 * Initial authentication state
 * @type {Object}
 */
const initialState = {
  user: null,           // Currently logged-in user object
  token: null,          // Authentication token
  isAuthenticated: false, // Authentication status
  loading: false,       // Loading state for async operations
  error: null           // Error messages
}

/**
 * Authentication Redux Slice
 * Manages all authentication-related state and actions
 * @type {Slice}
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Login action - sets user, token and marks as authenticated
     * @param {Object} state - Current state
     * @param {Object} action - Action with user and token payload
     */
    login: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.error = null
    },
    
    /**
     * Logout action - clears all authentication data
     * @param {Object} state - Current state
     */
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
    },
    
    /**
     * Set error action - stores error messages
     * @param {Object} state - Current state
     * @param {Object} action - Action with error message payload
     */
    setError: (state, action) => {
      state.error = action.payload
    },
    
    /**
     * Clear error action - removes error messages
     * @param {Object} state - Current state
     */
    clearError: (state) => {
      state.error = null
    }
  }
})

// Export all actions
export const { login, logout, setError, clearError } = authSlice.actions

// Export the reducer as default
export default authSlice.reducer

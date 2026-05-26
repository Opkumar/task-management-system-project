/**
 * @file store.js
 * @description Redux store configuration using Redux Toolkit
 * @contains auth reducer and tasks reducer for global state management
 */

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import taskReducer from './slices/taskSlice'

/**
 * Redux Store Configuration
 * Combines all reducers and creates the global state store
 * @type {Store}
 */
export const store = configureStore({
  reducer: {
    // Authentication state reducer
    auth: authReducer,
    // Tasks state reducer
    tasks: taskReducer
  }
})

export default store

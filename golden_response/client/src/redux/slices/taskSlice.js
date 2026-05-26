/**
 * @file taskSlice.js
 * @description Redux slice for managing tasks state
 * @handles task list, filters, and task operations
 */

import { createSlice } from '@reduxjs/toolkit'

/**
 * Initial tasks state
 * @type {Object}
 */
const initialState = {
  tasks: [],          // Array of all tasks
  filter: 'all',      // Current filter (all, completed, pending)
  loading: false,     // Loading state for API calls
  error: null         // Error messages
}

/**
 * Tasks Redux Slice
 * Manages all task-related state and operations
 * @type {Slice}
 */
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    /**
     * Set tasks action - updates the tasks list
     * @param {Object} state - Current state
     * @param {Object} action - Action with tasks array payload
     */
    setTasks: (state, action) => {
      state.tasks = action.payload
      state.error = null
    },
    
    /**
     * Add task action - adds a new task to the list
     * @param {Object} state - Current state
     * @param {Object} action - Action with task object payload
     */
    addTask: (state, action) => {
      state.tasks.push(action.payload)
    },
    
    /**
     * Update task action - updates an existing task
     * @param {Object} state - Current state
     * @param {Object} action - Action with updated task payload
     */
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = action.payload
      }
    },
    
    /**
     * Delete task action - removes a task from the list
     * @param {Object} state - Current state
     * @param {Object} action - Action with task id payload
     */
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload)
    },
    
    /**
     * Set filter action - updates the task filter
     * @param {Object} state - Current state
     * @param {Object} action - Action with filter type payload
     */
    setFilter: (state, action) => {
      state.filter = action.payload
    }
  }
})

// Export all actions
export const { setTasks, addTask, updateTask, deleteTask, setFilter } = taskSlice.actions

// Export the reducer as default
export default taskSlice.reducer

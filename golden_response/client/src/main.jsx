/**
 * @file main.jsx
 * @description Application entry point - initializes React app with Redux store and rendering
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './redux/store'
import './index.css'

// Render the React application with Redux Provider for global state management
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Redux Provider makes the store available to all components */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

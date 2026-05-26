/**
 * @file server.js
 * @description Main server file - Express app setup with Socket.IO, MongoDB, and middleware
 * @handles API routing, WebSocket connections, and database connection
 */

// External dependencies
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import http from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Initialize Express app
const app = express()
// Create HTTP server for Socket.IO
const server = http.createServer(app)

/**
 * Socket.IO Server Configuration
 * Handles real-time bidirectional communication between client and server
 */
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || '*',
    credentials: true
  }
})

// ===== MIDDLEWARE CONFIGURATION =====

// Enable CORS for cross-origin requests
app.use(cors())
// Set security headers
app.use(helmet())
// Parse JSON request bodies (50mb limit)
app.use(express.json({ limit: '50mb' }))
// Parse URL-encoded request bodies
app.use(express.urlencoded({ limit: '50mb', extended: true }))

/**
 * Rate Limiting Middleware
 * Prevents abuse by limiting requests from individual IPs
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  max: 100,                   // Max 100 requests per window
  message: 'Too many requests from this IP, please try again later.'
})

// Apply rate limiter to all API routes
app.use('/api/', limiter)

// ===== DATABASE CONNECTION =====

/**
 * MongoDB Connection
 * Connects to MongoDB database using Mongoose
 */
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/taskflow')
  .then(() => console.log('✓ MongoDB connected'))
  .catch(err => console.error('✗ MongoDB connection error:', err))

// ===== SOCKET.IO EVENT HANDLERS =====

/**
 * Socket.IO Connection Handler
 * Handles client connections and event listeners
 */
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)

  // Task update event
  socket.on('task:update', (data) => {
    io.emit('task:updated', {
      ...data,
      timestamp: new Date()
    })
  })

  // Project join event - user joins a project room
  socket.on('project:join', (projectId) => {
    socket.join(projectId)
    socket.to(projectId).emit('user:online', socket.id)
  })

  // Task updated notification
  socket.on('taskUpdated', (data) => {
    io.to(data.projectId).emit('receiveTaskUpdate', {
      ...data,
      timestamp: new Date()
    })
  })

  // User disconnect event
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)
    socket.broadcast.emit('user:offline', socket.id)
  })
})

// ===== API ROUTES =====

// Import route handlers
import authRoutes from './routes/auth.js'
import taskRoutes from './routes/tasks.js'
import projectRoutes from './routes/projects.js'
import notificationRoutes from './routes/notifications.js'
import systemRoutes from './routes/system.js'

// Register route handlers
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api', systemRoutes)

// ===== ERROR HANDLING MIDDLEWARE =====

/**
 * Global Error Handler Middleware
 * Catches and formats errors for API responses
 */
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  })
})

/**
 * 404 Handler Middleware
 * Handles requests to non-existent routes
 */
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ===== SERVER STARTUP =====

// Get port from environment or use default
const PORT = process.env.PORT || 5000

// Start listening on specified port
server.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`)
})

// Export app, server, and io for external use
export { app, server, io }

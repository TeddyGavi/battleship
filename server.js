require('dotenv').config()
const express = require('express')
const path = require('path')
const http = require('http')
const PORT = process.env.PORT || 8080
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const env = process.env.NODE_ENV

app.use(express.static(path.join(__dirname, "public")))

server.listen(PORT, () => console.log(`Server listening on port ${PORT} and env is ${env}`))
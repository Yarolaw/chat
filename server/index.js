const app = require('express')()
const http = require('http').createServer(app)
require('dotenv').config()

const io = require("socket.io")(http, {
  cors: {
    origin: '*'
  }
});

const PORT = process.env.PORT || 4000

io.on('connection', socket => {
    console.log('a user connected');
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })
})

http.listen(PORT, function() {
  console.log('listening on port 4000')
})
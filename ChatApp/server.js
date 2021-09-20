// server side js

console.log('Restarted')

const io = require('socket.io')(3000, {
    cors: {
        origin: true
    }
})

const users = {}

// emits an event when connection happens
io.on('connection', socket => {
    console.log('New User')
    socket.emit('chat-message', 'Hello World')

    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })

    socket.on('send-chat-message', message => {
        // send it to all except sender
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id]} )
    })

    // delete user on disconnect
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})

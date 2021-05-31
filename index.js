const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, './client/public')
console.log(publicDirectoryPath)
app.use(express.static(publicDirectoryPath))


let users = []
let messages = []
let index = 0

io.on('connection', socket => {
    socket.emit('loggedIn', {
        users: users.map(s => s.username),
        messages: messages
    });

    socket.on('newUser', username => {
        console.log(`${username} has arrived at the party.`);
        socket.username = username;

        users.push(socket);

        io.emit('userOnline', socket.username);

        socket.broadcast.emit('message', "Someone has joined the server!")
    });

    socket.on('msg', msg => {
        let message = {
            index: index,
            username: socket.username,
            msg: msg
        }

        messages.push(message)

        io.emit('msg', message)

        index++;

    })

    // Disconnect
    socket.on('disconnect', () => {
        console.log(`${socket.username} has left the party.`);
        io.emit('userLeft', socket.username)
        users.splice(users.indexOf(socket),1)
    })
})

server.listen(3000, () => {
    console.log("Listening on port %s", 3000);
});


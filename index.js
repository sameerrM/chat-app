const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
    cors: {
        origin: ['http://localhost:8080']
    },
    pingInterval: 6000
});


let users = []
let messages = []
let index = 0

io.on('connection', socket => {
    socket.emit('loggedIn', {
        users: users.map(s => s.username),
        messages: messages
    });

    socket.on('newuser', (username) => {
        console.log(`${username} has arrived at the party.`);
        socket.username = username;
        socket.broadcast.emit('join', `${socket.username} has joined the server!`)
        users.push(socket);

        io.emit('userOnline', socket.username);
    });

    socket.on('msg', (msg) => {
        let message = {
            index: index,
            username: socket.username,
            msg: msg,
        }

        messages.push(message)

        io.emit('msg', message)

        index++;

    })

    // Disconnect
    socket.on('disconnect', () => {
        users.splice(users.indexOf(socket),1)
        io.emit('userLeft', socket.username)
        console.log(`${socket.username} has left the party.`);
    })
})

http.listen(3000, () => {
    console.log("Listening on port %s", 3000);
});



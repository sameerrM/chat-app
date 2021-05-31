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
        users: users,
        messages: messages
    });

    socket.on('newuser', (username, avatar) => {
        console.log(`${username} has arrived at the party.`);
        socket.broadcast.emit('join', `${username} has joined the server!`)
        socket.username = username
        socket.avatar = avatar
        let user = {username: username, avatar: avatar}
        users.push(user);

        io.emit('userOnline', user);
    });

    socket.on('msg', (msg, user) => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes()
        let message = {
            index: index,
            username: socket.username,
            avatar: socket.avatar,
            msg: msg,
            time: time
        }

        messages.push(message)

        io.emit('msg', message)

        index++;

    })

    // Disconnect
    socket.on('disconnect', () => {
        users = users.filter(item => item.username !== socket.username)
        io.emit('userLeft', users)
        console.log(`${socket.username} has left the party.`);
    })
})

http.listen(3000, () => {
    console.log("Listening on port %s", 3000);
});



<template>
  <div class="sidebar d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
    <div class="justify-content-center d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white">
      <span class="fs-5">Chat rooms</span>
    </div>
    <hr>
    <ul class="nav nav-pills flex-column">
      <li class="nav-item">
        <a href="#" class="nav-link active" aria-current="page">
          General
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          Random
        </a>
      </li>
    </ul>
    <div class="justify-content-center d-flex align-items-center mb-3 mt-5 mb-md-0 me-md-auto text-white">
      <span class="fs-5">Online people {{ users.length }} </span>
    </div>
    <hr>
    <ul class="nav nav-pills flex-column">
      <li class="nav-item" v-for="user in users" :key="user">
        <a href="#" class="text-white text-decoration-none">
          {{user}}
        </a>
      </li>
    </ul>
  </div>
  <ChatMessages @sendMessage="this.sendMessage" :messages="messages" :username="username" />
</template>

<script>
import io from 'socket.io-client';
// import Sidebar from "./components/ui-models/Sidebar";
import ChatMessages from "./components/ui-models/ChatMessages";

export default {
  name: 'App',
  components: {
    // Sidebar,
    ChatMessages
  },
  data () {
    return {
      username: "",
      socket: io("http://localhost:3000"),
      messages: [],
      users: []
    }
  },
  methods: {
    joinServer: function () {
      this.socket.on('loggedIn', data => {
        console.log(data)
        this.messages = data.messages;
        this.users = data.users;
        this.socket.emit('newUser', this.username);
      });
      this.listen();
    },
    listen: function () {
      this.socket.on('userOnline', user => {
        this.users.push(user);
      });
      this.socket.on('userLeft', user => {
        this.users.splice(this.users.indexOf(user), 1);
      });
      this.socket.on('msg', message => {
        this.messages.push(message);
      });
    },
    sendMessage: function (message) {
      this.socket.emit('msg', message);
    }
  },
  mounted: function () {
    this.username = prompt("What is your username?", `${Math.random().toString(36).substring(7)}`);
    if (!this.username) {
      this.username = "Anonymous";
    }
    this.joinServer();
  }
}
</script>

<style lang="scss">
body,html {
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
}

.sidebar{
  width: 230px;
  height: 100%;
}
</style>

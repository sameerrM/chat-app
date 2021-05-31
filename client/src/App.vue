<template>
  <Sidebar :users="users" :username="username" />
  <ChatMessages
      v-bind:messages="this.messages"
      v-on:sendMessage="this.sendMessage"
      :username="username"
  />
</template>

<script>
import io from 'socket.io-client';
import Sidebar from "./components/ui-models/Sidebar";
import ChatMessages from "./components/ui-models/ChatMessages";

export default {
  name: 'app',
  components: {
    Sidebar,
    ChatMessages
  },
  data() {
    return {
      username: "",
      messages: [],
      socket: io("http://localhost:3000"),
      users: [],
    }
  },
  methods: {
    joinServer() {
      this.socket.on('loggedIn', data => {
        console.log(data)
        this.messages = data.messages;
        this.users = data.users;
        this.socket.emit('newuser', this.username);
      });
      this.listen();
    },
    listen() {
      this.socket.on('userOnline', user => {
        this.users.push(user);
      });
      this.socket.on('userLeft', user => {
        this.users.splice(this.users.indexOf(user), 1);
      });
      this.socket.on('msg', (message) => {
        this.messages.push(message);
      });
      this.socket.on('join', message => {
        this.messages.push(message);
      });
    },
    sendMessage(message) {
      this.socket.emit('msg', message);
    },
  },
  mounted() {
    this.username = prompt('Login', `${Math.random().toString(36).substring(7)}`)
    if (!this.username) {
      this.username = "Anonymous";
    }
    this.joinServer()
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
</style>

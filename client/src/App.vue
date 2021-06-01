<template>
<div class="container content-wrapper">
  <div class="row row-broken">
    <Sidebar :users="users" :username="username" />
    <ChatMessages
        v-bind:messages="this.messages"
        v-on:sendMessage="this.sendMessage"
        :username="username"
        :avatar="avatar"
    />
  </div>
</div>
</template>

<script>
import io from 'socket.io-client';
import Sidebar from "./components/ui-models/Sidebar";
import ChatMessages from "./components/ui-models/ChatMessages";

import './app.css'

export default {
  name: 'app',
  components: {
    Sidebar,
    ChatMessages
  },
  data() {
    return {
      username: "",
      avatar: `https://bootdey.com/img/Content/avatar/avatar${Math.floor(Math.random() * 5) + 1}.png`,
      messages: [],
      socket: io("http://localhost:3000"),
      users: [],
    }
  },
  methods: {
    joinServer() {
      this.socket.on('loggedIn', data => {
        this.messages = data.messages;
        this.users = data.users;
        this.socket.emit('newuser', this.username, this.avatar);
      });
      this.listen();
    },
    listen() {
      this.socket.on('userOnline', user => {
        this.users.push(user);
      });
      this.socket.on('userLeft', user => {
        this.users = user
        console.log(this.users)
      });
      this.socket.on('msg', (message) => {
        this.messages.push(message);
      });
      this.socket.on('join', message => {
        this.messages.push(message);
      });
    },
    sendMessage(message, user) {
      this.socket.emit('msg', message, user);
    },
  },
  mounted() {
    this.username = prompt('Login', `${Math.random().toString(36).substring(7)}`)
    if (!this.username) {
      this.username = "Anonymous";
    }
    this.joinServer()
  },
}
</script>

<style></style>

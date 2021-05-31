<template>
  <div class="chat-content">
    <div class="chat-messages">
      <h4>Room: #general</h4>
      <h6>Username: {{username}}</h6>
      <ul class="chat-list">
        <li v-for="message in messages" :key="message.username">
          <h5>{{message.username}}</h5>
          <p :class="{'float-right': message.type === 0}">{{message.msg}}</p>
          <p v-if="!message.msg"><b>{{message}}</b></p>
        </li>
      </ul>
    </div>
    <div class="chat-input mt-auto">
      <form class="row g-3" @submit="sendMessage">
        <div class="col-11">
          <label for="message" class="visually-hidden">Message</label>
          <input type="text" class="form-control" id="message" placeholder="Message" v-model="msg">
        </div>
        <div class="col-1 text-center">
          <button type="submit" @click="sendMessage" class="btn btn-primary mb-3" :disabled="!msg">Send</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatMessages",
  props: ['messages', 'username', 'serverMessage'],
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    sendMessage: function () {
      if (!this.msg) {
        return;
      }

      this.$emit('sendMessage', this.msg);
      this.msg = "";
    }
  }
}
</script>

<style scoped lang="scss">
.chat-content{
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  .chat-messages{
    .chat-list{
      width: 100%;
      height: 100%;
      margin-top: 50px;
      list-style: none;
      padding: 0;
      .float-right{
        float: right;
      }
    }
  }
}
</style>
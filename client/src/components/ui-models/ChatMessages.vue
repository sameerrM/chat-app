<template>
  <div class="col-sm-9 col-xs-12 chat" style="overflow: hidden; outline: none;">
    <div class="col-inside-lg decor-default">
      <div class="chat-body" ref="container">
        <h6>#general</h6>
        <div class="answer"
             v-for="message in messages"
             :key="message.username"
             :class="{' right': message.username === username, ' left': message.username !== username}">
          <div class="avatar" v-if="message.msg">
            <img :src="message.avatar" alt="User name">
            <div class="status online"></div>
          </div>
          <div class="name"><b>{{message.username}}</b></div>
          <div class="text" v-if="message.msg">
            {{message.msg}}
          </div>
          <div class="join-message" v-if="!message.msg">
            {{message}}
          </div>
          <div class="time">{{ message.time }}</div>
        </div>
      </div>
      <form class="answer-add" @submit.prevent="sendMessage">
        <input placeholder="Write a message" v-model="msg">
        <button type="button" @click.prevent="sendMessage" :disabled="!msg" class="btn btn-primary">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatMessages",
  props: ['messages', 'username', "avatar", "scrollDiv"],
  data() {
    return {
      msg: '',
      user: {username: this.username, avatar: this.avatar}
    }
  },
  methods: {
    sendMessage: function () {
      if (!this.msg) {
        return;
      }

      this.$emit('sendMessage', this.msg, this.user);
      this.msg = "";
      this.scrollToEnd()
    },
    scrollToEnd() {
      let content = this.$refs.container;
      content.scrollTop = content.scrollHeight;
    }
  },
  updated () {
    this.scrollToEnd()
  },

  mounted () {
    this.scrollToEnd()
  }
}
</script>

<style scoped>

</style>
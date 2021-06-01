<template>
  <div class="col-sm-3 col-xs-12">
    <div class="col-inside-lg decor-default chat" style="overflow: hidden; outline: none;" tabindex="5000">
      <div class="chat-users">
        <h6>Online ({{ users.length }})</h6>
        <div class="user" v-for="user in users" :key="user">
          <div class="avatar">
            <img :src="user.avatar" alt="User name">
            <div class="status online"></div>
          </div>
          <div class="name">{{user.username}}</div>
          <div class="mood">User</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar.vue",
  props: ['users', 'username']
}
</script>

<style scoped>
</style>
<template>
  <div class="sidebar d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
    <div class="justify-content-center d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white">
      <span class="fs-5">User name:</span>
    </div>
    <hr>
    <ul class="nav nav-pills flex-column">
      <li class="nav-item">
        {{ username }}
      </li>
    </ul>
    <div class="justify-content-center d-flex align-items-center mb-3 mt-5 mb-md-0 me-md-auto text-white">
      <span class="fs-5">Online people ({{ users.length }}) </span>
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
</template>

<script>
export default {
  name: "Sidebar.vue",
  props: ['users', 'username']
}
</script>

<style scoped lang="scss">
.sidebar{
  width: 230px;
  height: 100%;
}
</style>
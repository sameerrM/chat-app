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
      <span class="fs-5">Online people</span>
    </div>
    <hr>
    <ul class="nav nav-pills flex-column">
      <li class="nav-item">
        <a href="#" class="text-white text-decoration-none">
          Alex
        </a>
      </li>
      <li>
        <a href="#" class="text-white text-decoration-none">
          Rudolf
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Sidebar.vue"
}
</script>

<style scoped lang="scss">
.sidebar{
  width: 230px;
  height: 100%;
}
</style>
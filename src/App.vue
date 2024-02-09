<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
a {
  text-decoration: none;
}
li {
  list-style: none;
}
* {
  margin: 0px;
  padding: 0px;
}
html,body{
  height: 100%;
  width: 100%;
}
#app{
  width: 100%;
  height: 100%;
}
</style>

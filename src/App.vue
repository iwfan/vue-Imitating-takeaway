<template>
  <div id="app">
    <div class="header">
      <header1></header1>
    </div>
    <div class="tab">
      this is tab
    </div>
    <div class="content">
      this is content
    </div>
  </div>
</template>

<script>
import header from './components/header/header'
export default {
  name: 'App',
  components: {
    header1: header
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

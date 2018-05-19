<template lang="pug">
  header {{ title }}
</template>

<script>
export default {
  name: 'v-header',
  data () {
    return {
      title: 'this is header'
    }
  }
}
</script>

<style lang="stylus" scoped>
  header
    width 100%
    height 134px
    background-color rgba(7, 17, 27, .5)
    // filter blur(10px)
</style>

<template lang="pug">
  .goods
    .menu-wrapper
    .foods-wrapper
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
export default Vue.extend({
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: []
    }
  },
  created () {
    axios('/api/goods').then(({data}) => {
      this.goods = data.data
    })
  }
})
</script>

<style lang="stylus" scoped>
  .goods
    display flex
    position absolute
    top 174px

</style>

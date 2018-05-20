<template lang="pug">
  #takeaway
    v-header(:seller="seller")
    nav.tab.border-1px
      .tab-item
        router-link(to="goods") 商品
      .tab-item
        router-link(to="ratings") 评论
      .tab-item
        router-link(to="seller") 商家
    .content
      router-view
</template>

<script>
import axios from 'axios'
import router from '@/router'
import header from '@/components/header/header'
export default {
  name: 'App',
  router,
  data () {
    return {
      seller: {}
    }
  },
  components: {
    'v-header': header
  },
  created () {
    axios('/api/seller').then(({ data }) => {
      this.seller = data.data
    })
  },
  mounted () {
    // this.$router.go('/goods')
  }
}
</script>

<style lang="stylus">
  a
    text-decoration none
</style>

<style lang="stylus" scoped>
@import 'common/stylus/mixin.styl'
#takeaway
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .tab
    height 40px
    display flex
    // border-bottom 1px solid rgba(7, 17, 27, .1)
    border-1px(rgba(7, 17, 27, .1))
    .tab-item
      flex  1
      text-align center
      line-height 40px
      & > a
        display inline-block
        width 100%
        height 100%
        font-size 14px
        outline none
        color rgb(77, 85, 93)
        &.router-link-active
          color rgb(240, 20, 20)
</style>

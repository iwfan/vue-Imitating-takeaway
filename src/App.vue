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
<script lang="ts">
// export default Vue.extend({
  
// })

import Vue from 'vue'
import Component from 'vue-class-component'

// @Component 修饰符注明了此类为一个 Vue 组件
@Component({
  // 所有的组件选项都可以放在这里
  template: '<button @click="onClick">Click!</button>'
})
export default class App extends Vue {
  // 初始数据可以直接声明为实例的属性
  message: string = 'Hello!'

  // 组件方法也可以直接声明为实例的方法
  onClick (): void {
    window.alert(this.message)
  }
}
</script>

// <script>
// import axios from 'axios'
// import router from '@/router'
// import header from '@/components/header/header'
// export default {
//   name: 'App',
//   router,
//   data () {
//     return {
//       seller: {}
//     }
//   },
//   components: {
//     'v-header': header
//   },
//   created () {
//     axios('/api/seller').then(({ data }) => {
//       this.seller = data.data
//     })
//   },
//   mounted () {
//     // this.$router.go('/goods')
//   }
// }
// </script>

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

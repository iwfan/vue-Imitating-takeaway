<template lang="pug">
  header
    section.content-wrapper
      .avatar
        img(:src="seller.avatar"
            width="64"
            height="64")
      .content
        .title
          span.brand
          span.name {{ seller.name }}
        .description {{ seller.description }} / {{ seller.deliveryTime }}分钟送达
        div(v-if="seller.supports && seller.supports.length"
            class="support")
          span.icon(:class="classMap[seller.supports[0].type]")
          span.text {{ seller.supports[0].description }}
      .support-count(v-if="seller.supports && seller.supports.length"
                    @click="detailShow = true")
        span.count {{ seller.supports.length }}个
        i.icon-keyboard_arrow_right
    section.bulletin-wrapper(@click="detailShow = true")
      span.bulletin-title
      span.bulletin-text {{ seller.bulletin }}
      i.icon-keyboard_arrow_right
    section.background
      img(:src="seller.avatar" width="100%" height="100%")
    section.detail(v-show="detailShow" transition="fade" @click="detailShow = false")
      div test
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'v-header',
  props: {
    seller: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      classMap: {'0': 'decrease', '1': 'discount', '2': 'special', '3': 'invoice', '4': 'guarantee'},
      detailShow: false
    }
  }
})
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  header
    position relative
    color  #fff
    font-family "PingFang SC","Microsoft YaHei",sans-serif
    background-color rgba(7, 17, 27, .5)
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      .avatar
        line-height 0
        display inline-block
        vertical-align top
        img
          width 64px
          height 64px
          border-radius 4px
      .content
        display inline-block
        box-sizing border-box
        padding 2px 16px
        .title
          margin 0 0 8px 0
          .name
            font-size 16px
            line-height 18px
            font-weight bold
            margin-left 6px
          .brand
            display inline-block
            width 30px
            height 18px
            bg-img('brand')
            background-size 30px 18px
            background-repeat no-repeat
            vertical-align top
        .description
          font-size 12px
          font-weight 400
          line-height 12px
          margin-bottom 10px
        .support
          font-size 10px
          line-height 12px
          .icon
            display inline-block
            width 12px
            height 12px
            margin-right 4px
            vertical-align top
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-img('decrease_1')
            &.discount
              bg-img('discount_1')
            &.special
              bg-img('special_1')
            &.invoice
              bg-img('invoice_1')
            &.guarantee
              bg-img('guarantee_1')
          // .text
      .support-count
        position absolute
        right 12px
        bottom 15px
        padding 7px 8px
        // height 10px
        background-color rgba(0, 0, 0, .2)
        border-radius 15px
        cursor pointer
        .count
          font-size 10px
          font-weight 400
          line-height 12px
        .icon-keyboard_arrow_right
          vertical-align top
          margin-left 2px
    .bulletin-wrapper
      position relative
      height 28px
      padding 0 22px 0 12px
      background rgba(7, 17, 27, .2)
      font-size 10px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      line-height 28px
      .bulletin-title
        display inline-block
        vertical-align middle
        // margin-top 8px
        width 22px
        height 12px
        bg-img('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .bulletin-text
        font-weight 400
        margin 0 4px
      .icon-keyboard_arrow_right
        position absolute
        right 12px
        top 8px
    .background
      position absolute
      top 0
      left 0
      bottom 0
      right 0
      z-index -1
      filter blur(10px)
    .detail
      position fixed
      top 0
      right 0
      bottom 0
      left 0
      transition all .5s
      backdrop-filter: blur(10px)
      &.fade-transition
        opacity 1
        background rgba(7, 17, 27, .8)
      &.fade-enter, &.fade-leave
        opacity 0
        background rgba(7, 17, 27, 0)
</style>

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
    section.bulletin-wrapper
</template>

<script>
export default {
  name: 'v-header',
  props: {
    seller: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      classMap: {'0': 'decrease', '1': 'discount', '2': 'special', '3': 'invoice', '4': 'guarantee'}
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  header
    color  #fff
    font-family "PingFang SC","Microsoft YaHei",sans-serif
    background-color rgba(7, 17, 27, .5)
    .content-wrapper
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
          font-weight 200
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
</style>

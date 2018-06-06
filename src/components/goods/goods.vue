<template lang="pug">
  .goods
    .menu-wrapper(ref="menu-wrapper")
      ul
        li.menu-item(v-for="(item, index) of goods"
           :key="index")
          span.text.border-1px
            span.icon(v-if="item.type > 0" :class="classMap[item.type]")
            | {{ item.name }}
    .foods-wrapper(ref="food-wrapper")
      ul
        li.food-list(v-for="(item, index) of goods" :key="index")
          h1.title {{ item.name }}
          ul
            li.food-item.border-1px(v-for="(food, index) of item.foods" :key="index")
              .icon
                img(:src="food.icon" width="57" height="57")
              .content
                h2.name {{ food.name }}
                p.desc {{ food.description }}
                .extra
                  span.count 月售{{food.sellCount}}份
                  span 好评率{{food.rating}}%
                .price
                  span.now ￥{{ food.price }}
                  span.old(v-if="food.oldPrice") ￥{{ food.oldPrice }}
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import BScroll from 'better-scroll'
export default Vue.extend({
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      classMap: {'0': 'decrease', '1': 'discount', '2': 'special', '3': 'invoice', '4': 'guarantee'},
      goods: [],
      menuScroll: {},
      foodScroll: {}
    }
  },
  created () {
    axios('/api/goods').then(({data}) => {
      this.goods = data.data
      console.log(this.goods)
    })
  },
  mounted () {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    _initScroll () {
      console.log(this.$refs['food-wrapper'])
      this.menuScroll = new BScroll(this.$refs['menu-wrapper'] as Element, {})
      this.foodScroll = new BScroll(this.$refs['food-wrapper'] as Element, {})
      // this.menuScroll = new BScroll(this.$refs.foodWrapper, {})
    }
  }
})
</script>

<style lang="stylus" scoped>
  @import "~@/common/stylus/mixin"
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex: 0 0 80px
      width 80px
      background-color #f3f5f7
      ul
        padding 0 12px
      .menu-item
        display table
        width 56px
        height 54px
        line-height 14px
        text-align center
        .icon
          display inline-block
          width 12px
          height 12px
          margin-right 2px
          vertical-align top
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-img('decrease_3')
          &.discount
            bg-img('discount_3')
          &.special
            bg-img('special_3')
          &.invoice
            bg-img('invoice_3')
          &.guarantee
            bg-img('guarantee_3')
        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7, 17, 27, .1))
          font-size 12px
    .foods-wrapper
      flex 1
      .title
        height 26px
        background-color #f3f5f7
        border-left 2px solid #d9dde1
        font-size 12px
        line-height 26px
        color rgb(147, 153, 159)
        padding-left 14px
        margin 0
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, .1))
        &:last-child
          padding 0
          &::after
            display none
        .icon
          flex 0 0 57px
          width 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            font-size 14px
            line-height 14px
            color rgb(7, 17, 27)
          .desc, .extra
            line-height 10px
            font-size 10px
            color rgb(143,157,159)
          .desc
            margin-bottom 8px
            line-height 12px
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
            .old
              text-decoration line-through
              font-size 10px
</style>

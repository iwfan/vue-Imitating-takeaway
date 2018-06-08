<template lang="pug">
  .shopcart
    .content
      .content-left
        .logo-wrapper
          .logo(:class="{'highlight': totalCount > 0}")
            i.icon-shopping_cart
          .number(v-show="totalCount > 0") {{ totalCount }}
        .price(:class="{'highlight': totalCount > 0}") ￥{{totalPrice}}
        .desc 另需配送费{{ deliveryPrice }}元
      .content-right
        .pay(:class="{'active': totalPrice >= minPrice}") {{ payDesc }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  // eslint-disable-next-line
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default ():Array<any> {
        return []
      }
    }
  },
  computed: {
    // eslint-disable-next-line
    totalPrice (): number {
      return (this.selectFoods as Array<any>).reduce((p, c, i, a): number => {
        return p + (c.price * c.count)
      }, 0)
    },
    totalCount ():number {
      return (this.selectFoods as Array<any>).reduce((p, c, i, a): number => {
        return p + c.count
      }, 0)
    },
    payDesc (): string {
      if (this.totalCount === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff:number = (this.minPrice as number) - (this.totalPrice as number)
        return `还差${diff}元起送`
      } else {
        return `去结算`
      }
    }
  }
})
</script>

<style lang="stylus" scoped>
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background-color #141d27
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          border-radius 50%
          box-sizing border-box
          vertical-align top
          background-color #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            background-color #2b343c
            text-align center
            &.highlight
              background-color rgb(0, 160, 220)
              .icon-shopping_cart
                color #fff
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
          .number
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            text-align center
            line-height 16px
            border-radius 16px
            font-size 10px
            font-weight 700
            color #fff
            background-color rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, .4)
        .price
          display inline-block
          vertical-align top
          line-height 24px
          margin-top 12px
          box-sizing border-box
          padding-right 12px
          border-right 1px solid rgba(255, 255, 255, .1)
          font-size 16px
          font-weight 700
          color rgba(255, 255, 255, .4)
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          color rgba(255, 255, 255, .4)
          font-size 10px
          font-weight 700
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          color rgba(255, 255, 255, .4)
          background-color #2b333b
          &.active
            color #fff
            background-color #00b43c
</style>

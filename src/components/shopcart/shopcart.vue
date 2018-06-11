<template lang="pug">
  .shopcart(@click="toggleList")
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
    .ball-container
      transition(
      name="drop"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter")
          .ball(v-for="(ball, index) in balls" v-show="ball.show" :key='index')
            .inner.inner-hook
    transition(name="fold")
      .shopcar-list(v-show="listShow")
        header.header
          h1.title 购物车
          span.empty 清空
        section.content
          ul
            li.food(v-for="(food, index) of selectFoods" :key="index")
              span.name {{ food.name }}
              span.price  {{ food.price * food.count }}
              .control-wrapper
                cartcontrol(:food="food")
</template>

<script>
import Vue from 'vue'
import eventHub from '@/common/js/eventHub'
export default Vue.extend({
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
      default () {
        return []
      }
    }
  },
  data () {
    return {
      balls: Array.apply(null, {length: 1}).map(() => ({ show: false })),
      dropBalls: [],
      listShow: false
    }
  },
  created () {
    eventHub.$on('increse_count', el => {
      this.$nextTick(() => {
        this.drop(el)
      })
    })
  },
  computed: {
    totalPrice () {
      return (this.selectFoods).reduce((p, c, i, a) => {
        return p + (c.price * c.count)
      }, 0)
    },
    totalCount () {
      return (this.selectFoods).reduce((p, c, i, a) => {
        return p + c.count
      }, 0)
    },
    payDesc () {
      if (this.totalCount === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = (this.minPrice) - (this.totalPrice)
        return `还差${diff}元起送`
      } else {
        return `去结算`
      }
    }
  },
  methods: {
    drop (el) {
      // debugger
      for (const ball of this.balls) {
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeEnter (el) {
      // debugger
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    enter (el) {
      // let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
      })
    },
    afterEnter (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    toggleList () {
      if (this.totalCount) {
        this.listShow = !this.listShow
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
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        &.drop-enter-active
          transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner
            width: 16px
            height: 16px
            border-radius: 50%
            background: rgb(0, 160, 220)
            transition: all 0.4s linear
    .shopcar-list
      position: absolute
      top: 0
      left: 0
      width 100%
      background-color: red
      z-index -1
</style>

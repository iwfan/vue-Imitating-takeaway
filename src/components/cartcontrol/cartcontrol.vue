<template lang="pug">
  .cart_control
    transition(name="fade")
      .decrese(v-show="food.count>0" @click="decrese($event)")
        i.icon-remove_circle_outline
    .count(v-show="food.count>0")
      span.text {{ food.count }}
    .increse(@click="increse")
      i.icon-add_circle
</template>

<script lang="ts">
import Vue from 'vue'
import eventHub from '@/common/js/eventHub'
export default Vue.extend({
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    increse ({target}: Event): void {
      this.food.count++
      eventHub.$emit('increse_count', target)
    },
    decrese ():void {
      this.food.count--
    }
  }
})
</script>

<style lang="stylus" scoped>
  .cart_control
    .decrese, .increse, .count
      display inline-block
      vertical-align top
    .decrese, .increse
      padding 6px
      box-sizing border-box
      font-size 24px
      line-height 24px
      color rgb(0, 160, 200)
    .decrese
      &.fade-enter-active, &.fade-leave-active
        transition: all .4s linear;
        transform translate3d(0, 0, 0)
        i
          display inline-block
          line-height: 24px
          font-size: 24px
          color: rgb(0, 160, 220)
          transition: all 0.4s linear
          transform: rotate(0)
      &.fade-enter, &.fade-leave-to
        opacity: 0;
        transform translate3d(36px, 0, 0)
        i
          transform rotate(180deg)
    .count
      width 12px
      font-size 12px
      line-height 24px
      text-align center
      margin-top 6px
      color rgb(147, 153, 159)
</style>

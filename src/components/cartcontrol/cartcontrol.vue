<template lang="pug">
  .cart_control
    .decrese(v-show="food.count>0" @click="decrese")
      i.icon-remove_circle_outline
    span.count(v-show="food.count>0") {{ food.count }}
    .increse(@click="increse")
      i.icon-add_circle
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    increse (): void {
      this.food.count++
    },
    decrese ():void {
      this.food.count--
    }
  }
})
</script>

<style lang="stylus" scoped>
  .cart_control
    height 24px
    i, span
      display inline-block
      vertical-align top
    i
      color rgb(0, 160, 220)
      padding 6px
      font-size 24px
      line-height 24px
    span
      font-size 10px
      color rgb(147, 153, 159)
      line-height 24px
      width 12px
      padding-top 6px
      text-align center
</style>

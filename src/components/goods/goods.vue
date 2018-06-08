<template lang="pug">
  .goods
    .menu-wrapper(ref="menu-wrapper")
      ul
        li.menu-item(v-for="(item, index) of goods"
           :key="index"
           :class="{current: currentIndex === index}"
           @click="selectMenu(index, $event)")
          span.text.border-1px
            span.icon(v-if="item.type > 0" :class="classMap[item.type]")
            | {{ item.name }}
    .foods-wrapper(ref="food-wrapper")
      ul
        li.food-list.food-list-hook(v-for="(item, index) of goods" :key="index")
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
              .control-wrapper
                cartcontrol(:food="food")
    shopcart(:delivery-price="seller.deliveryPrice"
             :min-price="seller.minPrice"
             :selectFoods="selectFoods")
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import BScroll from 'better-scroll'
import _ from 'lodash'
import shopcart from '@/components/shopcart/shopcart.vue'
import cartcontrol from '@/components/cartcontrol/cartcontrol.vue'
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
      foodScroll: {},
      listHeight: [],
      scrollY: 0
    }
  },
  computed: {
    currentIndex (): number {
      for (let i = 0; i < this.listHeight.length; i++) {
        let h1 = this.listHeight[i]
        let h2 = this.listHeight[i + 1]
        if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
          return i
        }
      }
      return 0
    },
    selectFoods (): Array<any> {
      return _.flatten((this.goods as Array<any>).map(good => {
        return good.foods.filter((food: any): any => {
          return food.count > 0
        })
      }))
    }
  },
  created () {
    axios('/api/goods').then(({data}) => {
      // 初始化一个count属性
      ;(data.data as Array<any>).map(good => {
        return good.foods.map((food: any): any => {
          food.count = 0
        })
      })
      this.goods = data.data
      console.log(this.goods, this.seller)
      this.$nextTick(() => {
        this._initScroll()
        this._calculateHeight()
      })
    })
  },
  mounted () { },
  methods: {
    _initScroll ():void {
      this.menuScroll = new BScroll(this.$refs['menu-wrapper'] as Element, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs['food-wrapper'] as Element, {
        probeType: 3,
        click: true
      })
      ;(this.foodScroll as BScroll).on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y as number))
      })
    },
    _calculateHeight ():void {
      let foodWrapper = this.$refs['food-wrapper']
      let foodList = (foodWrapper as Element).querySelectorAll('.food-list-hook')
      let height = 0
      this.listHeight.push(height as never)
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight
        this.listHeight.push(height as never)
      }
    },
    selectMenu (index: number, event: Event): void {
      let foodWrapper = this.$refs['food-wrapper']
      let foodList = (foodWrapper as Element).querySelectorAll('.food-list-hook')
      let el = foodList[index]
      ;(this.foodScroll as BScroll).scrollToElement(el as HTMLElement, 300)
    }
  },
  components: {
    shopcart,
    cartcontrol
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
      .menu-item
        display table
        width 56px
        height 54px
        padding 0 12px
        line-height 14px
        text-align center
        &.current
          position relative
          z-index 12
          margin-top -1px
          background-color #fff
          font-weight 700
          .text
            &::after
              display none
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
        .control-wrapper
          position absolute
          right 0
          bottom 12px
</style>

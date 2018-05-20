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
        .description {{ seller.description}}/{{ seller.deliveryTime}}分钟送达
        div(v-if="seller.supports && seller.supports.length"
            class="support")
          span.icon
          span.text {{ seller.supports[0].description}}
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
      // title: 'this is header'
    }
  }
}
</script>

<style lang="stylus" scoped>
  header
    color  #fff
    background-color #000
    .content-wrapper
      padding 24px 12px 18px 24px
      // line-height 0
      .avatar
        display inline-block
        line-height 0
        img
          width 64px
          height 64px
          border-radius 4px
      .content
        display inline-block
        // margin 2px 0 2px 16px
        // margin 4px 0
        // color rgb(255, 255, 255)
</style>

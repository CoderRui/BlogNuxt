<template>
  <div class="container" :class="bodyState ? 'bodyState' : ''">
    <!-- 头部信息 -->
    <div class="header">
      <mobile-head v-if="mobile"></mobile-head>
      <pc-head v-else></pc-head>
    </div>
    
    <!-- 内容主体 -->
    <div class="nuxt-Control" :style="{ width: mobile ? '100%' : '1024px' }" @click="view" >
      <transition name="list" mode="out-in">
        <nuxt></nuxt>
      </transition>
    </div>

    <!-- 回到顶部 -->
    <div class="scrollB el-icon-arrow-up" v-scroll @click="scroll"></div>

    <!-- 图片预览 -->
    <dialog-view :visible.sync="dialogView" :imgSrc='imgSrc' ></dialog-view>

    <!--footer -->
    <div class="footer">京ICP备18010810号-1</div>

  </div>
</template>
<script>
import pcHead from '@/components/pc/head.vue'

import mobileHead from '@/components/mobile/head.vue'

import dialogView from '@/components/common/dialog.vue'

export default {
  name: 'container',
  components: {
    pcHead,
    mobileHead,
    dialogView
  },
  data () {
    return {
      dialogView: false,
      imgSrc: '',
      scrollY: ''
    }
  },
  computed: {
    bodyState () {
      return this.$store.state.bodyState
    },
    mobile () {
      return this.$store.state.isMobile
    }
  },
  methods: {
    scroll () {
      var timer = null
      this.distance = window.scrollY
      timer = setInterval(() => {
        this.distance -= 20
        window.scrollTo(0, this.distance)
        if (this.distance < 0) {
          clearInterval(timer)
        }
      }, 20)
    },
    view (e) {
      this.scrollY = window.scrollY
      if (e.target.nodeName === 'IMG') {
        if (!e.target.getAttribute('data-src')) return
        this.dialogView = true
        this.imgSrc = e.target.getAttribute('data-src')
      }
    }
  },
  watch: {
    dialogView: {
      handler: async function () {
        await this.$store.dispatch('bodyState', this.dialogView)
        if (!this.dialogView) {
          console.log(this.scrollY)
          window.scrollTo(0, this.scrollY)
          this.scrollY = 0
        }
      }
      // immediate: true
    }
  }
}
</script>

<style lang='scss'>
.container {
  width: 100%;
  &.bodyState {
    height: 100vh;
    overflow: hidden;
  }
  .nuxt-Control {
    margin: 0 auto;
    min-height: 99vh;
  }
  .scrollB {
    position: fixed;
    bottom: 70px;
    right: 35px;
    width: 45px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    font-size: 20px;
    color: #fff;
    border-radius: 50%;
    box-shadow: 3px 3px 10px rgba(0,0,0,0.3);
    background-color: #1C6E8C;
    transform: translateX(300px);
  }
  .show {
    transform: translateX(0);
    -webkit-transition: all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transition:  all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .footer {
    width: 100%;
    line-height: 2;
    text-align: center;
    color: #fff;
    background: $head;
  }
}
</style>

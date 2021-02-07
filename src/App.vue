<template>
  <div id="app">
    <tabs v-if="defer(2)"></tabs>
    <content v-if="defer(1)"></content>
  </div>
</template>

<script>
import init from '@/use/init'
import tabs from '@/components/tabs/index'
import content from '@/components/main/index'
import { createMessage } from '@/components/public/lp-message/lp-message.js'
import { createDialog } from '@/components/public/lp-dialog/lp-dialog.js'
import { provide } from 'vue'
import progressive from '@/use/progressive.js'
export default {
  name: 'App',
  components: {
    tabs,
    content,
  },
  setup() {

    // 全局注册组件
    provide('message', createMessage)
    provide('confirm', createDialog)

    // 设置网页导航的信息
    init()

    // 渐进式渲染
    let defer = progressive()

    return { defer }
  }
  
}
</script>

<style>
@import './assets/css/reset/reset.css';
@import './assets/css/fontawesome/css/all.min.css';
@import './assets/css/animate.css/animate.css';
</style>

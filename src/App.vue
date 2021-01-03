<template>
  <div id="app">
    <tabs></tabs>
    <content></content>
  </div>
</template>

<script>
import init from '@/use/init'
import tabs from '@/components/tabs/index'
import content from '@/components/main/index'
import { createMessage } from '@/components/public/lp-message/lp-message.js'
import { createDialog } from '@/components/public/lp-dialog/lp-dialog.js'
import { provide } from 'vue'
export default {
  name: 'App',
  components: {
    tabs,
    content
  },
  setup() {

    // 全局注册组件
    provide('message', createMessage)
    provide('confirm', createDialog)

    // 设置网页导航的信息
    init()

    return {}
  }
  
}
</script>

<style>
@import './assets/css/reset/reset.css';
@import './assets/css/fontawesome/css/all.min.css';
@import './assets/css/animate.css/animate.css';
</style>

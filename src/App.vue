<template>
  <div id="app">
    <tabs></tabs>
    <content></content>
  </div>
</template>

<script>

import {useStore} from 'vuex'
import {writeToVuex} from '@/utils/utils'
import tabs from '@/components/tabs/index/index'
import content from '@/components/main/index/index'
import {createMessage} from '@/components/public/lp-message/lp-message.js'
import {createDialog} from '@/components/public/lp-dialog/lp-dialog.js'
import {provide} from 'vue'
export default {
  name: 'App',
  components: {
    tabs,
    content
  },
  setup() {
    // 设置网页导航的信息
    (function setInfos() {
        const store = useStore()
        if(window.localStorage.isSet === 'true') {
            writeToVuex(store, JSON.parse(window.localStorage.navInfos))
        } 
        // 自动设置默认信息
        else {
            let obj = {
            navName: "Nav Url",
            catalogue : [
                {id:'1' , name: "常用网站", icon: "align-justify", URLS: [
                  {id:'1.1' , url: 'http://www.baidu.com', icon: 'http://www.baidu.com/favicon.ico', name: '百度'},
                  {id:'1.3', url: 'https://juejin.im/', icon: 'https://b-gold-cdn.xitu.io/favicons/v2/favicon.ico', name: '掘金'},
                  {id:'1.4', url: 'https://gitee.com/', icon: 'https://gitee.com/assets/favicon.ico', name: '码云'},
                ]},
                {id:'2' , name: "实用工具", icon: "bookmark", URLS: []},
                {id:'3' , name: "娱乐影视", icon: "blog", URLS: []}
            ]
            }
            window.localStorage.navInfos = JSON.stringify(obj)
            window.localStorage.isSet = 'true'
            writeToVuex(store, obj)
        }
    })();   
    
    // 全局注册组件
    provide('message', createMessage)
    provide('confirm', createDialog)

    return {}
  }
  
}
</script>

<style>
@import './assets/css/reset/reset.css';
@import './assets/css/fontawesome/css/all.min.css';
@import './assets/css/animate.css/animate.css';
</style>

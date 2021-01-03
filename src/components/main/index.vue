<template>
  <div id="content-container">
      <div id="notice">
          <i class="fas fa-bell" />
          <carousel/>
          <search></search>
      </div>
      <div id="content">
          <div v-for="(tab, i) in catalogue" 
               :key="tab.id" 
               class="each-content" 
               v-show="!moduleSearch.isSearch || (moduleSearch.isSearch && judgeTabIsShow(i))">
              <div :id="tab.id" class="tab-title">
                  <i :class="['fas', `fa-${tab.icon}`, 'tab-icon']"/>
                  <span class="tab-name">{{tab.name}}</span>
                  <span :class="['edit-tab-name', {'tabIsEdit': tab.id == editWhich}]">
                      <i class="fas fa-trash-alt delete-icon" @click="deleteTab(tab.id)"/>
                      <i class="fas fa-edit edit-icon" @click="showEditAddTab(tab)"/>
                  </span>
                  <span :class="['edit', {'isEdit': tab.id == editWhich}]" 
                        @click="handleEdit(tab.id)">
                    {{ tab.id == editWhich? '退出' : '编辑' }}
                  </span>
              </div>
              <ul class="url-boxes" 
                  @dragstart="urlBoxDragStart"
                  @dragend="urlBoxDragEnd">
                  <li v-for="(urls, j) in tab.URLS" 
                      :key="urls.id" 
                      class="each-url-box" 
                      v-show="!moduleSearch.isSearch || (moduleSearch.isSearch && judgeUrlIsShow(i, j))"
                      :draggable="tab.id == editWhich ? true : false"
                      @dragenter="urlBoxEnter($event, tab.id)"
                      :data-id="urls.id">
                      <a :href="urls.url" target="_blank" class="url-link">
                          <div class="round-box">
                              <img :src="urls.icon" :alt="urls.name" class="url-icon" @load="imgLoadSuccess" @error="imgLoadErr" draggable="false">
                              <svg t="1604809784875" class="icon url-icon err-url-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2514" width="80%" height="80%"><path d="M511.58 513.75m-415.89 0a415.89 415.89 0 1 0 831.78 0 415.89 415.89 0 1 0-831.78 0Z" fill="#353F51" p-id="2515"></path><path d="M511.58 173.48c187.63 0 340.27 152.64 340.27 340.27S699.21 854.02 511.58 854.02 171.31 701.38 171.31 513.75s152.65-340.27 340.27-340.27m0-75.61C281.9 97.87 95.7 284.07 95.7 513.75s186.2 415.89 415.89 415.89 415.89-186.2 415.89-415.89S741.27 97.87 511.58 97.87z" fill="#70798B" p-id="2516"></path><path d="M511.58 173.48c52.68 0 132.33 135.71 132.33 340.27s-79.65 340.27-132.33 340.27-132.32-135.71-132.32-340.27 79.64-340.27 132.32-340.27m0-75.61c-114.84 0-207.94 186.2-207.94 415.89s93.1 415.89 207.94 415.89 207.94-186.2 207.94-415.89S626.43 97.87 511.58 97.87z" fill="#70798B" p-id="2517"></path><path d="M133.51 362.52h756.16v75.62H133.51zM133.51 589.37h756.16v75.62H133.51z" fill="#70798B" p-id="2518"></path></svg>  
                          </div>
                          <span class="url-name">{{ urls.name }}</span>
                      </a>
                      <span :class="['edit-container', {'urlIsEdit': tab.id == editWhich}]">
                          <i class="fas fa-trash-alt delete-icon" @click="deleteUrl(urls.id)"/>
                          <i class="fas fa-edit edit-icon" @click="showEditUrlAlert(urls)"/>
                      </span>
                  </li>
                  <li class="each-url-box add-more" 
                      @click="showNewUrlAlert(tab.id)">
                      <i class="fas fa-plus"/>
                  </li>
              </ul>
          </div>
          <urlAlert/>
      </div>
  </div>
</template>

<script>
/* API */
import { inject } from 'vue'
import { useStore } from 'vuex'
/* 组件 */
import urlAlert from '@/components/public/urlAlert/index'
import tabAlert from '@/components/public/tabAlert/index'
import carousel from './carousel'
import search from './search'
/* 功能模块 */
import baseFunction from '@/use/base'
import editFunction from '@/use/edit'
import urlAlertFunction from '@/use/urlAlert'
import tabAlertFunction from '@/use/tabAlert'
import searchFunction from '@/use/search'
export default {
    components: {
        urlAlert,
        tabAlert,
        carousel,
        search,
    },
    setup() {
        const store = useStore()
        const catalogue = store.state.catalogue
        const moduleUrl = store.state.moduleUrl
        const $message = inject('message')
        const $confirm = inject('confirm')

        // 一些基础的方法
        let { imgLoadErr, imgLoadSuccess } = baseFunction()

        // url框的拖拽相关变量及功能
        let { 
            editWhich, 
            handleEdit, 
            deleteTab, 
            deleteUrl, 
            urlBoxDragStart, 
            urlBoxDragEnd, 
            urlBoxEnter 
        } = editFunction($message, $confirm)

        // 弹出 “新增”、“修改” url弹框
        let { showNewUrlAlert, showEditUrlAlert } = urlAlertFunction()

        // 搜索功能相关的变量及方法
        let { moduleSearch, judgeTabIsShow, judgeUrlIsShow } = searchFunction()

        // 展示修改tab的弹框
        let { showEditAddTab } = tabAlertFunction()

        return {
            catalogue, 
            showNewUrlAlert, 
            moduleUrl, 
            moduleSearch,
            imgLoadErr,
            imgLoadSuccess, 
            handleEdit, 
            showEditAddTab,
            deleteTab,
            deleteUrl,
            showEditUrlAlert,
            editWhich,
            judgeTabIsShow,
            judgeUrlIsShow,
            urlBoxDragStart,
            urlBoxDragEnd,
            urlBoxEnter,
        }
    }
}
</script>

<style scoped>
#content-container{
    display: block;
    margin-left: 250px;
    height: 100vh;
    background-color: rgb(249, 249, 249);
}
#notice{
    background-color: white;
    height: 80px;
    box-shadow: 1px 1px 5px #eee;
    line-height: 80px;
    position: relative;
}
.fa-bell{
    color: rgb(240, 179, 12);
    margin-left: 20px;
}
#content{
    height: calc(100% - 80px);
    overflow: auto;
}
.tab-title{
    height: 60px;
    line-height: 60px;
    color: #837c7c;
    position: relative;
}
.tab-icon{
    margin: 0 10px 0 30px;
}
.edit-tab-name{
    display: inline-block;
    width: 55px;
    height: 20.8px;
    line-height: 20.8px;
    color: #eee;
    display: none;
}
.tabIsEdit{
    display: inline-block;
}
.edit-icon, .delete-icon{
    margin-left: 10px;
    color: rgb(112, 106, 106);
    font-size: 14px;
    cursor: pointer;
}
.edit-icon{
    margin-right: 5px;
}

.edit-icon:hover, .delete-icon:hover{
    color: rgb(194, 96, 4);
}
.each-content:hover .edit{
    display: inline-block;
}
.edit{
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translate(0, -50%);
    color: rgb(172, 161, 161);
    font-size: .8em;
    cursor: pointer;
    display: none;
}
.edit:hover{
    color: #666;
}
.isEdit{
    display: block;
}
.url-boxes{
    display: inline-block;
    position: relative;
}
.each-url-box{
    display: inline-block;
    height: 150px;
    width: 200px;
    background-color: white;
    box-shadow: 0 0 3px 3px  rgba(225, 225, 225, .1);
    cursor: pointer;
    overflow: hidden;
    border-radius: 10px;
    margin: 15px 0 15px 30px;
    position: relative;
}
.edit-container{
    position: absolute;
    top: 0;
    right: -55px;
    display: inline-block;
    width: 55px;
    height: 25px;
    line-height: 25px;
    color: #eee;
    transition: all .5s ease;
    opacity: 0;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    background-color: rgb(248, 237, 237);
}
.urlIsEdit{
    opacity: 1;
    transform: translate(-55px);
}
.each-url-box:hover{
    transform: translate(0, -5px);
    transition: all .3s ease;
    box-shadow: 0 0 3px 3px  rgba(225, 225, 225, .3);
}
.url-link{
    height: 100%;
    width: 100%;
    position: relative;
}
.round-box{
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.url-icon{
    display: block;
    border-radius: 50%;
    overflow: hidden;
    height: 60%;
}
.err-url-icon{
    display: none;
}
.url-name{
    display: block;
    height: 25.5%;
    text-align: center;
    color: #666;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0 10px;
    word-break: break-all;
    word-wrap: break-word;
    text-overflow: ellipsis;
}
.add-more{
    text-align: center;
    line-height: 150px;
    color: #e1e1e1;
    font-size: 1.5em;
}
</style>
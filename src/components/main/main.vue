<template>
  <div id="content-container">
      <div id="notice">
          <i class="fas fa-bell"></i>
          <search></search>
      </div>
      <div id="content">
          <div v-for="(tab, i) in catalogue" 
               :key="i" 
               class="each-content" 
               v-show="!moduleSearch.isSearch || (moduleSearch.isSearch && judgeTabIsShow(i))">
              <div :id="tab.id" class="tab-title">
                  <i :class="['fas', `fa-${tab.icon}`, 'tab-icon']"/>
                  <span class="tab-name">
                      {{tab.name}}
                  </span>
                  <span :class="['edit-tab-name', {'tabIsEdit': tab.id == editWhich}]">
                      <i class="fas fa-trash-alt delete-icon" @click="deleteTag(tab.id)"/>
                      <i class="fas fa-edit edit-icon" @click="editTagAlertShow(tab)"/>
                  </span>
                  <span :class="['edit', {'isEdit': tab.id == editWhich}]" 
                        @click="enterEdit(tab.id)">
                    {{ tab.id == editWhich? '退出' : '编辑' }}
                  </span>
                  <tagAlert name="修改标签"></tagAlert>
              </div>
              <ul class="url-boxes">
                  <li v-for="(urls, j) in tab.URLS" 
                      :key="j" 
                      class="each-url-box" 
                      v-show="!moduleSearch.isSearch || (moduleSearch.isSearch && judgeUrlIsShow(i, j))">
                      <a :href="urls.url" target="_blank" class="url-link">
                          <div class="round-box">
                              <img :src="urls.icon" :alt="urls.name" class="url-icon" v-if="urls.icon != ''" @error="imgLoadErr">
                              <svg v-show="urls.icon == ''" t="1604809784875" class="icon url-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2514" width="80%" height="80%"><path d="M511.58 513.75m-415.89 0a415.89 415.89 0 1 0 831.78 0 415.89 415.89 0 1 0-831.78 0Z" fill="#353F51" p-id="2515"></path><path d="M511.58 173.48c187.63 0 340.27 152.64 340.27 340.27S699.21 854.02 511.58 854.02 171.31 701.38 171.31 513.75s152.65-340.27 340.27-340.27m0-75.61C281.9 97.87 95.7 284.07 95.7 513.75s186.2 415.89 415.89 415.89 415.89-186.2 415.89-415.89S741.27 97.87 511.58 97.87z" fill="#70798B" p-id="2516"></path><path d="M511.58 173.48c52.68 0 132.33 135.71 132.33 340.27s-79.65 340.27-132.33 340.27-132.32-135.71-132.32-340.27 79.64-340.27 132.32-340.27m0-75.61c-114.84 0-207.94 186.2-207.94 415.89s93.1 415.89 207.94 415.89 207.94-186.2 207.94-415.89S626.43 97.87 511.58 97.87z" fill="#70798B" p-id="2517"></path><path d="M133.51 362.52h756.16v75.62H133.51zM133.51 589.37h756.16v75.62H133.51z" fill="#70798B" p-id="2518"></path></svg>  
                          </div>
                          <span class="url-name">{{ urls.name }}</span>
                      </a>
                      <span :class="['edit-container', {'urlIsEdit': tab.id == editWhich}]">
                          <i class="fas fa-trash-alt delete-icon" @click="deleteUrl(urls.id)"/>
                          <i class="fas fa-edit edit-icon" @click="editUrl(urls)"/>
                      </span>
                  </li>
                  <li class="each-url-box add-more" @click="addMoreUrl(tab.id)">
                      <i class="fas fa-plus"/>
                  </li>
              </ul>
          </div>
      </div>
  </div>
  <urlAlert v-show="moduleUrl.isShow"></urlAlert>
</template>

<script>
import {ref, getCurrentInstance} from 'vue'
import {useStore} from 'vuex'
import {updateLocal} from '../../utils/utils'
import urlAlert from '../public/urlAlert/urlAlert'
import tagAlert from '../public/tabAlert/tabAlert'
import search from './childCpn/search'
export default {
    components: {
        urlAlert,
        tagAlert,
        search
    },
    setup() {
        const store = useStore()
        const catalogue = store.state.catalogue
        const moduleUrl = store.state.moduleUrl
        const moduleSearch = store.state.moduleSearch
        const root = getCurrentInstance().root.ctx
        const $message = root.$message
        const $confirm = root.$confirm
        const editWhich = ref(-1)
        
        // 弹出添加URL的框
        function addMoreUrl(id) {
            store.commit('changeUrlInfo', [
                {key: 'isShow', value: true},
                {key: 'whichTag', value: id},
                {key: 'alertType', value: '新增网址'}
            ])
        }

        // 处理无icon或icon加载失败的图片，令其使用默认svg图标
        function imgLoadErr(e) {
            let el = e.target
            el.style.display = 'none'
            el.nextSibling.style.display = 'inline-block'
        }

        // 进入编辑状态
        function enterEdit(id) {
            if(id != editWhich.value) {
                editWhich.value = id
            } else {
                editWhich.value = -1
            }     
        }

        // 修改标签弹框弹出
        function editTagAlertShow(tab) {
            store.commit('changeTabInfo', [
                {key: 'isShowAddTabAlert', value: true},
                {key: 'tagName', value: tab.name},
                {key: 'trueIcon', value: tab.icon},
                {key: 'isSelected', value: true},
                {key: 'currentIcon', value: tab.icon},
                {key: 'id', value: tab.id},
                {key: 'alertType', value: '修改标签'}
            ])
        }

        // 删除标签以及标签下的所有网址
        function deleteTag(id) {
            $confirm({
                content: '确定删除该标签以及该标签下所有网址吗？'
            })
            .then(() => {
                store.commit('remove', id)
                $message({
                    type: 'success',
                    content: '标签页及子网址删除成功'
                })
            })
            .catch(() => {})
        }

        // 删除某个网址
        function deleteUrl(id) {
            $confirm({
                content: '确定删除该网址吗？'
            })
            .then(() => {
                store.commit('remove', id)
                $message({
                    type: 'success',
                    content: '网址删除成功'
                })
            })
            .catch(() => {})      
        }

        // 弹出修改URL的弹框
        function editUrl(url) {
            store.commit('changeUrlInfo', [
                {key: 'url', value: url.url},
                {key: 'icon', value: url.icon},
                {key: 'id', value: url.id},
                {key: 'name', value: url.name},
                {key: 'isShow', value: true},
                {key: 'alertType', value: '修改网址'}
            ])
        }

        
        function judgeTabIsShow(i) {
            const URLS = catalogue[i]['URLS']
            let length = URLS.length
            for(let j = 0; j < length; j++) {
                if(moduleSearch.searchWord == '') return false;
                else if(URLS[j].name.toLowerCase().indexOf(moduleSearch.searchWord.toLowerCase()) !== -1) return true;
            }
            return false
        }

        function judgeUrlIsShow(i, j) {
            const url = catalogue[i]['URLS'][j]
            if(url.name.toLowerCase().indexOf(moduleSearch.searchWord.toLowerCase()) !== -1) return true;
            return false;
        }


        return {
            catalogue, 
            addMoreUrl, 
            moduleUrl, 
            moduleSearch,
            imgLoadErr, 
            enterEdit, 
            editTagAlertShow,
            deleteTag,
            deleteUrl,
            editUrl,
            editWhich,
            judgeTabIsShow,
            judgeUrlIsShow
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
.url-name{
    display: block;
    height: 26.5%;
    text-align: center;
    color: #666;
    overflow: hidden;
}
.add-more{
    text-align: center;
    line-height: 150px;
    color: #e1e1e1;
    font-size: 1.5em;
}
</style>
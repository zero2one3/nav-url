<template>
  <aside id="tabs-container">
      <div id="logo-container">
          {{ navInfos.navName }}
      </div>
      <ul id="tabs">
          <li class="tab tab-search" @click="handleSearchBox">
              <i class="fas fa-search tab-icon"/>
              <span>快速搜索</span>
          </li>
          <li class="tab tab-save" @click="handleSaveConfigAlert(true)">
              <i class="fas fa-share-square tab-icon"></i>
              <span>保存配置</span>
          </li>
          <li class="tab tab-import" @click="handleImportConfigAlert(true)">
              <i class="fas fa-cog tab-icon"></i>
              <span>导入配置</span>
          </li>
          <br>
          <li v-for="(item, index) in navInfos.catalogue" 
              :key="index"
              class="tab"
              @click="toID(item.id)">
                <span class="li-container">
                  <i :class="['fas', `fa-${item.icon}`, 'tab-icon']" />
                  <span>{{ item.name }}</span>
                  <i class="fas fa-angle-right tab-icon tab-angle-right"/>
                </span>
          </li>
          <li class="tab add-tab" @click="showNewAddTab">
              <i class="fas fa-plus"/>
          </li>
      </ul>
      <!--    添加标签弹框     -->
      <tabAlert/>
      <!--    保存配置弹框     -->
      <save-config />
      <!--    导入配置弹框     -->
      <import-config />
  </aside>
</template>

<script>
/* API */
import { useStore } from 'vuex'
import { inject } from 'vue'
/* 组件 */
import tabAlert from '@/components/public/tabAlert/index'
import saveConfig from './saveConfig'
import importConfig from './importConfig'
/* 功能模块 */
import saveConfigFunction from '@/use/saveConfig'
import importConfigFunction from '@/use/importConfig'
import searchFunction from '@/use/search'
import baseFunction from '@/use/base'
import tabAlertFunction from '@/use/tabAlert'
export default {
    name: 'tabs',
    components: {
        tabAlert,
        saveConfig,
        importConfig
    },
    setup() {   
        let navInfos = useStore().state    // Vuex的state对象
        const $message = inject('message')      // 获取message组件方法

        // 展示新增标签弹框
        let { showNewAddTab } = tabAlertFunction()
        
        // 控制 "保存配置弹框" 的展示
        let { handleSaveConfigAlert } = saveConfigFunction()

        // 控制 "导入配置弹框" 的展示
        let { handleImportConfigAlert } = importConfigFunction($message)

        // 控制 "搜索框" 的展示
        let { handleSearchBox } = searchFunction()

        // 点击标签，进行跳转
        let { toID } = baseFunction()
          
        return {
            navInfos,
            showNewAddTab, 
            handleSaveConfigAlert,
            handleImportConfigAlert,
            handleSearchBox,
            toID
        }
    }
}
</script>

<style scoped>
#tabs-container{
    width: 250px;
    height: 100vh;
    float: left;
    background-color: rgb(44, 42, 42);
}
#logo-container{
    height: 79px;
    color: white;
    text-align: center;
    line-height: 80px;
    border-bottom: 1px solid rgb(68, 67, 67);
}
#tabs{
    height: calc(100% - 80px);
    overflow: auto;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
}
#tabs::-webkit-scrollbar{
    display: none;
    width: 0 !important;
}

.tab{
    cursor: pointer;
    height: 50px;
    color: rgb(185, 164, 164);
    line-height: 50px;
    position: relative;
}
.to-id{
    display: block;
    height: 100%;
    color: rgb(134, 125, 125);
}
.tab-search{
    margin-top: 20px;
    text-align: center;
}
.tab-import, .tab-save{
    text-align: center;
}
.tab:hover .to-id, .tab:hover{
    color: white;
}
.li-container{
    display: inline-block;
    width: 100%;
    padding-left: 90px;
}
.tab-icon{
    margin: 0 15px 0 -30px;
}
.add-tab{
    text-align: center;
}
.tab-angle-right{
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 0;
}
</style>
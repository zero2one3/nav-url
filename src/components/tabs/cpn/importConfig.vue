<template>
  <div class="import-config-container" v-show="isShowImportAlert">
    <div class="import-config-alert">
      <div class="close-import-config-alert" @click="handleImportConfigAlert(false)"></div>
      <div class="import-config-alert-title">导入配置</div>
      <div class="import-config-alert-remind">说明：需要上传之前保存导出的xxx.json配置文件，文件中的信息会完全覆盖当前信息</div>
      <form action="" class="form">
        <label for="import_config_input" class="import-config-label">
          上传配置文件
          <i v-if="hasFile == 1" class="fas fa-times-circle uploadErr uploadIcon"/>
          <i v-else-if="hasFile == 2" class="fas fa-check-circle uploadSuccess uploadIcon"/>
        </label>
        <input id="import_config_input" type="file" class="select-file" ref="inputFile" @change="fileChange">
      </form>
      <lp-button type="primary" class="import-config-btn" @_click="importConfig">确认上传</lp-button>
    </div>
  </div>
</template>

<script>
/* API */
import { inject } from 'vue'
/* 组件 */
import lpButton from '@/components/public/lp-button/lp-button'
/* 功能模块 */
import importConfigFunction from '../function/importConfig'
export default {
    components: {
        lpButton
    },
    setup() {
        const $message = inject('message')
        const { 
          isShowImportAlert,
          handleImportConfigAlert,
          result,  
          isUpload, 
          isImport, 
          isLoading, 
          importConfig, 
          closeAlert, 
          inputFile, 
          fileChange, 
          hasFile 
        } = importConfigFunction($message)
        
        return {
          isShowImportAlert,
          handleImportConfigAlert,
          result, 
          isUpload,
          isImport, 
          isLoading,
          importConfig, 
          closeAlert,
          inputFile,
          fileChange,
          hasFile
        }
    }
}
</script>

<style scoped>
.import-config-container{
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .2);
  z-index: 999;
}
.import-config-alert{
  position: absolute;
  top: 45%;
  left: 50%;
  width: 300px;
  height: 250px;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, .2);
}
.close-import-config-alert{
  position: relative;
  height: 30px;
}
.close-import-config-alert::before{
  content: '\2716';
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
}
.import-config-alert-title{
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 17px;
  font-weight: 600;
}
.import-config-alert-remind{
  font-size: 13px;
  color: rgb(153, 145, 145);
  padding: 5px 20px;
  height: 30px;
}
.form{
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.select-file{
  display: none;
}
.import-config-label{
  width: 90px;
  height: 35px;
  border-radius: 5px;
  cursor: pointer;
  line-height: 35px;
  font-size: 13px;
  border: 1px solid rgb(209, 203, 203);
  display: inline-block;
  position: relative;
}
.import-config-label:hover{
  background-color: rgba(179, 165, 165, 0.2);
}
.uploadIcon{
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(150%, -50%);
  font-size: 1.2em;
}
.uploadErr{
  color: rgb(209, 16, 16);
}
.uploadSuccess{
  color: green;
}
.import-config-btn{
  height: 40px;
  width: 100px;
  margin: 20px auto;
  display: block;
}
</style>
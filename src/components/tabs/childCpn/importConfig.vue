<template>
  <div class="import-config-container" v-show="isShow">
    <div class="import-config-alert">
      <div class="close-import-config-alert" @click="closeAlert"></div>
      <div class="import-config-alert-title">导入配置</div>
      <div class="import-config-alert-remind">说明：需要上传之前保存导出的xxx.json配置文件，文件中的信息会完全覆盖当前信息</div>
      <form action="" class="form">
        <label for="import_config_input" class="import-config-label">上传配置文件</label>
        <input id="import_config_input" type="file" class="select-file" ref="inputFile">
      </form>
      <lp-button type="primary" class="import-config-btn" @btnClick="importConfig">确认上传</lp-button>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import lpButton from '../../public/lp-button'
export default {
    props: {
      isShow: {
        type: Boolean,
        default: true
      }
    },
    components: {
        lpButton
    },
    setup(props, context) {
        let result = ref('none')     // 导入的结果
        let isUpload = ref(false)    // 判断是否上传配置文件
        let isImport = ref(false)    // 判断配置是否导入成功
        let isLoading = ref(false)   // 判断按钮是否处于加载状态
        let inputFile = ref(null)    // 获取文件标签

        // 导入配置
        function importConfig() {
          let reader = new FileReader()
          let files = inputFile.value.files
          if(files.length === 0) alert('请上传配置文件');
          else {
            reader.readAsText(files[0])
            reader.onload = function() {
              let data = this.result
              window.localStorage.navInfos = data
              location.reload()
            }
          }
        }

        // 关闭弹窗
        function closeAlert() {
          context.emit('closeImportConfigAlert', false)
        }
        
        return {
          result, 
          isUpload,
          isImport, 
          isLoading,
          importConfig, 
          closeAlert,
          inputFile,
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
  background-color: rgba(0, 0, 0, .1);
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
}
.import-config-label:hover{
  background-color: rgba(179, 165, 165, 0.2);
}
.import-config-btn{
  height: 40px;
  width: 100px;
  margin: 20px auto;
  display: block;
}
</style>
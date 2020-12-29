<template>
  <div class="import-config-container" v-show="isShow">
    <div class="import-config-alert">
      <div class="close-import-config-alert" @click="closeAlert"></div>
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
import {ref, inject} from 'vue'
import lpButton from '@/components/public/lp-button/lp-button'
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
    setup(props, {emit}) {
        const result = ref('none')     // 导入的结果
        const isUpload = ref(false)    // 判断是否上传配置文件
        const isImport = ref(false)    // 判断配置是否导入成功
        const isLoading = ref(false)   // 判断按钮是否处于加载状态
        const inputFile = ref(null)    // 获取文件标签
        const hasFile = ref(0)         // 判断文件的传入情况。0：未传入  1: 格式错误  2：格式正确
        const $message = inject('message')

        // 导入配置
        function importConfig() {
          let reader = new FileReader()
          let files = inputFile.value.files
          if(hasFile.value == 0) {
            $message({
              type: 'warning',
              content: '请先上传配置文件'
            })
          }
          else if(hasFile.value == 1) {
            $message({
              type: 'warning',
              content: '请上传正确格式的文件，例如xx.json'
            })
          }
          else if(hasFile.value == 2) {
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
          emit('closeImportConfigAlert', false)
          hasFile.value = 0
        }

        function fileChange(e) {
          let files = e.target.files
          if(files.length === 0) {
            $message({
              type: 'warning',
              content: '请先上传配置文件'
            })
          }
          else {
            let targetFile = files[0]
            if(!/\.json$/.test(targetFile.name)) {
              hasFile.value = 1
              $message({
                type: 'warning',
                content: '请确认文件格式是否正确'
              })
            } else {
              hasFile.value = 2
              $message({
                type: 'success',
                content: '文件格式正确'
              })
            }
          }
        }
        
        return {
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
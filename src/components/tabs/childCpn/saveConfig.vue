<template>
  <div class="save-config-container" v-show="isShow">
    <div class="save-config-alert">
      <div class="close-save-config-alert" @click="closeAlert"></div>
      <div class="save-config-alert-title">保存配置</div>
      <div class="save-config-alert-remind">说明：保存下载成功后会生成一个json文件，请注意保存，方便之后一键导入</div>
      <a class="save-link" ref="a_save" @click="saveConfig">
        <lp-button type="primary" class="save-config-btn">Save</lp-button>
      </a>
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
        default: false
      }
    },
    components: {
        lpButton
    },
    setup(props, {emit}) {
        let result = ref('none')     // 保存的结果
        let a_save = ref(null)

        // 下载json文件
        function downLoadFile(aLink, fileName, content) {
          aLink.download = fileName
          aLink.href = "data:text/plain," + content
        }

        // 调用下载接口
        function saveConfig() {
          downLoadFile(a_save.value, 'nav.config.json', window.localStorage.navInfos)
        }

        // 关闭弹窗
        function closeAlert() {
          emit('closeSaveConfigAlert', false)
        }

        return {result, a_save, saveConfig, closeAlert}
    }
}
</script>

<style scoped>
.save-config-container{
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .1);
  z-index: 999;
}
.save-config-alert{
  position: absolute;
  top: 45%;
  left: 50%;
  width: 300px;
  height: 200px;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, .2);
}
.close-save-config-alert{
  position: relative;
  height: 30px;
}
.close-save-config-alert::before{
  content: '\2716';
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
}
.save-config-alert-title{
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 17px;
  font-weight: 600;
}
.save-config-alert-remind{
  font-size: 13px;
  color: rgb(153, 145, 145);
  padding: 5px 20px;
  height: 30px;
}
.save-link{
  height: 40px;
  width: 100px;
  margin: 20px auto;
  display: block;
}
.save-config-btn{
  height: 40px;
  width: 100px;
  display: block;
}
</style>
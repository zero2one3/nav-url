<template>
  <div :class="[
            'url-alert-container',
            'animate__animated',
            {'animate__fadeIn': state.isShow}
        ]"
        v-show="state.isShow">
      <div class="url-alert">
          <span class="close-url-alert" @click="closeUrlAlert"/>
          <div class="alert-title">{{ state.alertType }}</div>
          <div class="operating-space">
              <lp-input class="lp-input-container" :value="state.url" @_input="inputUrl" placeholder="请输入URL"></lp-input>
              <lp-input class="lp-input-container" :value="state.name" @_input="inputName" placeholder="请输入名称"></lp-input>
              <selectIcon/>
          </div>
          <div class="btn-group">
              <lp-button @_click="closeUrlAlert" type="danger" class="btn-cancel">取消</lp-button>
              <lp-button @_click="confirm" type="success" class="btn-confirm">确认</lp-button>
          </div>
      </div>
  </div>
</template>

<script>
/* API */
import { inject } from 'vue'
/* 组件 */
import lpButton from '@/components/public/lp-button/lp-button'
import lpInput from '@/components/public/lp-input/lp-input'
import selectIcon from './selectIcon'
/* 功能模块 */
import urlAlertFunction from '@/use/urlAlert'
export default {
    components: {
        lpButton,
        lpInput,
        selectIcon
    },
    setup() {
        const $message = inject('message')

        // url弹框相关变量及功能
        let { state, closeUrlAlert, confirm, inputUrl, inputName } = urlAlertFunction($message)

        return {
            state,
            confirm,
            closeUrlAlert,
            inputUrl,
            inputName
        }
    }
}
</script>

<style scoped>
.url-alert-container{
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .3);
    width: 100vw;
    height: 100vh;
    z-index: 999;
}
.url-alert{
    position: absolute;
    width: 400px;
    height: 400px;
    top: 40%;
    left: 50%;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    background-color: white;
    box-shadow: 0 0 2px 2px  rgba(146, 134, 134, 0.1);
}
.close-url-alert{
    display: inline-block;
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
    color: rgb(133, 122, 122);
}
.close-url-alert:hover{
    color: rgb(51, 49, 49);
}
.close-url-alert::before{
    content: '\2716';
}
.alert-title{
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
}
.operating-space{
    height: 270px;
    overflow: hidden;
}
.lp-input-container{
    width: 300px;
    margin: 10px auto 0;
}



.btn-group{
    height: 80px;
    line-height: 80px;
    float: right;
}
.btn-confirm{
    margin-right: 15px;
}
.btn-cancel{
    margin-right: 30px;
}
</style>
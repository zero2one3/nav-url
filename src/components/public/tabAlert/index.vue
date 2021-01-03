<template>
  <div :class="[
            'tab-alert-container', 
            'animate__animated', 
            {'animate__fadeIn': state.isShowAddTabAlert}
        ]" 
       v-show="state.isShowAddTabAlert">
      <div class="tab-alert">
          
          <div class="alert-title">
              {{ state.alertType }}
              <span class="close-tab-alert" @click="closeTabAlert"/>
          </div>
          <div class="operating-space">
              <lp-input class="lp-input-container" :value="state.tagName" @_input="inputTabName" maxlength="12"/>
              <select-icon/>
          </div>
          <div class="btn-group">
              <lp-button @_click="closeTabAlert" type="danger" class="btn-cancel">取消</lp-button>
              <lp-button @_click="confirm" type="success" class="btn-confirm">确认</lp-button>
          </div>
      </div>
  </div>
</template>

<script>
/* API */
import {inject} from 'vue'
/* 组件 */
import lpButton from '@/components/public/lp-button/lp-button'
import lpInput from '@/components/public/lp-input/lp-input'
import selectIcon from './selectIcon'
/* 功能模块 */
import { judgeString } from '@/utils/utils'
import tabAlertFunction from '@/use/tabAlert'
export default {
    components: {
        lpButton,
        lpInput,
        selectIcon
    },
    setup() {
        const $message = inject('message')
        
        // tab弹框相关变量及功能
        let { state, closeTabAlert, confirm, inputTabName } = tabAlertFunction($message)

        return {
            closeTabAlert, 
            confirm, 
            inputTabName,
            state
        }
    }
}
</script>

<style scoped>
.tab-alert-container{
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .2);
    width: 100vw;
    height: 100vh;
    z-index: 999;
}
.tab-alert{
    z-index: 999;
    position: absolute;
    width: 400px;
    height: 300px;
    top: 40%;
    left: 50%;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    background-color: white;
    box-shadow: 0 0 2px 2px  rgba(114, 105, 105, 0.1);
}
.close-tab-alert{
    display: inline-block;
    position: absolute;
    top: 0;
    right: 10px;
    cursor: pointer;
    height: 50px;
    color: rgb(133, 122, 122);
}
.close-tab-alert:hover{
    color: rgb(51, 49, 49);
}
.close-tab-alert::before{
    content: '\2716';
}
.alert-title{
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: black;
}
.operating-space{
    height: 170px;
    overflow: hidden;
}
.lp-input-container{
    width: 300px;
    margin: 10px auto 0;
    line-height: 0;
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
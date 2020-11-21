<template>
  <div class="url-alert-container animate__animated" ref="alertBox">
      <div class="url-alert">
          <span class="close-url-alert" @click="cancel"/>
          <div class="alert-title">{{ state.alertType }}</div>
          <div class="operating-space">
              <lp-input class="lp-input-container" :value="state.url" @_input="inputUrl" placeholder="请输入URL"></lp-input>
              <lp-input class="lp-input-container" :value="state.name" @_input="inputName" placeholder="请输入名称"></lp-input>
              <selectIcon></selectIcon>
          </div>
          <div class="btn-group">
              <lp-button @_click="cancel" type="danger" class="btn-cancel">取消</lp-button>
              <lp-button @_click="confirm" type="success" class="btn-confirm">确认</lp-button>
          </div>
      </div>
  </div>
</template>

<script>
import {reactive, ref, getCurrentInstance} from 'vue'
import {useStore} from 'vuex'
import {removeClass, debounce} from '../../../utils/utils'
import lpButton from '../../public/lp-button/lp-button'
import lpInput from '../../public/lp-input/lp-input'
import selectIcon from './selectIcon'
export default {
    components: {
        lpButton,
        lpInput,
        selectIcon
    },
    setup() {
        let store = useStore()    // 使用Vuex
        let state = reactive(store.state.moduleUrl)
        let alertBox = ref(null)  // 获取弹框根标签元素
        const instance = getCurrentInstance().root.ctx

        // 关闭弹框
        function cancel() {
            let el = alertBox.value
            removeClass(el, 'animate__fadeIn')
            store.commit('changeUrlInfo', [
                {key: 'url', value: ''},
                {key: 'icon', value: ''},
                {key: 'isShow', value: false},
                {key: 'name', value: ''},
                {key: 'isLoadingIcon', value: false},
                {key: 'isLoadingName', value: false},
                {key: 'whichTag', value: -1},
                {key: 'imgErr', value: false},
                {key: 'otherIcon', value: ''},
                {key: 'id', value: -1}
            ])
        }

        // 确认添加URL 或 确认修改URL
        function sure() {
            if(state.url == '') {
                alert('URL不能为空')
                return;
            }
            if(state.alertType == '新增网址') {
                store.commit('add', {
                    key: '2',
                    value: {
                        name: state.name,
                        icon: state.icon,
                        url: state.url,
                        whichTag: state.whichTag
                    }
                })
                instance.$alert({
                    type: 'success',
                    content: '网址添加成功'
                })
            } else if(state.alertType == '修改网址') {
                store.commit('update', {
                    key: 'catalogue',
                    value: {
                        id: state.id,
                        name: state.name,
                        icon: state.icon,
                        url: state.url,
                    }
                })
                instance.$alert({
                    type: 'success',
                    content: '网址修改成功'
                })
            }
            
            cancel()
        }
        // 防抖处理过后的 “确认添加标签” 函数
        let confirm = debounce(sure, 200)

        // URL输入框内容改变事件
        function inputUrl(value) {
            store.commit('changeUrlInfo', {
                key: 'url',
                value
            }) 
        }

        // Name输入框内容改变事件
        function inputName(value) {
            if(typeof value != 'object') {
                store.commit('changeUrlInfo', {
                    key: 'name',
                    value
                })
            }
        }

        return {
            state,
            alertBox,
            confirm,
            cancel,
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
    background-color: rgba(0, 0, 0, .1);
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
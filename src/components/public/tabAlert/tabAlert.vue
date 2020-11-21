<template>
  <div class="tab-alert-container animate__animated" ref="alertBox" v-show="state.isShowAddTabAlert">
      <div class="tab-alert">
          <span class="close-tab-alert" @click="cancel"/>
          <div class="alert-title">{{ name }}</div>
          <div class="operating-space">
              <lp-input class="lp-input-container" :value="state.tagName" @_input="input" maxlength="10"></lp-input>
              <select-icon></select-icon>
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
    props: {
        name: {
            type: String,
            default: '新增标签'
        }
    },
    setup(props) {
        let store = useStore()    // 使用Vuex
        let state = store.state.moduleTab
        let alertBox = ref(null)  // 获取弹框根标签元素
        const instance = getCurrentInstance().root.ctx

        // 关闭弹框
        function cancel() {
            let el = alertBox.value
            removeClass(el, 'animate__fadeIn')
            el.style.display = 'none'
            store.commit('changeTabInfo', [
                {key: 'tagName', value: ''},
                {key: 'trueIcon', value: 'plus'},
                {key: 'currentIcon', value: ''},
                {key: 'isSelected', value: false},
                {key: 'isShowIconList', value: false},
                {key: 'isShowAddTabAlert', value: false},
            ])
        }

        // 确认添加标签
        function sure() {
            // 判断标签名是否为空
            if(state.tagName == '') {
                instance.$alert({
                    type: 'warning',
                    content: '标签名称不能为空'
                })
                return;
            }
            // 判断icon是否为空
            if(!state.isSelected) {
                instance.$alert({
                    type: 'warning',
                    content: '请选择合适的图标'
                })
                return;
            }
            if(props.name == '新增标签') {
                store.commit('add', {
                    key: '1',
                    value: {
                        name: state.tagName,
                        icon: state.trueIcon
                    }
                })
                instance.$alert({
                    type: 'success',
                    content: '标签添加成功'
                })
            } else if(props.name == '修改标签') {
                store.commit('update', {
                    key: 'catalogue',
                    value: {
                        id: state.id,
                        icon: state.trueIcon,
                        name: state.tagName
                    }
                })
                instance.$alert({
                    type: 'success',
                    content: '标签修改成功'
                })
            }
            cancel()
        }
        // 防抖处理过后的 “确认添加标签” 函数
        let confirm = debounce(sure, 200)

        // 输入框内容改变事件
        function input(value) { 
            store.commit('changeTabInfo', {
                key: 'tagName',
                value
            })
        }

        return {
            alertBox, 
            cancel, 
            confirm, 
            input,
            state
        }
    }
}
</script>

<style scpoed>
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
    box-shadow: 0 0 2px 2px  rgba(0, 0, 0, .1);
}
.close-tab-alert{
    display: inline-block;
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
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
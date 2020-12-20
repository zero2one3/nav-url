<template>
  <teleport to="body">
      <div class="lp-confirm-container" ref="lpConfirmAlert">
        <div class="lp-confirm-box">
            <div class="lp-confirm-title">
                <span class="lp-confirm-title-txt">{{ title }}</span>
                <span class="lp-confirm-title-close" @click="closeConfirm">&#10006;</span>
            </div>
            <div class="lp-confirm-content">
                <span class="lp-confirm-content-txt">{{ content }}</span>
            </div>
            <div class="lp-confirm-btn-groups">
                <lp-button type="primary" class="lp-confirm-btn" @_click="sureConfirm">确定</lp-button>
                <lp-button type="default" class="lp-confirm-btn lp-confirm-btn-cancel" @_click="closeConfirm">取消</lp-button>
            </div>
        </div>
    </div>
  </teleport>
</template>

<script>
import lpButton from '../lp-button/lp-button'
import {ref} from 'vue'
export default {
    components: {
        lpButton
    },
    props: {
        title: {
            type: String,
            default: '提示'
        },
        content: {
            type: String,
            default: '确定关闭吗？'
        }
    },
    setup() {
        const status = ref(-1)       // 存储用户点的状态，-1：未点击；0：取消；1：确定
        const lpConfirmAlert = ref(null)

        function removeElement() {     
            lpConfirmAlert.value.parentNode.removeChild(lpConfirmAlert.value)
        }
        
        function closeConfirm() {
            status.value = 0
            removeElement()
        }

        function sureConfirm() {
            status.value = 1
            removeElement()
        }

        return {removeElement, closeConfirm, sureConfirm, status, lpConfirmAlert}
    }
}
</script>

<style scoped>
.lp-confirm-container{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .3);
}
.lp-confirm-box{
    margin: 15vh auto 0;
    width: 30%;
    height: 200px;
    min-width: 350px;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    background-color: white;
}
.lp-confirm-title{
    height: 55px;
    line-height: 55px;
    position: relative;
}
.lp-confirm-title-txt{
    font-size: 18px;
    margin-left: 20px;
}
.lp-confirm-title-close{
    position: absolute;
    right: 20px;
    cursor: pointer;
    color: rgb(155, 143, 143);
}
.lp-confirm-title-close:hover{
    color: rgb(44, 40, 40);
}
.lp-confirm-content{
    padding: 0 20px;
    height: 85px;
    line-height: 85px;
    font-size: 14px;
    color: #666;
}
.lp-confirm-content-txt{
    word-break: break-all;
}
.lp-confirm-btn-groups{
    height: 60px;
}
.lp-confirm-btn{
    float: right;
    height: 40px;
    width: 75px;
    margin: 0 20px;
}
.lp-confirm-btn-cancel{
    margin-right: 5px;
}
</style>
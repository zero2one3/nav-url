<template>
  <div class="select-icon-box" :style="{'height': `${boxHeight}px`}">
        <div :class="['select-icon']" 
             :style="{'width': `${sideLen}px`, 'height': `${sideLen}px`, 'margin': `${(boxHeight - sideLen)/2}px 50px`}">
            <span class="select-icon-inner" 
                  :style="{'line-height': `${sideLen}px`}">
                <span v-if="state.icon == ''">图标</span>
                <img :src="state.icon" alt="" v-else-if="!state.imgErr" class="targetIcon" @error="imgloadErr">
                <svg v-if="state.imgErr" t="1604809784875" class="icon targetIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2514" width="80%" height="80%"><path d="M511.58 513.75m-415.89 0a415.89 415.89 0 1 0 831.78 0 415.89 415.89 0 1 0-831.78 0Z" fill="#353F51" p-id="2515"></path><path d="M511.58 173.48c187.63 0 340.27 152.64 340.27 340.27S699.21 854.02 511.58 854.02 171.31 701.38 171.31 513.75s152.65-340.27 340.27-340.27m0-75.61C281.9 97.87 95.7 284.07 95.7 513.75s186.2 415.89 415.89 415.89 415.89-186.2 415.89-415.89S741.27 97.87 511.58 97.87z" fill="#70798B" p-id="2516"></path><path d="M511.58 173.48c52.68 0 132.33 135.71 132.33 340.27s-79.65 340.27-132.33 340.27-132.32-135.71-132.32-340.27 79.64-340.27 132.32-340.27m0-75.61c-114.84 0-207.94 186.2-207.94 415.89s93.1 415.89 207.94 415.89 207.94-186.2 207.94-415.89S626.43 97.87 511.58 97.87z" fill="#70798B" p-id="2517"></path><path d="M133.51 362.52h756.16v75.62H133.51zM133.51 589.37h756.16v75.62H133.51z" fill="#70798B" p-id="2518"></path></svg>
            </span>
        </div>
        <div class="btn-group">
            <lp-button type="primary" 
                       round 
                       plain 
                       class="getBtn" 
                       @_click="getUrlName"
                       :loading="state.isLoadingName">
                自动获取网页名称
            </lp-button>
            <lp-button type="primary" 
                       round 
                       plain 
                       class="getBtn" 
                       @_click="getUrlIcon"
                       :loading="state.isLoadingIcon">
                自动获取网页图标
            </lp-button>
        </div>
  </div>
</template>

<script>
/* API */
import { inject } from 'vue'
/* 组件 */
import lpButton from '@/components/public/lp-button/lp-button'
/* 功能模块 */
import urlAlertFunction from '@/use/urlAlert'
export default {
    components: {
        lpButton
    },
    props: {
        boxHeight: {
            type: Number,
            default: 170
        },
        sideLen: {
            type: Number,
            default: 90
        }
    },
    setup() {
        const $message = inject('message')

        let { state, getUrlIcon, getUrlName, imgloadErr } = urlAlertFunction($message)

        return {
            state,
            getUrlName,
            getUrlIcon,
            imgloadErr
        }
    }
}
</script>

<style scoped>
.select-icon-box{
    position: relative;
}
.select-icon{
    display: inline-block;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px dotted #6e6868;
}
.select-icon-inner{
    display: inline-block;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #8f8181;
    font-size: 12px;
    position: relative;
    overflow: hidden;
}
.btn-group{
    display: inline-block;
    width: 210px;
    height: 100%;
}
.getBtn{
    width: 170px;
    display: block;
    margin: 20px 0 30px;
}
.targetIcon{
    display: inline-block;
    width: 80%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
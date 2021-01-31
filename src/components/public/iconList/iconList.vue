<template>
  <div class="icon-list-box">
      <div class="remind-choose">
          请选择一个你喜欢的图标
      </div>
      <div class="icon-list" ref="iconContainer" @click="chooseIcon" @scroll="scrollUpdate">
          <span :class="['icon-container', {'active': state.currentIcon == item}]"
                :id="item" 
                v-for="(item, index) in hasShowIconList" 
                :key="index">
            <i :class="['fas', `fa-${item}`]"/>
            <span class="select-box" v-show="state.currentIcon == item">
                <i class="fas fa-check"/>
            </span>
          </span>
      </div>
      <div class="btn-group">
            <lp-button @_click="cancel" type="warning" plain class="btn-cancel">取消</lp-button>
            <lp-button @_click="confirm" type="success" plain class="btn-confirm">确认</lp-button>
      </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import lpButton from '../../public/lp-button/lp-button'
import { iconList } from './icons'
import { throttle } from '@/utils/utils.js'
import { reactive, ref } from 'vue'
export default {
    components: {
        lpButton
    },
    setup() {
        
        const store = useStore()
        const state = store.state.moduleTab
        const hasShowIconList = reactive([])
        const iconContainer = ref(null)
        function initIcon () {
            let trueCount = () => {
                return iconList.length < 30 ? iconList.length : 30
            }
            hasShowIconList.push(...iconList.slice(-trueCount()))
            iconList.length = iconList.length - trueCount()
            return function() {
                let { scrollHeight, scrollTop, clientHeight } = iconContainer.value
                if(scrollTop >= scrollHeight - clientHeight) {
                    hasShowIconList.push(...iconList.slice(-trueCount()))
                    iconList.length = iconList.length - trueCount()

                }
            }
        }
        let scrollFn = initIcon()
        const scrollUpdate = throttle(scrollFn, 500)

        // 选中某个的icon
        function chooseIcon(e) {
            let target = null
            let tagName = e.target.tagName
            if(tagName == 'I') {
                target = e.target.parentNode
            } else if(tagName == 'SPAN') {
                target = e.target
            }
            store.commit('changeTabInfo', {
                key: 'currentIcon',
                value: target.id
            })
        }

        // 取消选择
        function cancel() {
            store.commit('changeTabInfo', [
                {key: 'currentIcon', value: ''},
                {key: 'isShowIconList', value: false}
            ])
        }

        // 确认选择
        function confirm() {
            store.commit('changeTabInfo', [
                {key: 'trueIcon', value: state.currentIcon},
                {key: 'isShowIconList', value: false},
                {key: 'isSelected', value: true}
            ])
        }

        return {
            hasShowIconList,
            iconList,
            iconContainer,
            cancel,
            confirm,
            chooseIcon,
            state,
            scrollUpdate
        }
    }
}
</script>

<style scoped>
.icon-list-box{
    z-index: 1000;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 400px;
    border-radius: 10px;
    background-color: white;
}
.remind-choose{
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    font-weight: 600;
    color: black !important;
}
.icon-list{
    height: 270px;
    overflow: auto;
}
.icon-container{
    float: left;
    width: 80px;
    height: 80px;
    cursor: pointer;
    font-size: 30px;
    line-height: 80px;
    text-align: center;
    position: relative;
    color: black;
}
.icon-container:hover{
    background-color: rgba(180, 160, 160, .2);
}
.active{
    color: rgba(165, 149, 149, 0.6);
    background: rgba(194, 174, 174, .2);
}
.select-box{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: green;
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
<template>
  <div class="select-icon-box" :style="{'height': `${boxHeight}px`}">
        <span class="remind-click-chooseBtn">请选择图标</span>
        <div class="select-icon" 
             :style="{'width': `${sideLen}px`, 'height': `${sideLen}px`, 'margin-top': `${(boxHeight - sideLen)/2}px`, 'margin-left': '90px'}"
             @click="showIconList">
            <span :class="['select-icon-inner', {'isSelected': state.isSelected}]" 
                  :style="{'line-height': `${sideLen}px`}">
                <i :class="['fas', `fa-${state.trueIcon}`]"/>
            </span>
        </div>
        <icon-List v-show="state.isShowIconList"/>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import iconList from '@/components/public/iconList/iconList'
export default {
    props: {
        boxHeight: {
            type: Number,
            default: 120
        },
        sideLen: {
            type: Number,
            default: 90
        }
    },
    components: {
        iconList
    },
    setup() {
        let store = useStore()
        let state = store.state.moduleTab

        // 弹出icon列表框
        function showIconList() {
            store.commit('changeTabInfo', {
                key: 'isShowIconList',
                value: true
            })
            if(state.isSelected) {
                store.commit('changeTabInfo', {
                    key: 'currentIcon',
                    value: state.trueIcon
                })
            }
        }

        return {
            showIconList, 
            state
        }
    }
}
</script>

<style scoped>
.select-icon-box{
    text-align: center;
    position: relative;
}
.remind-click-chooseBtn{
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
}
.select-icon{
    display: inline-block;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px dotted #6e6868;
    cursor: pointer;
}
.select-icon-inner{
    display: inline-block;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #e0d9d9;
    font-size: 20px;
    line-height: 88px;
}
.isSelected{
    color: black;
    font-size: 40px;
}
</style>
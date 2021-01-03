// 新增以及修改tab的相关功能

import {  } from 'vue'

import store from '@/store/index'
import { judgeString } from '@/utils/utils'

// 变量
const state = store.state.moduleTab   // tab相关全局状态 

export default function tabAlertFunction($message) {

    // 展示新增标签弹框
    function showNewAddTab() {
        store.commit('changeTabInfo', [
            {key: 'isShowAddTabAlert', value: true},
            {key: 'alertType', value: '新增标签'}
        ])
    }

    // 展示修改标签弹框
    function showEditAddTab(tab) {
        store.commit('changeTabInfo', [
            {key: 'isShowAddTabAlert', value: true},
            {key: 'tagName', value: tab.name},
            {key: 'trueIcon', value: tab.icon},
            {key: 'isSelected', value: true},
            {key: 'currentIcon', value: tab.icon},
            {key: 'id', value: tab.id},
            {key: 'alertType', value: '修改标签'}
        ])
    }

    // 关闭弹框
    function closeTabAlert() {
        store.commit('changeTabInfo', [
            {key: 'tagName', value: ''},
            {key: 'trueIcon', value: 'plus'},
            {key: 'currentIcon', value: ''},
            {key: 'isSelected', value: false},
            {key: 'isShowIconList', value: false},
            {key: 'isShowAddTabAlert', value: false},
        ])
    }

    // 确认操作
    function confirm() {
        // 判断标签名是否为空
        if(state.tagName == '') {
            $message({
                type: 'warning',
                content: '标签名称不能为空'
            })
            return;
        }
        // 判断标签名长度是否符合要求
        if(!judgeString(state.tagName)) {
            $message({
                type: 'warning',
                content: '标签名最多为6位中文或12位英文'
            })
            return;
        } 
        // 判断icon是否为空
        if(!state.isSelected) {
            $message({
                type: 'warning',
                content: '请选择合适的图标'
            })
            return;
        }
        if(state.alertType == '新增标签') {
            store.commit('add', {
                key: '1',
                value: {
                    name: state.tagName,
                    icon: state.trueIcon
                }
            })
            $message({
                type: 'success',
                content: '标签添加成功'
            })
        } else if(state.alertType == '修改标签') {
            store.commit('update', {
                key: 'catalogue',
                value: {
                    id: state.id,
                    icon: state.trueIcon,
                    name: state.tagName
                }
            })
            $message({
                type: 'success',
                content: '标签修改成功'
            })
        }
        closeTabAlert()
    }

    // 输入框内容改变事件
    function inputTabName(value) { 
        store.commit('changeTabInfo', {
            key: 'tagName',
            value
        })
    }

    return {
        state,
        showNewAddTab,
        showEditAddTab,
        closeTabAlert,
        confirm,
        inputTabName,
    }
}

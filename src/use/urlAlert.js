// 新增以及修改url的相关功能

import { nextTick } from 'vue'

import store from '@/store/index'
import request from '@/network/request'
import trackImgFunction from '@/use/trackImg'

// 变量
const state = store.state.moduleUrl    // url相关全局状态

export default function urlAlertFunction($message) {

    // 展示新增url弹框
    function showNewUrlAlert(id) {
        store.commit('changeUrlInfo', [
            {key: 'isShow', value: true},
            {key: 'whichTag', value: id},
            {key: 'alertType', value: '新增网址'}
        ])
    }

    // 展示修改url弹框
    function showEditUrlAlert(url) {
        store.commit('changeUrlInfo', [
            {key: 'url', value: url.url},
            {key: 'icon', value: url.icon},
            {key: 'id', value: url.id},
            {key: 'name', value: url.name},
            {key: 'isShow', value: true},
            {key: 'alertType', value: '修改网址'}
        ])
    }

    // 关闭弹框
    function closeUrlAlert() {
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

    // 点击确认按钮
    function confirm() {
        if(state.url == '') {
            $message({
                type: 'warning',
                content: 'URL不能为空'
            })
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
            nextTick(() => trackImgFunction().lazyLoad())
            $message({
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
            $message({
                type: 'success',
                content: '网址修改成功'
            })
        }
        
        closeUrlAlert()
    }

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

    // 获取网页名称
    function getUrlName() {
        if(state.url == '') {
            $message({
                type: 'warning',
                content: '请先输入URL'
            })
            return;
        }
        store.commit('changeUrlInfo', {
            key: 'isLoadingName',
            value: true
        })

        request({
            params: {
                target: 'name',
                targetUrl: state.url
            }
        })
        .then(res => {
            store.commit('changeUrlInfo', {key: 'name', value: res.data.data})
            $message({
                type: 'success',
                content: '网页名称获取成功'
            })
        })
        .catch((err) => {
            console.log(err);
            $message({
                type: 'err',
                content: '网络超时或目标网站拒绝此次请求'
            })
        })
        .finally(() => {
            store.commit('changeUrlInfo', {key: 'isLoadingName', value: false})
        })
    }

    // 获取网页图标
    function getUrlIcon() {
        if(state.url == '') {
            $message({
                type: 'warning',
                content: '请先输入URL'
            })
            return;
        }

        store.commit('changeUrlInfo', {
            key: 'isLoadingIcon',
            value: true
        })

        request({
            params: {
                target: 'icon',
                targetUrl: state.url
            }
        })
        .then(res => {
            let icon = res.data.data
            let otherIcon = res.data.otherIcon
            if(icon == null) icon = otherIcon;
            store.commit('changeUrlInfo', [
                {key: 'icon', value: icon},
                {key: 'otherIcon', value: otherIcon}
            ])
            $message({
                type: 'success',
                content: '图标获取成功'
            })
        })
        .catch(() => {
            $message({
                type: 'err',
                content: '网络超时或目标网站拒绝此次请求'
            })
        })
        .finally(() => {
            store.commit('changeUrlInfo', [
                {key: 'isLoadingIcon', value: false},
                {key: 'imgErr', value: false}
            ])
        })

    }

    // 图片加载错误
    function imgloadErr() {
        if(state.otherIcon == '') {
            state.imgErr = true
        } else {
            store.commit('changeUrlInfo', [
                {key: 'icon', value: state.otherIcon},
                {key: 'otherIcon', value: ''}
            ])
        }
    }

    return {
        state,
        showNewUrlAlert,
        showEditUrlAlert,
        closeUrlAlert,
        confirm,
        inputUrl,
        inputName,
        getUrlIcon,
        getUrlName,
        imgloadErr,
    }
}

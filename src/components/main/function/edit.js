// url框的拖拽排列

import { ref } from 'vue'
import { exchangeElements, debounce } from '@/utils/utils'
import store from '@/store/index'
//变量

let elementNodeDragged = null,     // 被移动的地址框元素
    elementNodeLocated = null,     // 移入的地址框元素
    editWhich = ref(-1)            // 记录正在编辑的tab索引

export default function editFunction($message, $confirm) {

        // 控制编辑状态
        function handleEdit(id) {
            if(id != editWhich.value) {
                editWhich.value = id
            } else {
                editWhich.value = -1
            }     
        }

        // 删除标签以及标签下的所有网址
        function deleteTab(id) {
            $confirm({
                content: '确定删除该标签以及该标签下所有网址吗？'
            })
            .then(() => {
                store.commit('remove', id)
                $message({
                    type: 'success',
                    content: '标签页及子网址删除成功'
                })
            })
            .catch(() => {})
        }

        // 删除某个网址
        function deleteUrl(id) {
            $confirm({
                content: '确定删除该网址吗？'
            })
            .then(() => {
                store.commit('remove', id)
                $message({
                    type: 'success',
                    content: '网址删除成功'
                })
            })
            .catch(() => {})      
        }

        // 地址框开始拖拽
        function urlBoxDragStart(e) {
            const el = e.target
            if(el.nodeName !== 'LI') return;
            // 记录当前被拖拽地址框元素
            elementNodeDragged = el    
            // 将被拖拽对象隐藏
            el.style.display = 'fixed'
            el.style.opacity = 0
        }

        // 拖拽后更新Vuex中的正确排序
        let dragEndToUpdate = debounce(function() {
            // 获取当前正在编辑标签中所有url的排序
            const result = []
            const children = elementNodeLocated.parentNode.children
            let length = children.length
            for(let i = 0; i < length - 1; i++) {
                result.push(children[i].getAttribute('data-id'))
            }
            store.commit('dragEndToUpdate', {tabId: editWhich.value, result}) 
        }, 500)

        // 地址框拖拽结束
        function urlBoxDragEnd(e) {
            let el = e.target
            el.style.display = 'inline-block'
            el.style.opacity = 1
            dragEndToUpdate()
        }

        // 被拖动的地址框触碰到其它的地址框
        function urlBoxEnter(e, tabId) {
            if(tabId != editWhich.value) return;
            let el = e.target
            while(el.nodeName !== 'LI') el = el.parentNode;          // 若子元素触发dragenter事件，则查找到父元素li标签
            if(el === elementNodeDragged) return;                    // 避免自己拖拽进入自己的情况
            if(elementNodeLocated !== el) elementNodeLocated = el    // 记录被移入的地址框元素
            exchangeElements(elementNodeDragged, el)                 //  地址框位置互换
        }

    return {
        editWhich,
        handleEdit,
        deleteTab,
        deleteUrl,
        urlBoxDragStart,
        urlBoxDragEnd,
        urlBoxEnter,
    }
}

// 添加标签弹框

import { useStore } from 'vuex'

export default function AddTabFunction() {

    const store = useStore()

    // 展示弹框
    function showAddTab() {
        store.commit('changeTabInfo', [
            {key: 'isShowAddTabAlert', value: true},
            {key: 'alertType', value: '新增标签'}
        ])
    }

    // 关闭弹窗，并清除弹窗里的所有内容
    function closeAddTab() {
        store.commit('changeTabInfo', [
            {key: 'tagName', value: ''},
            {key: 'trueIcon', value: 'plus'},
            {key: 'currentIcon', value: ''},
            {key: 'isSelected', value: false},
            {key: 'isShowIconList', value: false},
            {key: 'isShowAddTabAlert', value: false},
        ])
    }

    return {
        showAddTab,
        closeAddTab
    }
}

// 控制添加标签弹框的展示

import {useStore} from 'vuex'

export default function handleAddTabAlert() {
    const store = useStore()

    // 展示弹框
    function addTabShow() {
        store.commit('changeTabInfo', [
            {key: 'isShowAddTabAlert', value: true},
            {key: 'alertType', value: '新增标签'}
        ])
    }

    return {
        addTabShow,
    }
}
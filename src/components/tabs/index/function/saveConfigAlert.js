// 控制保存配置弹框的展示

import { ref } from 'vue'

export default function handleSaveConfigAlert() {
    const isShowSaveAlert = ref(false)    // 保存配置弹框是否展示

    // 展示
    function controlSaveConfigAlert(value) {
        isShowSaveAlert.value = value
    } 

    return {
        isShowSaveAlert,
        controlSaveConfigAlert,
    }
}
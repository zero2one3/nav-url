// 控制 “导入配置弹框” 的展示

import { ref } from 'vue'

export default function handleImportConfigAlert() {
    const isShowImportAlert = ref(false)   // 导入配置弹框是否展示

    function controlImportConfigAlert(value) {
        isShowImportAlert.value = value
    }

    return {
        isShowImportAlert,
        controlImportConfigAlert,
    }
}
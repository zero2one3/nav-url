/* 保存配置 */

import { ref } from 'vue'

// 变量
const isShowSaveAlert = ref(false)    // 保存配置弹框是否展示

export default function saveConfigFunction() {

    // 控制保存配置弹框的展示
    function handleSaveConfigAlert(value) {
        isShowSaveAlert.value = value
    } 

    // 封装的下载数据函数
    function downLoadFile(fileName, content) {
        var aTag = document.createElement('a');
        var blob = new Blob([content]);
        aTag.download = fileName;
        aTag.href = URL.createObjectURL(blob);
        aTag.click();
        URL.revokeObjectURL(blob);
    }

    // 调用下载接口
    function saveConfig() {
        downLoadFile('nav.config.json', window.localStorage.navInfos)
    }

    return {
        isShowSaveAlert,
        handleSaveConfigAlert,
        saveConfig,
    }
}
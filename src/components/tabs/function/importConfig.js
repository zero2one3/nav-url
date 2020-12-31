// 导入配置功能

import { ref } from 'vue'

const isShowImportAlert = ref(false),   // 导入配置弹框是否展示
      result = ref('none'),             // 导入的结果
      isUpload = ref(false),            // 判断是否上传配置文件
      isImport = ref(false),            // 判断配置是否导入成功
      isLoading = ref(false),           // 判断按钮是否处于加载状态
      inputFile = ref(null),            // 获取文件元素
      hasFile = ref(0)                  // 判断文件的传入情况。0：未传入  1: 格式错误  2：格式正确
      

export default function importConfigFunction($message) {
  
    // 控制弹框的展示
    function handleImportConfigAlert(value) {
        isShowImportAlert.value = value
        if(!value) hasFile.value = 0
    }

    // 上传的文件内容发生改变
    function fileChange(e) {
        let files = e.target.files
        if(files.length === 0) {
            $message({
            type: 'warning',
            content: '请先上传配置文件'
            })
        }
        else {
            let targetFile = files[0]
            if(!/\.json$/.test(targetFile.name)) {
                hasFile.value = 1
                $message({
                    type: 'warning',
                    content: '请确认文件格式是否正确'
                })
            } else {
            hasFile.value = 2
                $message({
                    type: 'success',
                    content: '文件格式正确'
                })
            }
        }
    }

    // 导入配置
    function importConfig() {
        let reader = new FileReader()
        let files = inputFile.value.files
        if(hasFile.value == 0) {
          $message({
            type: 'warning',
            content: '请先上传配置文件'
          })
        }
        else if(hasFile.value == 1) {
          $message({
            type: 'warning',
            content: '请上传正确格式的文件，例如xx.json'
          })
        }
        else if(hasFile.value == 2) {
          reader.readAsText(files[0])
          reader.onload = function() {
            let data = this.result
            window.localStorage.navInfos = data
            location.reload()
          }
        }
    }

    return {
        isShowImportAlert,
        result,
        isUpload,
        isImport,
        isLoading,
        inputFile,
        hasFile,
        handleImportConfigAlert,
        fileChange,
        importConfig,
    }
}

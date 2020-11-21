// 存储用户的添加标签情况
const moduleTab = {
    state: {
        tagName: '',            // 标签名称
        trueIcon : 'plus',      // 真正选好了的icon
        currentIcon: '',        // 当前用户选择了的icon,但未确认
        isSelected: false,      // 用户是否选择了
        isShowIconList: false,  // icon列表是否展示
        isShowAddTabAlert: false, // 添加标签弹框是否显示
        id: '',
        alertType: '新增标签'
    },
    mutations: {
        // 修改增加标签弹框内的信息
        changeTabInfo(state, payload) {
            let key, value, current
            if(Array.isArray(payload)) {
                let length = payload.length
                for(let i = 0; i < length; i++) {
                    current = payload[i]
                    key = current.key
                    value = current.value
                    state[key] = value
                }
            } else {
                key = payload.key
                value = payload.value
                state[key] = value
            }

            
        }
    }
}

export default moduleTab

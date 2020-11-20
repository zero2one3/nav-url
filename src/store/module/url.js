// 存储用户的添加URL情况
const moduleUrl = {
    state: {
        url: '',            // URL地址
        icon: '',           // URL图标
        otherIcon: '',      // 网址的默认icon地址
        isShow: false,      // 是否显示
        isLoadingIcon: false,  // 是否正在获取Icon
        isLoadingName: false,  // 是否正在获取Name
        name: '',           // 网址名称
        imgErr: false,      // 图片是否显示异常
        whichTag: -1,       // 添加到哪个标签中去
        id: -1,             // 记录id
        alertType: '新增网址'
    },
    mutations: {
        // 修改增加URL弹框内的信息
        changeUrlInfo(state, payload) {
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

export default moduleUrl

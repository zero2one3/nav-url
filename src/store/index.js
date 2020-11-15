import Vuex from '../../node_modules/vuex/dist/vuex.cjs'
import {updateLocal} from '../utils/utils'

// 存储用户的添加标签情况
const moduleAddTab = {
    state: {
        tagName: '',            // 标签名称
        trueIcon : 'plus',      // 真正选好了的icon
        currentIcon: '',        // 当前用户选择了的icon,但未确认
        isSelected: false,      // 用户是否选择了
        isShowIconList: false,  // icon列表是否展示
        isShowAddTabAlert: false, // 添加标签弹框是否显示
        id: ''
    },
    mutations: {
        // 修改增加标签弹框内的信息
        changeAddTabInfo(state, payload) {
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

// 存储用户的添加URL情况
const moduleAddUrl = {
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
        changeAddUrlInfo(state, payload) {
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

const moduleEdit = {
    state: {
        isEditwhich: -1,    // 正在编辑哪块内容
    },
    mutations: {
        changeEditInfo(state, payload) {
            state.isEditwhich = payload
        }
    }
}

const store = Vuex.createStore({
    state: {

    },
    mutations: {
        // 更新
        update(state, payload) {
            let {key, value} = payload
            // 更新网页标题
            if(key === 'navName') state.navName = value;
            // 更新标签或URL
            else if(key === 'catalogue') {
                const catalogue = state.catalogue
                let length1 = catalogue.length
                for(let i = 0; i < length1; i++) {
                    let current = catalogue[i]
                    if(current.id == value.id.split('.')[0]) {
                        // 修改的是标签信息
                        if(current.id == value.id) {
                            current.name = value.name
                            current.icon = value.icon
                            updateLocal(store)
                        } else {
                            let URLS = current.URLS
                            let length2 = URLS.length
                            for(let j = 0; j < length2; j++) {
                                let URL = URLS[j]
                                if(URL.id == value.id) {
                                    URL.url = value.url
                                    URL.icon = value.icon
                                    URL.name = value.name
                                    updateLocal(store)
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }
            }
        },
        // 移除(根据id来移除)
        remove(state, payload) {
            // 需要判断是删除标签还是删除一个网址
            const catalogue = state.catalogue
            let length1 = catalogue.length
            let iid = payload.split('.')
            for(let i = 0; i < length1; i++) {
                let current = catalogue[i]
                if(current.id === iid[0]) {
                    // 删除标签已经标签内的所有网址
                    if(iid.length === 1) {
                        catalogue.splice(i, 1)
                        updateLocal(store)
                        break;
                    } 
                    // 删除标签内的某个网址
                    else {
                        let URLS = current.URLS
                        let length2 = URLS.length
                        for(let j = 0; j < length2; j++) {
                            let URL = URLS[j]
                            if(URL.id === payload) {
                                URLS.splice(j, 1)
                                updateLocal(store)
                                break;
                            }
                        }
                    }
                }
            }
        },
        // 添加
        add(state, payload) {
            let {key, value} = payload
            const catalogue = state.catalogue
            let length1 = catalogue.length
            // 添加标签
            if(key == '1') {
                let _id = length1 == 0 ? '1' : (+catalogue[length1 - 1].id + 1).toString()
                catalogue.push({
                    id: _id,
                    name: value.name,
                    icon: value.icon,
                    URLS: []
                })
                updateLocal(store)
            } 
            // 添加网址
            else if(key == '2') {
                let id = value.whichTag
                for(let i = 0; i < length1; i++) {
                    let current = catalogue[i]
                    if(current.id == id) {
                        let URLS = current.URLS
                        let length2 = URLS.length
                        let trueId;
                        // 判断原来是否有其他URL
                        if(length2 === 0) {
                            trueId = `${id}.1`
                        } else {
                            let lastId = URLS[length2 - 1].id.split('.')
                            lastId[1] = (+lastId[1] + 1).toString()
                            trueId = lastId.join('.')
                        }
                        URLS.push({
                            id: trueId,
                            url: value.url,
                            icon: value.icon,
                            name: value.name
                        })
                        updateLocal(store)
                        break;
                    }    
                }
            }
        }
    },
    modules: {
        moduleAddTab,
        moduleAddUrl,
        moduleEdit
    }
})

export default store

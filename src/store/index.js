import Vuex from '../../node_modules/vuex/dist/vuex.cjs'
import { updateLocal } from '@/utils/utils'
import moduleTab from './module/tab'
import moduleUrl from './module/url'
import moduleSearch from './module/search'

const store = Vuex.createStore({
    state: {
        navName: 'Quick Url',
        catalogue: [
            {id:'1' , name: "常用网站", icon: "align-justify", URLS: [
                {id:'1.1' , url: 'https://github.com/Lpyexplore/nav-url', icon: 'https://github.com/fluidicon.png', name: 'github'},
                {id:'1.2' , url: 'https://juejin.cn/post/6897030228867022856', icon: 'https://b-gold-cdn.xitu.io/favicons/v2/favicon-32x32.png', name: 'Vue3 API教程'},
            ]}
        ]
    },
    getters: {
        // 判断标签是否显示
        judgeTabIsShow: (state) => (i) => {
            const searchWord = state.moduleSearch.searchWord
            const URLS = state.catalogue[i]['URLS']
            let length = URLS.length
            for(let j = 0; j < length; j++) {
                if(searchWord == '') return false;
                else if(URLS[j].name.toLowerCase().indexOf(searchWord.toLowerCase()) !== -1) return true;
            }
            return false
        },
        // 判断url是否显示
        judgeUrlIsShow: (state) => (i, j) => {
            const searchWord = state.moduleSearch.searchWord
            const url = state.catalogue[i]['URLS'][j]
            if(searchWord == '') return false;
            let matchResult = url.name.toLowerCase().indexOf(searchWord.toLowerCase())
            if(matchResult !== -1) return true;
            return false;
        },
    },
    mutations: {
        // 初始化
        init(state, payload) {
            let { navName, catalogue } = payload
            state.navName = navName
            state.catalogue = catalogue
        },
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
                        } 
                        else {
                            let max = 0
                            URLS.forEach(v => {      
                                let currentId = +v.id.split('.')[1]                       
                                max = currentId > max ? currentId : max
                            })
                            trueId = `${id}.${max + 1}`
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
        },
        // 拖拽结束后，更新对应标签内地址框的位置变动
        dragEndToUpdate(state, payload) {
            let { tabId, result } = payload
            const catalogue = state.catalogue
            let length = catalogue.length
            for(let i = 0; i < length; i++) {
                if(catalogue[i].id != tabId) continue;
                const URLS = catalogue[i].URLS
                const newURLS = new Array(URLS.length)
                URLS.forEach(v => {
                    newURLS[result.indexOf(v.id)] = v
                })
                catalogue[i].URLS = newURLS
                break;
            }
            updateLocal(store)
        }
    },
    modules: {
        moduleTab,
        moduleUrl,
        moduleSearch
    }
})

export default store

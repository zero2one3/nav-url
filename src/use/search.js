// 搜索功能
import {  } from 'vue'
import store from '@/store/index'

// 变量
const moduleSearch = store.state.moduleSearch     // 搜索相关的全局状态

export default function searchFunction() {

    // 搜索框的输入改变
    function inputSearchContent(value) {
        store.commit('changeSearchWord', value)
    }

    // 控制搜索框的展示
    function handleSearchBox() {
        if(moduleSearch.isSearch) {
            store.commit('changeIsSearch', false)
            store.commit('changeSearchWord', '')
        } else {
            store.commit('changeIsSearch', true)
        }         
    }

    // 判断标签是否显示
    function judgeTabIsShow(i) {
        return store.getters.judgeTabIsShow(i)
    }

    // 判断url是否显示
    function judgeUrlIsShow(i, j) {
        return store.getters.judgeUrlIsShow(i, j)
    }

    return {
        moduleSearch,
        inputSearchContent,
        handleSearchBox,
        judgeTabIsShow,
        judgeUrlIsShow,
    }
}

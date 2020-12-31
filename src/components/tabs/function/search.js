// 控制 "搜索框" 的展示

import { useStore } from 'vuex'

// 变量
const store = useStore()

export default function searchFunction() {

    // 控制搜索框的展示
    function handleSearchBox() {
        if(store.state.moduleSearch.isSearch) {
            store.commit('changeIsSearch', false)
            store.commit('changeSearchWord', '')
        } else {
            store.commit('changeIsSearch', true)
        }         
    }

    return {
        handleSearchBox,
    }
}

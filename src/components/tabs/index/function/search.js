// 控制 "搜索框" 的展示

import { useStore } from 'vuex'

export default function handleSearchBox() {
    const store = useStore()

    function controlSearchBox() {
        if(store.state.moduleSearch.isSearch) {
            store.commit('changeIsSearch', false)
            store.commit('changeSearchWord', '')
        } else {
            store.commit('changeIsSearch', true)
        }         
    }

    return {
        controlSearchBox,
    }
}

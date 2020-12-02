<template>
  <div :class="[
            'search-container', 
            'animate__animated', 
            {'animate__bounceInDown': moduleSearch.isSearch}, 
            {'animate__fadeOutUpBig': !moduleSearch.isSearch}]"
        >
        <lp-input class="search-input" 
                  placeholder="输入搜索关键词"
                  :value="moduleSearch.searchWord"
                  @_input="input"/>
        <div class="close-search">
            <span class="close-search-txt" @click="closeSearch">关闭</span>
        </div>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {reactive} from 'vue'
import lpInput from '../../public/lp-input/lp-input'
export default {
    components: {
        lpInput
    },
    setup() {
        const store = useStore()
        const moduleSearch = store.state.moduleSearch

        function input(value) {
            store.commit('changeSearchWord', value)
        }

        function closeSearch() {
            store.commit('changeIsSearch', false)
            store.commit('changeSearchWord', '')
        }

        return {store, moduleSearch, input, closeSearch}
    }
}
</script>

<style scoped>
.search-container{
    position: absolute;
    bottom: -65px;
    left: 50%;
    width: 350px;
    height: 50px;
    line-height: 0;
    transform: translate(-50%, 0);
    z-index: 998;
}
.search-input{
    margin: 0;
    width: 300px;
    display: inline-block;
}
.close-search{
    display: inline-block;
    height: 50px;
    width: 50px;
    text-align: right;
    line-height: 50px;
    color: rgb(194, 184, 184);
}
.close-search-txt{
    cursor: pointer;
}
</style>
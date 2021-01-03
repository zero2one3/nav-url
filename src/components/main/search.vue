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
                  @_input="inputSearchContent"/>
        <div class="close-search">
            <span class="close-search-txt" @click="handleSearchBox">关闭</span>
        </div>
  </div>
</template>

<script>
/* 组件 */
import lpInput from '@/components/public/lp-input/lp-input'
/* 功能模块 */
import searchFunction from '@/use/search'
export default {
    components: {
        lpInput
    },
    setup() {

        let { moduleSearch, inputSearchContent, handleSearchBox } = searchFunction()

        return { moduleSearch, inputSearchContent, handleSearchBox }
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
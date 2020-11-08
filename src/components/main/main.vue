<template>
  <div id="content-container">
      <div id="notice">
          <i class="fas fa-bell"></i>
      </div>
      <div id="content">
          <div v-for="(tab, i) in catalogue" :key="i">
              <div :id="tab.id" class="tab-title">
                  <i :class="['fas', `fa-${tab.icon}`, 'tab-icon']"/>
                  <span class="tab-name">{{tab.name}}</span>
              </div>
              <ul class="url-boxes">
                  <li v-for="(urls, j) in tab.URLS" :key="j" class="each-url-box">
                      <a :href="urls.url" target="_blank" class="url-link">
                          <div class="round-box">
                              <img :src="urls.icon" alt="" class="url-icon" v-if="urls.icon != null">
                              <svg v-else t="1604809784875" class="icon url-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2514" width="80%" height="80%"><path d="M511.58 513.75m-415.89 0a415.89 415.89 0 1 0 831.78 0 415.89 415.89 0 1 0-831.78 0Z" fill="#353F51" p-id="2515"></path><path d="M511.58 173.48c187.63 0 340.27 152.64 340.27 340.27S699.21 854.02 511.58 854.02 171.31 701.38 171.31 513.75s152.65-340.27 340.27-340.27m0-75.61C281.9 97.87 95.7 284.07 95.7 513.75s186.2 415.89 415.89 415.89 415.89-186.2 415.89-415.89S741.27 97.87 511.58 97.87z" fill="#70798B" p-id="2516"></path><path d="M511.58 173.48c52.68 0 132.33 135.71 132.33 340.27s-79.65 340.27-132.33 340.27-132.32-135.71-132.32-340.27 79.64-340.27 132.32-340.27m0-75.61c-114.84 0-207.94 186.2-207.94 415.89s93.1 415.89 207.94 415.89 207.94-186.2 207.94-415.89S626.43 97.87 511.58 97.87z" fill="#70798B" p-id="2517"></path><path d="M133.51 362.52h756.16v75.62H133.51zM133.51 589.37h756.16v75.62H133.51z" fill="#70798B" p-id="2518"></path></svg>  
                          </div>
                          <span class="url-name">{{ urls.name }}</span>
                      </a>
                  </li>
                  <li class="each-url-box add-more" @click="addMoreUrl(tab.id)">
                      <i class="fas fa-plus"/>
                  </li>
              </ul>
              <addUrlAlert v-show="state.isShow"></addUrlAlert>
          </div>
      </div>
  </div>
</template>

<script>
import {reactive} from 'vue'
import {useStore} from 'vuex'
import {updateLocal} from '../../utils/utils'
import addUrlAlert from './childCpn/addUrlAlert'
export default {
    components: {
        addUrlAlert
    },
    setup() {
        const store = useStore()
        const catalogue = reactive(store.state.catalogue)
        const state = reactive(store.state.moduleAddUrl)

        function addMoreUrl(id) {
            store.commit('changeAddUrlInfo', [
                {key: 'isShow', value: true},
                {key: 'whichTag', value: id}
            ])
        }

        return {catalogue, addMoreUrl, state}
    }
}
</script>

<style scoped>
#content-container{
    display: block;
    margin-left: 250px;
    height: 100vh;
    background-color: rgb(249, 249, 249);
}
#notice{
    background-color: white;
    height: 80px;
    box-shadow: 1px 1px 5px #eee;
    line-height: 80px;
}
.fa-bell{
    color: rgb(240, 179, 12);
    margin-left: 20px;
}
#content{
    height: calc(100% - 80px);
    overflow: auto;
}
.tab-title{
    height: 60px;
    line-height: 60px;
    color: #837c7c;
}
.tab-icon{
    margin: 0 10px 0 30px;
}
.url-boxes{
    display: inline-block;
}
.each-url-box{
    display: inline-block;
    height: 150px;
    width: 200px;
    background-color: white;
    box-shadow: 0 0 3px 3px  rgba(225, 225, 225, .1);
    cursor: pointer;
    overflow: hidden;
    float: left;
    border-radius: 10px;
    margin: 15px 0 15px 30px;
}
.each-url-box:hover{
    transform: translate(0, -5px);
    transition: all .3s ease;
    box-shadow: 0 0 3px 3px  rgba(225, 225, 225, .3);
}
.url-link{
    height: 100%;
    width: 100%;
}
.round-box{
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.url-icon{
    display: block;
    border-radius: 50%;
    overflow: hidden;
    height: 60%;
}
.url-name{
    display: block;
    height: 26.5%;
    text-align: center;
    color: #666;
    overflow: hidden;
}
.add-more{
    text-align: center;
    line-height: 150px;
    color: #e1e1e1;
    font-size: 1.5em;
}
</style>
<template>
  <div class="carousel-container">
    <span>对于本站有更好的</span>
    <strong class="red"> 建议 </strong>
    <span>或</span>
    <strong class="red"> 问题反馈 </strong>
    <span>请联系VX：</span>
    <strong class="orange popover" v-popover='wxPopoverDate'>Lpyexplore333</strong>
    <span>，项目源码地址：</span>
    <a href="https://github.com/Lpyexplore/nav-url" target="_blank">项目源码链接</a>
  </div>
</template>

<script>
import {reactive} from 'vue'
export default {
  setup() {
    const wxPopoverDate = reactive({
        title: '个人微信号',
        content: `<img src="${require('@/assets/img/myWx.png')}" style='width: 130px; height: 130px'></img>`
    })

    return { wxPopoverDate }
  }
}
</script>

<style scoped>
.carousel-container{
  position: absolute;
  width: calc(100% - 94px);
  height: 100%;
  top: 0;
  left: 60px;
  overflow: hidden;
  word-break: break-all;
}
.orange{
  color: rgb(202, 163, 32);
}
.red{
  color: rgb(204, 62, 27);
}
.popover{
  cursor: pointer;
}
</style>
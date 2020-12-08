<template>
  <div ref="popover"
       :class="['lp-popover-container', position]"
       :style="{
           'top': `${top}px`,
           'left': `${left}px`,

        }">
      <div class="container-proxy">
          <div class="lp-popover-title" v-html="title"></div>
          <div class="lp-popover-content" v-html="content"></div>
      </div> 
  </div>
</template>

<script>
import {ref, onMounted, reactive, toRefs} from 'vue'
export default {
    props: {
        title: {   
            type: String,
            default: '我是标题'
        },
        content: {
            type: String,
            default: '我是一段内容'
        },
        position: {
            type: String,
            default: 'bottom'
        },
        type: {    // 触发方式, hover | click
            type: String,
            default: 'hover'
        }
    },
    setup({ position, type }) {
        const popover = ref(null)
        const site = reactive({
            top: 0,
            left: 0,
        })

        onMounted(() => {
            const el = popover.value
            let { top, left, height: pHeight, widht: pWidth } = el.parentNode.getBoundingClientRect()  // 获取目标元素的页面位置信息与尺寸大小
            let { height: cHeight, width: cWidth } = el.getBoundingClientRect()  // 获取气泡框的宽高
            // 设置气泡框的位置
            switch(position) {
                case 'top': 
                    site['left'] = left
                    site['top'] = top - cHeight - 25
                    break;
                case 'bottom':
                    site['left'] = left
                    site['top'] = top + pHeight + 25
                    break;
                case 'left':
                    site['top'] = top
                    site['left'] = left - cWidth - 25 
                    break;
                case 'right':
                    site['top'] = top
                    site['left'] = left + pWidth + 25
                    break;            
            }

            // 为气泡框设置触发方式
            switch(type) {
                case 'hover':
                    el.parentNode.addEventListener('mouseover', function() {
                        el.style.visibility = 'visible'
                        el.style.opacity = '1'
                    })
                    el.parentNode.addEventListener('mouseout', function() {
                        el.style.visibility = 'hidden'
                        el.style.opacity = '0'
                    })
                    break;
                case 'click':
                    el.parentNode.addEventListener('click', function() {
                        if(el.style.visibility == 'hidden' || el.style.visibility == '') {
                            el.style.visibility = 'visible'
                            el.style.opacity = '1'
                        } else {
                            el.style.visibility = 'hidden'
                            el.style.opacity = '2'
                        }
                    })
                    break;
            }
            
            
        })

        return {
            ...toRefs(site),
            popover
        }
    }
}
</script>

<style scoped>
.lp-popover-container{
    position: fixed;
    color: black;
    font-weight: normal;
    background: white;
    max-width: 220px;
    max-height: 200px;
    border-radius: 7px;
    box-shadow: 0 0 2px 3px rgba(206, 202, 202, 0.1);
    z-index: 990;
    opacity: 0;
    visibility: hidden;
    transition: all .2s ease;
}
.container-proxy{
    height: 100%;
    position: relative;
}
.lp-popover-container::after{
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent white transparent;
}
.lp-popover-container.bottom::after{
    top: -20px;
    left: 30px;
}
.lp-popover-container.top::after{
    bottom: -20px;
    right: 30px;
    border-color: white transparent transparent transparent;
}
.lp-popover-container.left::after{
    right: -20px;
    top: 20px;
    border-color: transparent transparent transparent white;
}
.lp-popover-container.right::after{
    left: -20px;
    top: 20px;
    border-color: transparent white transparent transparent;
}

.lp-popover-title{
    height: 50px;
    line-height: 50px;
    text-indent: 20px;
    font-weight: 400;
    font-size: 16px;
    text-align: left;
}
.lp-popover-content{
    max-height: 150px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px 10px 15px 15px;
    overflow: hidden;
    color: rgb(136, 124, 124);
    display: inline-block;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 1px;
}
</style>
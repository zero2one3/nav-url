import lp_alert from "./lp-alert.vue"
import { defineComponent, createVNode, render, isVNode } from 'vue'

let MessageConstructor = defineComponent(lp_alert)
let instance;
const instances = []

export default function (Vue) {

    const alert_info = (options) => {

        let option = options || {}
        if(!Object.prototype.toString.call(option) === '[object Object]') {
            console.error('Please enter an object as a parameter')
            return;
        }

        instance = createVNode(
            MessageConstructor,
            option
        )

        //挂载
        const container = document.createElement('div')
        render(instance, container)

        document.querySelector('#app').appendChild(instance.el)

        const cpn = instance.component
        const props = cpn.props  
        props.seed = instances.length
        // 初始化参数
        Object.keys(option).forEach(key => {
            props[key] = options[key]
        })

        // 加入到instances中管理
        instances.push(instance)
        
        // 消息框出现
        setTimeout(() => {
            props.isShow = true
            props.isEnter = true
        }, 200)
        
        // 消息框离开
        setTimeout(() => {
            props.isEnter = false
            props.isShow = false
            props.isLeave = true
        }, props.lastTime)

        // 移除消息框
        setTimeout(() => {
            close(cpn.$el)
        }, props.lastTime + 200)
        
    }
    

    // 关闭某个弹框
    const close = (e) => {
        instances.shift()
        instances.forEach((v) => {
            v.component.props.seed -= 1
        })
        document.querySelector('#app').removeChild(e)
    }

    Vue.$alert = alert_info
}

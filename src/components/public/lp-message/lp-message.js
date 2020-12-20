import lp_message from "./lp-message.vue"
import { defineComponent, createVNode, render } from 'vue'

let MessageConstructor = defineComponent(lp_message)
let instance;
const instances = []

export const createMessage = (options) => {

    if(!Object.prototype.toString.call(options) === '[object Object]') {
        console.error('Please enter an object as a parameter')
    }

    options = options ? options : {}

    instance = createVNode(
        MessageConstructor,
        options
    )

    //挂载
    const container = document.createElement('div')
    render(instance, container)

    // document.querySelector('#app').appendChild(instance.el)

    const cpn = instance.component
    const props = cpn.props  
    props.seed = instances.length
    
    // 初始化参数
    Object.keys(options).forEach(key => {
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
        close(props)
    }, props.lastTime + 200)
    
}

// 关闭某个弹框
const close = (props) => {
    instances.shift()
    instances.forEach((v) => {
        v.component.props.seed -= 1
    })
    props.isDestory = true
}

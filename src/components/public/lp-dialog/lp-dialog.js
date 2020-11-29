import lp_dialog from './lp-dialog.vue'
import {defineComponent, createVNode, render, toRef, watch} from 'vue'


const confirmConstructor = defineComponent(lp_dialog)

export const createDialog = (options) => {
    if(!Object.prototype.toString.call(options) === '[Object Object]') {
        console.error('Please enter an object as a parameter');
    }

    options = options ? options : {}

    const instance = createVNode(
        confirmConstructor,
        options
    )

    const container = document.createElement('div')
    render(instance, container)
    document.querySelector('#app').appendChild(instance.el)

    const props = instance.component.props
    Object.keys(options).forEach(key => {
        props[key] = options[key]
    })
    const status = toRef(instance.component.setupState, 'status')

    return new Promise((resolve, reject) => {
        watch(status, (now) => {
            if(now == 0) reject();
            else if(now == 1) resolve()
        })
    })
    
}

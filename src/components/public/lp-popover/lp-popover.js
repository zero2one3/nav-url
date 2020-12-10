import lpPopover from './lp-popover.vue'
import {defineComponent, createVNode, render, toRaw} from 'vue'

const popoverConstructor = defineComponent(lpPopover)

export default function createPopover(app) {
    app.directive('popover', {
        mounted (el, binding) {
            let { value } = binding

            let options = toRaw(value)
            
            if(!Object.prototype.toString.call(options) === '[Object Object]') {
                console.error('Please enter an object as a parameter');
            }
        
            options = options ? options : {}
        
            const popoverInstance = createVNode(
                popoverConstructor,
                options
            )
            const container = document.createElement('div')
            render(popoverInstance, container)
            el.appendChild(popoverInstance.el)
            const props = popoverInstance.component.props
            Object.keys(options).forEach(v => {
                props[v] = options[v]
            })
            
            el.style.position = 'relative'
            
        }
    })  
}
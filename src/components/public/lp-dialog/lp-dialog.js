import lp_dialog from './lp-dialog.vue'
import {createVNode, render, toRef, watch} from 'vue'

export const createDialog = (options) => {
    if(Object.prototype.toString.call(options) !== '[object Object]') {
        console.error('Please enter an object as a parameter');
    }

    options = options ? options : {}

    const instance = createVNode(
        lp_dialog,
        options
    )

    const container = document.createElement('div')
    render(instance, container)

    const status = toRef(instance.component.setupState, 'status')

    return new Promise((resolve, reject) => {
        watch(status, (now) => {
            if(now == 0) reject();
            else if(now == 1) resolve()
        })
    })
    
}

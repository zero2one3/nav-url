import { createVNode, render } from 'vue' 
import HelloWorld from '../.././helloWorld'
import { expect } from 'chai'

describe('hello world', () => {
    it('传递属性后能否正常显示', () => {
        let root = document.createElement('div')
        let VNode = createVNode(HelloWorld, {msg: 'hello'})
        render(VNode, root)
        expect(root.querySelector('div').innerHTML).to.be.equal('hello')
    })
})
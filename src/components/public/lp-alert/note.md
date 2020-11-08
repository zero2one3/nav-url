# lp-alert 组件  √

属性参数     | 可选值
-------- | ----- 
type | info(默认)/success/warning/err
lastTime  | 2500(默认)
content | 这是一条消息提示

this.$alert({
    type: 'info',
    lastTime: 2500,
    content: '这是一条消息提示'
})
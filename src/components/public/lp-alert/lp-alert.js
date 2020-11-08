import lp_alert from "./lp-alert.vue"

export default function (Vue) {

    const alert_info = function (options) {
        let Alert = Vue.extend(lp_alert)
        let alert = new Alert()
        let option = options || {}
        if(!Object.prototype.toString.call(option) === '[object Object]') {
            console.error('Please enter an object as a parameter')
            return;
        }
        let {type = 'info', lastTime = 2500, content = '这是一条提示消息'} = option
        alert.type = type
        alert.lastTime = lastTime
        alert.content = content
        //挂载
        alert.$mount()
        document.getElementById('app').appendChild(alert.$el)
    }

    Vue.prototype.$alert = alert_info
}
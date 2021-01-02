// 在页面初次加载时，做一些初始化的操作
import { writeToVuex } from '@/utils/utils'
import store from '@/store/index'

export default function init() {
    // 判断用户是否时第一次进入该网页
    if(window.localStorage.isSet === 'true') {
        writeToVuex(store, JSON.parse(window.localStorage.navInfos))
    } 
    // 自动设置默认信息
    else {
        let obj = {
        navName: "Nav Url",
        catalogue : [
            {id:'1' , name: "常用网站", icon: "align-justify", URLS: [
              {id:'1.1' , url: 'http://www.baidu.com', icon: 'http://www.baidu.com/favicon.ico', name: '百度'},
              {id:'1.3', url: 'https://juejin.im/', icon: 'https://b-gold-cdn.xitu.io/favicons/v2/favicon.ico', name: '掘金'},
              {id:'1.4', url: 'https://gitee.com/', icon: 'https://gitee.com/assets/favicon.ico', name: '码云'},
            ]},
            {id:'2' , name: "实用工具", icon: "bookmark", URLS: []},
            {id:'3' , name: "娱乐影视", icon: "blog", URLS: []}
        ]
        }
        window.localStorage.navInfos = JSON.stringify(obj)
        window.localStorage.isSet = 'true'
        writeToVuex(store, obj)
    }

    
}

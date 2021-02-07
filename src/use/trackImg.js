// 一些处理图片的方法
import { throttle } from '@/utils/utils'

export default function trackImgFunction() {

    // 处理无icon或icon加载失败的图片，令其使用默认svg图标
    function imgLoadErr(e) {
        let el = e.target
        el.style.display = 'none'
        el.nextSibling.style.display = 'inline-block'
    }

    // 图片加载成功后的处理
    function imgLoadSuccess(e) {
        let el = e.target
        el.style.display = 'inline-block'
        el.nextSibling.style.display = 'none'
    }

    return {
        imgLoadErr,
        imgLoadSuccess
    }
}

export function lazyLoad(Vue) {
    Vue.directive('lazyLoad', {
        mounted (el) {
            const imgs = el.querySelectorAll('.url-icon')
            let len = imgs.length
            const map = new WeakMap()

            let load = () => {
                let { clientHeight } = el
                for(let i = 0; i < len; i ++) {
                    let img = imgs[i]
                    if(Object.keys(map).length === len) {
                        // 移除scroll
                        el.removeEventListener('scroll')
                        break;
                    }
                    if(map.get(img)) continue;
                    if(img.getBoundingClientRect().top <= clientHeight) {
                        img.src = img.getAttribute('data-src');
                        map.set(img, 1)
                    }
                }
            }
            load()   // 优先执行一次
            el.addEventListener('scroll', throttle(load, 500))
        }
    })
}
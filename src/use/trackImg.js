// 一些处理图片的方法
import { ref } from 'vue'

// 缓存图片懒加载的节点
const map = new WeakMap()
const scrollContent = ref(null)

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

    function lazyLoad() {
        const el = scrollContent.value
        const imgs = el.querySelectorAll('.url-icon')
        let len = imgs.length
        console.log(len);
        let { clientHeight } = el
        for(let i = 0; i < len; i ++) {
            let img = imgs[i]
            if(map.has(img)) continue;
            if(img.getBoundingClientRect().top <= clientHeight) {
                img.src = img.getAttribute('data-src');
                map.set(img, 1)
            }
        }
    }

    return {
        imgLoadErr,
        imgLoadSuccess,
        lazyLoad,
        scrollContent
    }
}

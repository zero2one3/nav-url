// 一些基础公用的方法

export default function baseFunction() {

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

    // 点击标签，在主内容页面滑动到对应的标签位置
    function toID(id) {
        const content = document.getElementById('content')
        const el = document.getElementById(`${id}`)
        let start = content.scrollTop
        let end = el.offsetTop - 80
        let each = start > end ? -1 * Math.abs(start - end) / 20 : Math.abs(start - end) / 20
        let count = 0
        let scroll = () => {
            if(count < 20) {
                content.scrollTop += each
                count ++
            }
            window.requestAnimationFrame(scroll);
        }
        scroll()
    }

    return {
        imgLoadErr,
        imgLoadSuccess,
        toID,
    }
}

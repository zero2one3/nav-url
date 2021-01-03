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

    return {
        imgLoadErr,
        imgLoadSuccess,
    }
}

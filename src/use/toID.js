// 点击左侧标签，自动滚动到对应标签内容

export default function toID(id) {
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
            window.requestAnimationFrame(scroll);
        }
    }
    scroll()
}

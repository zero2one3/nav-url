// 控制侧边栏中标签的点击跳转

export default function tabClickFunction() {
    
    // 点击标签，在主内容页面滑动到对应的标签位置
    function toID(id) {
        const content = document.getElementById('content')
        const el = document.getElementById(`${id}`)
        let start = content.scrollTop
        let end = el.offsetTop - 80
        let each = start > end ? -1 * Math.abs(start - end) / 20 : Math.abs(start - end) / 20
        let count = 0
        let timer = setInterval(() => {
            if(count < 20) {
                content.scrollTop += each
                count ++
            } else {
                clearInterval(timer)
            }
        }, 10) 
    }

    return {
        toID,
    }
}

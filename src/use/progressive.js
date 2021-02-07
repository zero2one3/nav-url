// 渐进式渲染

let progress = 1

export default function progressive(total = 10) {
    let render = () => {
        if(progress <= total) {
            progress ++
            window.requestAnimationFrame(render)
        }
    }

    render()

    // 判断是否轮到当前元素渲染
    let defer = (n) => {
        // 针对渲染总数不确定的情况，自行增加total的值，并进行渲染
        if(n >= total) {
            total ++
            render()
        }
        return n <= progress
    }

    return defer   
}

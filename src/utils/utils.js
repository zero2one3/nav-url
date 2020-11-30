/* 节流函数 */
function debounce(fn, delay = 3000) {
    let timer = null

    return function(...args) {
        if(timer) clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(this, args)
            clearTimeout(timer)
        }, delay)
    }
}

function writeToVuex(store, obj) {
    store.state.navName = obj.navName
    store.state.catalogue = obj.catalogue
}


function updateLocalstorage(store) {
    window.localStorage.navInfos = JSON.stringify({
        navName: store.state.navName,
        catalogue: store.state.catalogue
    })
}

let updateLocal = debounce(updateLocalstorage)

function judgeString(s) {
    let count = 12
    let characters = s.match(/\w/g)
    let words = s.match(/\W/g)
    count -= characters ? characters.length : 0
    count -= words ? words.length * 2 : 0
    return count >= 0 ? true : false
}

export {
    writeToVuex,  // 将导航所有信息全部重新导入到vuex中
    updateLocal,  // 将Vuex中的信息更新到localstorage中 
    debounce,     // 防抖
    judgeString,  // 判断字符串长度是否符合大小规定
}
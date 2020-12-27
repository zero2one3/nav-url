// 防抖
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

// 将导航所有信息全部重新导入到vuex中
function writeToVuex(store, obj) {
    store.state.navName = obj.navName
    store.state.catalogue = obj.catalogue
}

// 将Vuex中的信息更新到localStorage中（未经过防抖处理）
function updateLocalStorage(store) {
    window.localStorage.navInfos = JSON.stringify({
        navName: store.state.navName,
        catalogue: store.state.catalogue
    })
}

// 将Vuex中的信息更新到localStorage中（经过防抖处理）
let updateLocal = debounce(updateLocalStorage)

// 判断字符串长度是否符合大小规定
function judgeString(s) {
    let count = 12
    let characters = s.match(/\w/g)
    let words = s.match(/\W/g)
    count -= characters ? characters.length : 0
    count -= words ? words.length * 2 : 0
    return count >= 0 ? true : false
}

// 交换两个元素的位置
function exchangeElements(el1, el2) {
    let sibling1 = el1.nextElementSibling,
        sibling2 = el2.nextElementSibling,
        parentNode = el1.parentNode

    // el1 在 el2前面，且相邻
    if(sibling1 === el2) parentNode.insertBefore(el2, el1);
    // el2 在 el1前面，且相邻
    else if(sibling2 === el1) parentNode.insertBefore(el1, el2)
    // el1 和 el2 不相邻
    else {
        parentNode.insertBefore(el2, sibling1)
        parentNode.insertBefore(el1, sibling2)
    }
}

export {
    writeToVuex,  
    updateLocal,  
    debounce,     
    judgeString,  
    exchangeElements,  
}
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

function addClass(el, className) {
    el.className = el.className + className
}

function removeClass(el, className) {
    let elClassName = el.className
    let arr = elClassName.split(' ')
    let length = arr.length
    for(let i = 0; i < length; i++) {
        if(arr[i] == className) {
            arr.splice(i, 1)
            break;
        }
    }
    el.className = arr.join(' ')
}

function updateClass(el, oldClass, newClass) {
    let elClassName = el.className
    let arr = elClassName.split(' ')
    for(let i in arr) {
        if(arr[i] === oldClass) {
            arr[i] = newClass
            break;
        }
    }
    el.className = arr.join(' ')
}

export {
    writeToVuex,  // 将导航所有信息全部重新导入到vuex中
    updateLocal,  // 将Vuex中的信息更新到localstorage中 
    debounce,
    addClass,
    removeClass,
    updateClass,
}
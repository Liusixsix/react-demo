
/**
 * 节流
 * @param {function} func 执行的函数
 * @param {number} delay 节流间隔
 */
export function throttle(func: (e) => void, delay: number) {
    let timer = null
    return function () {
        let context = this
        let args = arguments
        if (!timer) {
            timer = setTimeout(() => {
                func.apply(context, args)
                timer = null
            }, delay)
        }
    }
}

/**
 * 防抖
 * @param func {函数}
 * @param delay {间隔}
 */

export function debounce (func,delay){
    let timer
    return function (...args){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            func.apply(this,args)
            clearTimeout(timer)
        },delay)
    }
}

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

export function debounce(func, delay) {
    let timer
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
            clearTimeout(timer)
        }, delay)
    }
}

/**
 * @description 找出第一个没有歌名的排行榜的索引
 * @param {Array} rankList 排行榜
 * @returns index 下标
 */
export const filterIndex = (rankList: any[]):number => {
    for (let i = 0; i < rankList.length - 1; i++) {
        if(rankList[i].tracks.length && !rankList[i+1].tracks.length){
            return i +1
        }
    }
}
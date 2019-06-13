/**
 * @description 缓动函数
 * @createtime 2019-06-13
 * @param {number} rate - 速率
 * @param {function | number} current - 当前位置
 * @param {function | number} target - 目标位置
 * @return {function}
 */

type argsFn = () => number


const easeout = (rate: number) => (
    current: number | argsFn,
    target: number | argsFn,
    callback: Function
): void => {
    let A = typeof current === 'function' ? current() : current
    let B = typeof target === 'function' ? target() : target

    if (A === B) return

    const stepFn = () => {
        A = A + (B - A) / rate

        // 去抖
        if (B - A < 1) {
            A = B
        }

        if (A === B) {
            return callback(B)
        }

        callback(A)
        requestAnimationFrame(stepFn)
    }

    stepFn()
}
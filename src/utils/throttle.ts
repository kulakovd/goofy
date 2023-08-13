export function throttle(fn: (...args: any[]) => void, delay: number) {
  let timer: number | null = null
  return function (...args: any[]) {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay)
  }
}

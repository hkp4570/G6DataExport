
export const debounce = (fn, sleep) => {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this,args);
        }, sleep)
    }
}
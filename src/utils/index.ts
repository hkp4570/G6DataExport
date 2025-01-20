
export const debounce = (fn, sleep) => {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this,args);
        }, sleep)
    }
}

export const deepClone = (data) => {
    const type = Object.prototype.toString.call(data);
    let newData;
    if(type === '[object Array]'){
        newData = data.map(d => deepClone(d));
    }else if (type === '[object Object]'){
        newData = {};
        for (const key in data) {
            if(data.hasOwnProperty(key)){
                newData[key] = deepClone(data[key]);
            }
        }
    }else{
        newData = data;
    }
    return newData;
}
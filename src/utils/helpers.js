const debounce = (callback, timeout = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { callback.apply(this, args); }, timeout);
    };
}

const getRandomInt = (max, min = 0) => min + Math.floor(Math.random() * (max - min + 1));

export { debounce, getRandomInt }

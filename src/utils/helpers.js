const debounce = (callback, timeout = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { callback.apply(this, args); }, timeout);
    };
}

const getRandomInt = (max, min = 0) => min + Math.floor(Math.random() * (max - min + 1));

const getCurrentYearMonthString = () => new Date().toISOString().slice(0, 7)

export { debounce, getRandomInt, getCurrentYearMonthString }

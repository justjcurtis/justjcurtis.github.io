const debounce = (callback, timeout = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { callback.apply(this, args); }, timeout);
    };
}

const getRandomInt = (max, min = 0) => min + Math.floor(Math.random() * (max - min + 1));

const getCurrentYearMonthString = () => new Date().toISOString().slice(0, 7)

const mapTextVariables = (text, textVariableMap) => {
    const matches = text.match(/\{.*?\}/g)
    if (!matches) return text
    const variables = matches.map(m => m.replace('{', '').replace('}', ''))
    variables.forEach(v => {
        const getVariableValue = textVariableMap[v.trim()]
        if (getVariableValue) {
            text = text.replace(`{${v}}`, getVariableValue())
        }
    })
    return text
}

export { debounce, getRandomInt, getCurrentYearMonthString, mapTextVariables }

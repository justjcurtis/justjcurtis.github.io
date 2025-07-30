import { TARGET_FREQ } from "../data/constants";

export const debounce = (callback, timeout = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { callback.apply(this, args); }, timeout);
    };
}

export const getRandomInt = (max, min = 0) => min + Math.floor(Math.random() * (max - min + 1));

export const getCurrentYearMonthString = () => new Date().toISOString().slice(0, 7)

export const mapTextVariables = (text, textVariableMap) => {
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

export const mulberry32 = a => {
    return function() {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1); // eslint-disable-line
        t ^= t + Math.imul(t ^ t >>> 7, t | 61); // eslint-disable-line
        return ((t ^ t >>> 14) >>> 0) / 4294967296; // eslint-disable-line
    }
}
export const getRandomForToday = (dayOffset = 0) => {
    const now = new Date()
    const seed = (now.getFullYear() * 5) * (now.getMonth() * 17) * ((now.getDate() + dayOffset) * 23)
    const prng = mulberry32(seed)
    return prng()
}

export const selectFromArrWithFloat = (arr, float) => arr[Math.floor(float * arr.length)]


export const playBeep = (frequency = TARGET_FREQ, duration = 300) => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine'; // Types: 'sine', 'square', 'triangle', 'sawtooth'
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration / 1000);
}

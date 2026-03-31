export const debounce = (callback, timeout = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { callback.apply(this, args); }, timeout);
    };
}


export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
    return function () {
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

export const cycle = (value, arr) => {
    const index = arr.indexOf(value)
    if (index === -1) return arr[0]
    return arr[(index + 1) % arr.length]
}

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
export const playBeep = (frequency, duration = 200) => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    const now = audioCtx.currentTime;
    const totalTime = duration / 1000;

    const attackTime = totalTime * (3 / 5)
    const releaseTime = totalTime * (1 / 5)
    const sustainTime = totalTime - attackTime - releaseTime;

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, now);

    // Start at 0
    gainNode.gain.setValueAtTime(0, now);

    // Attack (0 → 1)
    gainNode.gain.linearRampToValueAtTime(1, now + attackTime);

    // Sustain (hold at 1)
    gainNode.gain.setValueAtTime(1, now + attackTime + sustainTime);

    // Release (1 → 0)
    gainNode.gain.linearRampToValueAtTime(
        0,
        now + attackTime + sustainTime + releaseTime
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start(now);
    oscillator.stop(now + totalTime);
};

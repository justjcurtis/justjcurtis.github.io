import { useEffect, useState } from "react"

const getSavedValue = (key, value) => {
    const local = localStorage.getItem(key)
    const saved = JSON.parse(local)
    if (saved !== null && saved !== undefined) return saved
    return value
}

export const useLocalStorage = (key, initial) => {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initial)
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    return [value, setValue]
}

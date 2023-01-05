import { useEffect, useState } from "react"
import { useLocalStorage } from "./useLocalStorage"

const ONE_MIN_MS = 60000

export const useCache = (key, initial, timeout = 60 * ONE_MIN_MS) => {
    const [cached, setCached] = useLocalStorage(key, { value: initial, date: null })
    const [value, setValue] = useState(cached.value)
    const needsUpdate = () => {
        if (cached === null || cached === undefined) return true
        if (!cached.date) return true
        return Date.now() - cached.date >= timeout
    }
    useEffect(() => {
        setCached({ value, date: Date.now() })
    }, [value, setCached])

    return [value, setValue, needsUpdate]
}
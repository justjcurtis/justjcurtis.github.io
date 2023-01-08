import { useEffect, useState } from "react"
import { ONE_MIN_MS } from "../data/constants"
import { useLocalStorage } from "./useLocalStorage"

export const useCache = (key, initial, forceRefresh = false, timeout = 60 * ONE_MIN_MS) => {
    const [cached, setCached] = useLocalStorage(key, { value: initial, date: 0 })
    const needsUpdate = () => Date.now() - cached.date >= timeout
    const calculatedInitialValue = needsUpdate() && forceRefresh ? initial : cached.value
    const [value, setValue] = useState(calculatedInitialValue)
    useEffect(() => {
        const now = Date.now()
        if (JSON.stringify(cached.value) !== JSON.stringify(value))
            setCached({ value, date: now })
    }, [value, setCached, cached.value])

    return [value, setValue, needsUpdate]
}
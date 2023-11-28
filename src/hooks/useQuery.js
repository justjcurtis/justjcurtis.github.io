import { useCallback, useEffect } from "react"
import { ONE_MIN_MS } from "../data/constants"
import { debounce } from "../utils/helpers"
import { useCache } from "./useCache"

export const useQuery = (key, getData, initial = [], forceRefresh = false, timeout = 60 * ONE_MIN_MS) => {
    const [data, setData, needsUpdate] = useCache(key, initial, forceRefresh, timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchData = useCallback(debounce(async () => {
        const x = await getData()
        setData(x)
    }), [getData, setData])
    useEffect(() => {
        if (needsUpdate()) fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return [data, setData]
}

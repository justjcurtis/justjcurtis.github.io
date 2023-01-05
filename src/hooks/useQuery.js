import { useCallback, useEffect } from "react"
import { debounce } from "../utils/helpers"
import { useCache } from "./useCache"



export const useQuery = (key, getData, initial = []) => {
    const [data, setData, needsUpdate] = useCache(key, initial)
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
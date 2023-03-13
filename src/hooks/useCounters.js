import { useContext } from "react"
import { CounterContext } from "../context/countersContext"
import { getCount, hitCount } from "../utils/counter"

export const useCounters = () => {
    const counters = useContext(CounterContext)
    return { counters, getCount, hitCount }
}
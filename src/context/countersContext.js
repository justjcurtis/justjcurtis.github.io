import React from "react"
import { getCounters } from "../data/counters"
import { useQuery } from "../hooks/useQuery"

export const CounterContext = React.createContext()
export const CounterContextProvider = ({ children }) => {
    const [counters] = useQuery('counters', getCounters, null, true)
    return (
        <CounterContext.Provider value={counters}>
            {children}
        </CounterContext.Provider>
    )
}
import React from "react"
import { getImages } from "../data/images"
import { useQuery } from "../hooks/useQuery"

export const ImageUrlsContext = React.createContext()
export const ImageUrlsContextProvider = ({ children }) => {
    const [images] = useQuery('images', getImages, null, true)
    return (
        <ImageUrlsContext.Provider value={images}>
            {children}
        </ImageUrlsContext.Provider>
    )
}

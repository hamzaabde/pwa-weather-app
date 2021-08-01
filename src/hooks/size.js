import { useState, useCallback, useEffect } from 'react'

export const useVariableHeight = () => {
    const [height, setHeight] = useState(innerHeight)

    useEffect(() => {
        setHeight(innerHeight)
    }, [height])

    onresize = useCallback(() => {
        setHeight(innerHeight)
    }, [])

    return height
}

export const useVariableDimensions = () => {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [margin, setMargin] = useState({
        top: 40,
        right: 1,
        bottom: 30,
        left: 1,
    })

    useEffect(() => {
        if (innerWidth < 576) {
            setWidth(innerWidth - 24)
            setHeight(150)
        }
        if (innerWidth < 768 && innerWidth >= 576) {
            setWidth((innerWidth * 10) / 12 - 24)
            setHeight(170)
        }
        if (innerWidth < 992 && innerWidth >= 768) {
            setWidth((innerWidth * 8) / 12 - 24)
            setHeight(190)
        }
        if (innerWidth < 1200 && innerWidth >= 992) {
            setWidth((innerWidth * 6) / 12 - 24)
            setHeight(210)
        }
        if (innerWidth < 1400 && innerWidth >= 1200) {
            setWidth((innerWidth * 6) / 12 - 24)
            setHeight(230)
        }
    }, [])

    onresize = useCallback(() => {
        // console.log('resize')
        if (innerWidth < 576) {
            setWidth(innerWidth - 24)
            setHeight(150)
        }
        if (innerWidth < 768 && innerWidth >= 576) {
            setWidth((innerWidth * 10) / 12 - 24)
            setHeight(170)
        }
        if (innerWidth < 992 && innerWidth >= 768) {
            setWidth((innerWidth * 8) / 12 - 24)
            setHeight(190)
        }
        if (innerWidth < 1200 && innerWidth >= 992) {
            setWidth((innerWidth * 6) / 12 - 24)
            setHeight(210)
        }
        if (innerWidth < 1400 && innerWidth >= 1200) {
            setWidth((innerWidth * 6) / 12 - 24)
            setHeight(230)
        }
    }, [innerWidth])

    return { width, height, margin }
}

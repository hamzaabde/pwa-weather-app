import { useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux'

const putOnStorage = (key, obj) => {
    const data = JSON.stringify(obj)

    let isSuccess = false
    let error = null

    try {
        localStorage.setItem(key, data)
        isSuccess = true
        error = null
    } catch (e) {
        isSuccess = false
        throw e.message
    }

    return isSuccess
}

export const getFromStorage = (state, fallbackState, storageKey) => {
    let data = null

    let result = fallbackState

    try {
        data = localStorage.getItem(storageKey)
        data = JSON.parse(data)
        result = data[state].value
    } catch (e) {
        console.warn(e.message)
    }

    return result
}

export const useConstantCache = (storageKey, store) => {
    useEffect(() => {
        try {
            putOnStorage(storageKey, store)
        } catch (e) {
            console.warn(e.message)
        }
    }, [store])
}

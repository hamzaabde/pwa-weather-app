import { useState, useEffect } from 'react'

// weather
import {
    getUserLocation,
    fetchLocationByGeo,
    fetchCurrentCondition,
    fetchHourlyForecast,
    fetchDailyForecast,
} from './weather'

// redux
import { useDispatch, useSelector } from 'react-redux'
import {
    addCity,
    selectCity,
    selectUnit,
    emitError,
    clearError,
} from '../storeReducers'
import { current } from '@reduxjs/toolkit'

export const useAppInit = () => {
    const [userLocation, setUserLocation] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)
    const [reload, setReload] = useState(0)

    const cities = useSelector(state => state.cities.value)
    const dispatch = useDispatch()

    useEffect(() => {
        if (userLocation === null) {
            // fetch users location
            getUserLocation()
                .then(geo => {
                    // console.log('geo:', geo)
                    return fetchLocationByGeo(geo)
                })
                .then(location => {
                    setUserLocation(location)
                    setIsSuccess(true)
                    // console.table(location)
                    dispatch(addCity(location))
                    dispatch(clearError())
                })
                .catch(e => {
                    dispatch(emitError(e))
                    // console.warn(e)
                })
        }

        if (isSuccess) {
            dispatch(selectUnit('Metric'))
            dispatch(selectCity(cities[0]))
            // console.table(cities)
        }
    }, [reload, isSuccess, cities])

    // ✅ success - indicates successfull location fetch
    // ❌ success - indicates location fetch failure
    // error - error bucket
    // reload - manual reload handle
    return () => {
        setReload(reload + 1)
    }
}

export const useWeather = () => {
    const [currentWeather, setCurrentWeather] = useState(null)
    const [hourlyWeather, setHourlyWeather] = useState(null)
    const [dailyWeather, setDailyWeather] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)

    const city = useSelector(state => state.selectedCity.value)
    const unit = useSelector(state => state.selectedUnit.value)

    useEffect(() => {
        if (city && unit) {
            setLoading(true)
            setError(null)
            fetchCurrentCondition(city.key, unit)
                .then(data => {
                    setCurrentWeather(data)
                    return fetchHourlyForecast(city.key, unit)
                })
                .then(data => {
                    setHourlyWeather(data)
                    return fetchDailyForecast(city.key, unit)
                })
                .then(data => {
                    setDailyWeather(data)
                    setLoading(false)
                    setIsSuccess(true)
                })
                .catch(e => {
                    setLoading(false)
                    setError(e.message)
                })
        }
    }, [city, unit])

    return {
        city,
        currentWeather,
        hourlyWeather,
        dailyWeather,
        isSuccess,
        loading,
        error,
    }
}

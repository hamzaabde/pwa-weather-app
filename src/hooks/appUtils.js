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
import { addCity, selectCity, emitError, clearError } from '../storeReducers'

export const useAppInit = () => {
    const [userLocation, setUserLocation] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)

    const cities = useSelector(state => state.cities.value)
    const city = useSelector(state => state.selectedCity.value)
    const dispatch = useDispatch()

    useEffect(() => {
        if (userLocation === null) {
            // fetch users location
            dispatch(clearError())
            getUserLocation()
                .then(geo => {
                    // console.log('geo:', geo)
                    return fetchLocationByGeo(geo)
                })
                .then(location => {
                    setUserLocation(location)
                    setIsSuccess(true)
                    dispatch(addCity(location))
                    dispatch(clearError())
                })
                .catch(e => {
                    dispatch(emitError(e.message))
                    console.warn(e)
                })
        }

        if (isSuccess && !city) {
            dispatch(selectCity(cities[0]))
        }
    }, [isSuccess, cities])
}

export const useWeather = () => {
    const [currentWeather, setCurrentWeather] = useState(null)
    const [hourlyWeather, setHourlyWeather] = useState(null)
    const [dailyWeather, setDailyWeather] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const city = useSelector(state => state.selectedCity.value)
    const unit = useSelector(state => state.selectedUnit.value)
    const reload = useSelector(state => state.reload.value)

    const dispatch = useDispatch()

    useEffect(() => {
        if (city && unit) {
            setLoading(true)
            dispatch(clearError())
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
                    dispatch(emitError(e.message))
                    console.warn(e)
                })
        }
    }, [city, unit, reload])

    return {
        city,
        currentWeather,
        hourlyWeather,
        dailyWeather,
        isSuccess,
        loading,
    }
}

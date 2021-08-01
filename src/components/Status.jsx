import React, { useState, useEffect } from 'react'
import WeatherIcon from 'react-animated-weather'
import { BsGeoAlt } from 'react-icons/bs'

// redux
import { useDispatch } from 'react-redux'
import { changeTheme } from '../storeReducers'

const selectIcon = num => {
    if ([1, 2, 3, 30].includes(num)) {
        return 'CLEAR_DAY'
    }
    if ([11, 21, 23, 4, 5].includes(num)) {
        return 'PARTLY_CLOUDY_DAY'
    }
    if ([7, 6, 8, 20, 19, 23, 31].includes(num)) {
        return 'CLOUDY'
    }
    if ([33, 34].includes(num)) {
        return 'CLEAR_NIGHT'
    }
    if ([38, 35, 36, 37].includes(num)) {
        return 'PARTLY_CLOUDY_NIGHT'
    }
    if (num === 25) {
        return 'SLEET'
    }
    if ([22, 24].includes(num)) {
        return 'SNOW'
    }
    if ([32].includes(num)) {
        return 'WIND'
    }
    if ([11].includes(num)) {
        return 'FOG'
    }
    // default
    return 'RAIN'
}

const Status = ({ name, data }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('change theme')

        if (data.isDay) {
            if ([1, 2, 3].includes(data.icon)) {
                console.log(data.icon)
                dispatch(changeTheme('day-clear-theme'))
                return
            }

            if ([4, 5, 5, 13, 14, 16, 17, 20, 21, 23].includes(data.icon)) {
                console.log('day-cloudy-theme')
                dispatch(changeTheme('day-cloudy-theme'))
                return
            }
            console.log('day-cloudy-theme')
            dispatch(changeTheme('day-clear-theme'))
        } else {
            if ([33, 34, 35].includes(data.icon)) {
                console.log('night-clear-theme')
                dispatch(changeTheme('night-clear-theme'))
                return
            }
            console.log('night-cloudy-theme')

            dispatch(changeTheme('night-cloudy-theme'))
        }
    }, [data])

    return (
        <div className="status col-12 col-sm-10 col-md-8 col-lg-2 mb-4 mb-md-0">
            <div className="">
                <h1 className="text-center text-light fs-3">{name}</h1>
                <div className="justify-content-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <WeatherIcon
                            icon={selectIcon(data.icon)}
                            color="yellow"
                        />
                        <span className="ms-2 text-light align-middle fs-1">
                            {data.temperature}
                        </span>
                    </div>
                </div>
                <div className="my-2"></div>
                <h2 className="text-light text-center fs-6 fw-normal">
                    {data.condition}
                </h2>
            </div>
        </div>
    )
}

export default Status

import React, { useState, useEffect } from 'react'
import WeatherIcon from 'react-animated-weather'
import { BsGeoAlt } from 'react-icons/bs'

const selectIcon = num => {
    if (num <= 5 || num === 30) return 'CLEAR_DAY'
    if ([11, 21, 23].includes(num)) return 'PARTLY_CLOUDY_DAY'
    if ([7, 6, 8, 20, 19, 23, 31].includes(num)) return 'CLOUDY'
    if ([33, 34, 35, 36].includes(num)) return 'CLEAR_NIGHT'
    if ([38].includes(num)) return 'PARTLY_CLOUDY_NIGHT'
    if (num === 25) return 'SLEET'
    if ([22, 24].includes(num)) return 'SNOW'
    if ([32].includes(num)) return 'WIND'
    if ([11].includes(num)) return 'FOG'
    // default
    return 'RAIN'
}

const Status = ({ name, data, error }) => {
    if (error) {
        return <h1 className="text-danger fs-4">{error}</h1>
    }

    return (
        <div className="status col-12 col-sm-10 col-md-8 col-lg-2 mb-4 mb-md-0">
            <div className="">
                <h1 className="text-center text-primary fs-3">{name}</h1>
                <div className="justify-content-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <WeatherIcon
                            icon={selectIcon(data.icon)}
                            color="blue"
                        />
                        <span className="ms-2 text-secondary align-middle fs-1">
                            {data.temperature}
                        </span>
                    </div>
                </div>
                <div className="my-2"></div>
                <h2 className="text-dark text-center fs-6 fw-normal">
                    {data.condition}
                </h2>
            </div>
        </div>
    )
}

export default Status

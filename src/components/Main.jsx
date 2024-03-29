import React, { useState, useEffect } from 'react'
import Status from './Status'
import Tab from './Tab'

// hooks
import { useWeather } from '../hooks/appUtils'

const Main = () => {
    const {
        city,
        currentWeather,
        hourlyWeather,
        dailyWeather,
        isSuccess,
        loading,
    } = useWeather()

    return (
        <div className="row justify-content-center align-items-center">
            {loading ? (
                <div
                    className="spinner-grow text-info"
                    style={{
                        width: '2rem',
                        height: '2rem',
                    }}
                />
            ) : isSuccess && !loading ? (
                <>
                    <Status name={city.name} data={currentWeather} />
                    <Tab
                        data={{ hourly: hourlyWeather, daily: dailyWeather }}
                    />
                </>
            ) : null}
        </div>
    )
}

export default Main

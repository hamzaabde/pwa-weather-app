import React, { useState, useEffect, useCallback } from 'react'
import { BsArrowClockwise } from 'react-icons/bs'
import { format } from 'date-fns'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { reload, emitError } from '../storeReducers'

const Footer = () => {
    const [loading, setLoading] = useState(false)
    const [time, setTime] = useState(new Date())

    const dispatch = useDispatch()
    const city = useSelector(state => state.selectedCity.value)
    useEffect(() => {}, [])

    useEffect(() => {
        if (loading) {
            setTime(new Date())
            setLoading(false)
        }

        if (loading) {
            setTimeout(() => {
                setLoading(false)
            }, 25000)
        }
    }, [loading])

    const onClick = useCallback(() => {
        setLoading(!loading)
        if (city.key) {
            dispatch(emitError(null))
            dispatch(reload())
        } else {
            dispatch(emitError('Reload failed'))
        }
    }, [loading])

    return (
        <footer className="footer row align-items-center justify-content-sm-center">
            <div className="col-3 col-sm-2 col-md-2 text-start">
                <img
                    className="img w-100 accuweather-logo"
                    src="/images/accuweather.png"
                    alt="accweather logo"
                />
            </div>
            <span className="update-info col-8 col-sm-7 col-md-5 text-end">
                Updated {format(time, 'Pp')}
            </span>
            <span
                className="col-1 col-sm-1 ps-0 d-flex align-self-stretch align-items-center justify-content-end"
                onClick={onClick}
            >
                {loading ? (
                    <span className="spinner spinner-border text-secondary"></span>
                ) : (
                    <BsArrowClockwise className="arrow-clockwise" />
                )}
            </span>
        </footer>
    )
}

export default Footer

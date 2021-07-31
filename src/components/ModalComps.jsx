import React, { useState, useCallback } from 'react'
import { BsPlus, BsX } from 'react-icons/bs'

// weather
import { searchLocations } from '../hooks/weather'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { addCity, selectCity, removeCity, selectUnit } from '../storeReducers'

const Search = ({ value, setValue, searchHandler }) => (
    <div className="row justify-content-center">
        <form className="form col col-md-8" onSubmit={searchHandler}>
            <div className="input-group w-100">
                <input
                    type="text"
                    className="form-control"
                    placeholder="search and add cities"
                    onChange={e => {
                        setValue(e.target.value)
                    }}
                    value={value}
                />
                <button className="btn btn-primary" type="submit">
                    Search
                </button>
            </div>
        </form>
    </div>
)

const SearchResult = ({ children, name, title, locationKey, setActive }) => {
    const dispatch = useDispatch()

    return (
        <div className="row align-items-center justify-content-center my-3 px-3 py-2 border-top border-bottom">
            <h5 className="col-6 col-md-6 m-0 fs-6 fw-bold">{title}</h5>
            <button
                className="col-6 col-md-2 btn btn-success"
                onClick={e => {
                    // dispatch addCity action
                    setActive(false)
                    dispatch(addCity({ name, key: locationKey }))
                }}
            >
                {children}
            </button>
        </div>
    )
}

const City = ({ name, locationKey, setActive }) => {
    const dispatch = useDispatch()

    return (
        <div className="row align-items-center justify-content-center my-3 px-3 py-2 border-top border-bottom">
            <h5 className="col-6 col-md-6 m-0 fs-6 fw-bold">{name}</h5>
            <div className="col-6 col-md-2 btn-group">
                <button
                    className="btn btn-success"
                    onClick={e => {
                        // dispatch addCity action
                        dispatch(selectCity({ name, key: locationKey }))
                        setActive(false)
                    }}
                >
                    select
                </button>
                <button
                    className="btn btn-danger"
                    onClick={e => {
                        // dispatch removeCity action
                        dispatch(removeCity(locationKey))
                        setActive(false)
                    }}
                >
                    remove
                </button>
            </div>
        </div>
    )
}

const SelectTemp = ({ setActive }) => {
    const [selected, setSelected] = useState('Metric')
    const dispatch = useDispatch()

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-8">
                <h3 className="fs-4">Select temperature unit:</h3>
                <div className="form-check">
                    <input
                        type="radio"
                        id="celcius"
                        className="form-check-input"
                        name="temp"
                        value="Metric"
                        checked={selected == 'Metric' ? true : false}
                        onChange={e => setSelected(e.target.value)}
                    />
                    <label htmlFor="celcius" className="form-check-label">
                        Metric (℃)
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="radio"
                        id="fahr"
                        className="form-check-input"
                        name="temp"
                        value="Imperial"
                        checked={selected == 'Imperial' ? true : false}
                        onChange={e => setSelected(e.target.value)}
                    />
                    <label htmlFor="fahr" className="form-check-label">
                        Imperial (℉)
                    </label>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        // dispatch selectUnit action
                        dispatch(selectUnit(selected))

                        // close the modal
                        setActive(false)
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

const Modal = ({ children, title, active, setActive }) => {
    return (
        <div
            className={`${
                !active && 'd-none'
            } modal-custom fixed-top w-100 h-100 bg-light overflow-auto`}
        >
            <div className="row justify-content-md-center border-bottom my-2 py-2">
                <div className="col col-md-4 text-start">
                    <h3 className="fs-4 fw-normal m-1 py-1 px-2">{title}</h3>
                </div>
                <div className="col col-md-4 text-end">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setActive(false)}
                    >
                        <BsX className="fs-4" />
                    </button>
                </div>
            </div>
            {children}
        </div>
    )
}

export const AddCity = ({ active, setActive }) => {
    const [value, setValue] = useState('')
    const [locations, setLocations] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const searchHandler = useCallback(
        e => {
            e.preventDefault()
            // setLocations(null)
            setError(null)
            setLoading(true)
            console.log('searching ', value)
            if (value)
                searchLocations(value)
                    .then(locs => {
                        setLoading(false)
                        setLocations(locs)
                        console.log(locs)
                    })
                    .catch(err => {
                        setLoading(false)
                        setError(err.message)
                    })
            else setLoading(false)
        },
        [value]
    )

    return (
        <Modal title="Cities" active={active} setActive={setActive}>
            <Search
                value={value}
                setValue={setValue}
                searchHandler={searchHandler}
            />
            {error ? (
                <h1 className="fs-4 my-3 text-center">{error}</h1>
            ) : !locations && loading ? (
                <div className="text-center my-3">
                    <div
                        className="spinner-border text-primary"
                        style={{ width: '2rem', height: '2rem' }}
                    ></div>
                </div>
            ) : locations ? (
                locations.map(location => (
                    <SearchResult
                        key={location.key}
                        title={`${location.name}, ${location.country} (${location.type})`}
                        name={`${location.name}, ${location.country}`}
                        locationKey={location.key}
                        setActive={setActive}
                    >
                        Select
                    </SearchResult>
                ))
            ) : null}
        </Modal>
    )
}

export const SelectCity = ({ active, setActive }) => {
    const cities = useSelector(state => state.cities.value)

    return (
        <Modal active={active} setActive={setActive}>
            {cities.map(city => (
                <City
                    key={city.key}
                    name={city.name}
                    locationKey={city.key}
                    setActive={setActive}
                />
            ))}
        </Modal>
    )
}

export const Settings = ({ active, setActive }) => {
    return (
        <Modal title="Settings" active={active} setActive={setActive}>
            <SelectTemp setActive={setActive} />
        </Modal>
    )
}

import React, { useState } from 'react'
import { BsGear } from 'react-icons/bs'
import { AddCity, SelectCity, Settings } from './ModalComps'

const Nav = () => {
    const [addCityModal, setAddCityModal] = useState(false)
    const [cityModal, setCityModal] = useState(false)
    const [settingsModal, setSettingsModal] = useState(false)

    return (
        <nav className="row justify-content-center align-items-center py-2">
            <div className="col col-sm-5 col-md-4 mb-0 d-flex align-items-center">
                <img
                    className="img"
                    style={{ width: '2rem' }}
                    src="/images/logo.svg"
                />
                <h1 className="logo-text text-primary fs-6 ms-1 mb-0">
                    Weatherry
                </h1>
            </div>
            <div className="col col-sm-5 col-md-4 text-end fs-6">
                <div className="btn-group">
                    <button
                        className="nav-btn btn btn-xs"
                        type="button"
                        onClick={() => setAddCityModal(true)}
                    >
                        Add
                    </button>
                    <button
                        className="nav-btn btn btn-xs align-middle"
                        type="button"
                        onClick={() => setCityModal(true)}
                    >
                        Cities
                    </button>
                    <span
                        className="nav-btn btn btn-xs align-middle"
                        type="button"
                        onClick={() => setSettingsModal(true)}
                    >
                        <BsGear className="d-md-none" />
                        <span className="align-middle d-md-inline d-none ms-1">
                            Settings
                        </span>
                    </span>
                </div>
            </div>
            <AddCity active={addCityModal} setActive={setAddCityModal} />
            <SelectCity active={cityModal} setActive={setCityModal} />
            <Settings active={settingsModal} setActive={setSettingsModal} />
        </nav>
    )
}

export default Nav

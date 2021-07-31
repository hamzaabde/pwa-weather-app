import React, { useState } from 'react'
import { BsGear } from 'react-icons/bs'
import { AddCity, SelectCity, Settings } from './ModalComps'

const Nav = () => {
    const [addCityModal, setAddCityModal] = useState(false)
    const [cityModal, setCityModal] = useState(false)
    const [settingsModal, setSettingsModal] = useState(false)

    return (
        <nav className="row justify-content-center align-items-center py-2">
            <h1 className="col col-sm-5 col-md-4 mb-0 text-start text-primary fs-4 fw-normal fst-italic">
                Weathery
            </h1>
            <div className="col col-sm-5 col-md-4 text-end fs-6">
                <div className="btn-group">
                    <button
                        className="btn btn-xs btn-light"
                        type="button"
                        onClick={() => setAddCityModal(true)}
                    >
                        Add
                    </button>
                    <button
                        className="btn btn-xs btn-light"
                        type="button"
                        onClick={() => setCityModal(true)}
                    >
                        Cities
                    </button>
                    <button
                        className="btn btn-xs btn-light"
                        type="button"
                        onClick={() => setSettingsModal(true)}
                    >
                        <BsGear className="" />
                        <span className="align-middle d-md-inline d-none ms-1">
                            Settings
                        </span>
                    </button>
                </div>
            </div>
            <AddCity active={addCityModal} setActive={setAddCityModal} />
            <SelectCity active={cityModal} setActive={setCityModal} />
            <Settings active={settingsModal} setActive={setSettingsModal} />
        </nav>
    )
}

export default Nav

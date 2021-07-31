import React, { useState, useCallback } from 'react'
import LineGraph from './Graphs'

const TabBtn = ({ children, active, setActive }) => (
    <button
        className={`nav-link p-1 ${active == children ? 'active' : null}`}
        onClick={() => setActive(children)}
    >
        {children}
    </button>
)

const TabPane = ({ children, active, toggler }) => {
    const toggle = active === toggler ? 'show active' : 'invisible'
    return <div className={`tab-pane fade ${toggle}`}>{children}</div>
}

const Tab = ({ data, error }) => {
    const [active, setActive] = useState('HOURLY')

    return (
        <div className="tab col-12 col-sm-10 col-md-8 col-lg-6">
            <div className="row justify-content-start">
                <div className="col-12">
                    <span className="fw-normal">Sun, July 25</span>
                    <span className="fw-light ms-3">25° / 18°</span>
                </div>
            </div>
            <div className="tab-container py-2 border-top border-bottom">
                <div className="nav nav-tabs nav-fill">
                    <TabBtn active={active} setActive={setActive}>
                        HOURLY
                    </TabBtn>
                    <TabBtn active={active} setActive={setActive}>
                        DAILY
                    </TabBtn>
                </div>
                <div className="tab-content">
                    <TabPane active={active} toggler="HOURLY">
                        {error ? (
                            <h1 className="text-danger fs-3">{error}</h1>
                        ) : (
                            <LineGraph data={data.hourly} type="hourly" />
                        )}
                    </TabPane>
                    <TabPane active={active} toggler="DAILY">
                        {error ? (
                            <h1 className="text-danger fs-3">{error}</h1>
                        ) : (
                            <LineGraph data={data.daily} type="daily" />
                        )}
                    </TabPane>
                </div>
            </div>
            {/* <div className="d-flex justify-content-between">
                <span>Chance of rain 44%</span>
                <span>UV index Low</span>
            </div> */}
        </div>
    )
}

export default Tab

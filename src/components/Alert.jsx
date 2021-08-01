import React from 'react'
import { useSelector } from 'react-redux'

const Alert = () => {
    const error = useSelector(state => state.error.value)

    console.log(error)

    return (
        <div className="row align-items-center justify-content-center m-0">
            <div className="col col-xs-12 col-sm-10 col-md-8 m-0 p-0">
                <div
                    className={`alert alert-warning ${
                        error == null ? 'invisible' : 'visible'
                    } text-center m-0`}
                >
                    <p className="m-0">{error ? error : 'Alert'}</p>
                </div>
            </div>
        </div>
    )
}

export default Alert

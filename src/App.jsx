import React, { useState, useEffect, useCallback } from 'react'
import Nav from './components/Nav'
import Main from './components/Main'
import Alert from './components/Alert'
import Footer from './components/Footer'
import register from './register-sw'

// hooks
import { useAppInit } from './hooks/appUtils'
import { useVariableHeight } from './hooks/size'

// redux
import { useSelector } from 'react-redux'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import '/index.css'

const App = () => {
    const reload = useAppInit()
    const height = useVariableHeight('london')

    return (
        <div
            className="app container-fluid"
            style={{
                height: height,
            }}
        >
            <div className="d-flex flex-column justify-content-sm-evenly justify-content-between h-100">
                <Nav />
                <Main />
                <Alert />
                <Footer reload={reload} />
            </div>
        </div>
    )
}

export default App

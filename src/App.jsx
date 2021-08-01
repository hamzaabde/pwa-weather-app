import React, { useState, useEffect, useCallback } from 'react'
import Nav from './components/Nav'
import Main from './components/Main'
import Alert from './components/Alert'
import Footer from './components/Footer'
import register from './register-sw'

// service worker
register()

// hooks
import { useAppInit } from './hooks/appUtils'
import { useVariableHeight } from './hooks/size'
import { useConstantCache } from './hooks/cache'

// redux
import { useSelector, useStore } from 'react-redux'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import '/index.css'

const App = () => {
    useAppInit()
    useConstantCache('weather-store-cache', useStore().getState())

    // dynamic height
    const height = useVariableHeight('london')

    // theme
    const theme = useSelector(state => state.theme.value)

    return (
        <div
            className={`app container-fluid ${theme}`}
            style={{
                height: height,
            }}
        >
            <div className="d-flex flex-column justify-content-sm-evenly justify-content-between h-100">
                <Nav />
                <Main />
                <Alert />
                <Footer />
            </div>
        </div>
    )
}

export default App

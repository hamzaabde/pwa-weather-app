const registerSW = async () => {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('/dist/serviceworker.js')
        } catch (e) {
            console.log('SW registration failed')
        }
    }
}

const register = () => {
    window.addEventListener('load', () => {
        registerSW()
    })
}

export default register

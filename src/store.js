import { configureStore } from '@reduxjs/toolkit'
import {
    citiesSliceReducer,
    selectedCitySliceReducer,
    selectedUnitSliceReducer,
    themeSliceReducer,
    reloadSliceReducer,
    errorSliceReducer,
} from './storeReducers'

// configuring store
export default configureStore({
    reducer: {
        cities: citiesSliceReducer,
        selectedCity: selectedCitySliceReducer,
        selectedUnit: selectedUnitSliceReducer,
        theme: themeSliceReducer,
        reload: reloadSliceReducer,
        error: errorSliceReducer,
    },
})

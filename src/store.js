import { configureStore } from '@reduxjs/toolkit'
import {
    citiesSliceReducer,
    selectedCitySliceReducer,
    selectedUnitSliceReducer,
    errorSliceReducer,
} from './storeReducers'

// configuring store
export default configureStore({
    reducer: {
        cities: citiesSliceReducer,
        selectedCity: selectedCitySliceReducer,
        selectedUnit: selectedUnitSliceReducer,
        error: errorSliceReducer,
    },
})

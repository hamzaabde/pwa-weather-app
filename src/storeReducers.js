import { createSlice } from '@reduxjs/toolkit'
import { getFromStorage } from './hooks/cache'

// create store slices
const citiesSlice = createSlice({
    name: 'cities',
    initialState: {
        value: getFromStorage('cities', [], 'weather-store-cache'),
    },
    reducers: {
        addCity: (state, action) => {
            const hasCity = state.value.some(
                city => city.key === action.payload.key
            )
            if (!hasCity) state.value = [action.payload, ...state.value]
            else state.value = state.value
        },
        removeCity: (state, action) => {
            if (state.value.length > 1) {
                state.value = state.value.filter(city => {
                    if (city.key === action.payload) {
                        return false
                    } else {
                        return true
                    }
                })
            }
        },
    },
})

const selectedCitySlice = createSlice({
    name: 'selected-city',
    initialState: {
        value: getFromStorage('selectedCity', null, 'weather-store-cache'),
    },
    reducers: {
        selectCity: (state, action) => {
            state.value = action.payload
        },
    },
})

const selectedUnitSlice = createSlice({
    name: 'selected-unit',
    initialState: {
        value: getFromStorage('selectedUnit', 'Metric', 'weather-store-cache'),
    },
    reducers: {
        selectUnit: (state, action) => {
            state.value = action.payload
        },
    },
})

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        value: getFromStorage(
            'theme',
            'day-clear-theme',
            'weather-store-cache'
        ),
    },
    reducers: {
        changeTheme: (state, action) => {
            state.value = action.payload
        },
    },
})

const reloadSlice = createSlice({
    name: 'reload',
    initialState: {
        value: 0,
    },
    reducers: {
        reload: state => {
            state.value += 1
        },
    },
})

const errorSlice = createSlice({
    name: 'error',
    initialState: {
        value: null,
    },
    reducers: {
        emitError: (state, action) => {
            state.value = action.payload
        },
        clearError: state => {
            state.value = null
        },
    },
})

// export action creators
export const { addCity, removeCity } = citiesSlice.actions
export const { selectCity } = selectedCitySlice.actions
export const { selectUnit } = selectedUnitSlice.actions
export const { changeTheme } = themeSlice.actions
export const { reload } = reloadSlice.actions
export const { emitError, clearError } = errorSlice.actions

// export store reducers
export const citiesSliceReducer = citiesSlice.reducer
export const selectedCitySliceReducer = selectedCitySlice.reducer
export const selectedUnitSliceReducer = selectedUnitSlice.reducer
export const themeSliceReducer = themeSlice.reducer
export const reloadSliceReducer = reloadSlice.reducer
export const errorSliceReducer = errorSlice.reducer

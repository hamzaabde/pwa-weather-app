import { API_WEATHER_KEY } from '../config.app'

const Key = API_WEATHER_KEY

const timeout = 25000

// date-fns
import { format } from 'date-fns'

// get user locatin via geolocation
export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        const success = ({ coords }) => {
            resolve({ lat: coords.latitude, lon: coords.longitude })
        }

        const error = ({ code, message }) => {
            switch (code) {
                case 1:
                    reject(
                        `Please allow location to get precise weather updates, Code`
                    )
                    break
                case 2:
                case 3:
                    reject(
                        `Couldn't get location, please ckeck your internet, Code`
                    )
                    break
            }
            reject(message)
        }

        if ('geolocation' in navigator)
            navigator.geolocation.getCurrentPosition(success, error, {
                timeout,
                maximumAge: 172800,
            })
        else reject('Geolocation is not available in your browser 😔')
    })
}

// fetch autocomplete result of location name
export const searchLocations = str => {
    return new Promise((resolve, reject) => {
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), timeout)

        fetch(
            `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${Key}&q=${str}`,
            { signal: controller.signal }
        )
            .then(res => {
                clearTimeout(id)
                if (!res.ok || res.status !== 200)
                    throw new Error(res.statusText)
                return res.json()
            })
            .then(data => {
                console.log(data)
                if (!data.length)
                    throw new Error(`Didn't find anything named ${str}`)
                console.log(data)

                const temp = data.reduce(
                    (arr, city) => [
                        ...arr,
                        {
                            key: city.Key,
                            name: city.LocalizedName,
                            country: city.Country.LocalizedName,
                            type: city.Type,
                        },
                    ],
                    []
                )

                resolve(temp)
            })
            .catch(e => {
                clearTimeout(id)
                reject(e)
            })
    })
}

// fetch location key by geographic data(latitude, longitude)
export const fetchLocationByGeo = ({ lat, lon }) => {
    return new Promise((resolve, reject) => {
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), timeout)

        fetch(
            `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${Key}&q=${lat},${lon}`,
            { signal: controller.signal }
        )
            .then(res => {
                clearTimeout(id)
                if (!res.ok || res.status !== 200)
                    throw new Error(res.statusText)
                return res.json()
            })
            .then(data => {
                if (!data.Key)
                    throw new Error(
                        `Didn't find anything for: lat(${lat}) and long(${lon})`
                    )
                resolve({
                    name: data.LocalizedName,
                    country: data.Country.LocalizedName,
                    key: data.Key,
                })
            })
            .catch(e => {
                clearTimeout(id)
                reject(e)
            })
    })
}

// fetch current condition
export const fetchCurrentCondition = (key, unit = 'Metric') => {
    return new Promise((resolve, reject) => {
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), timeout)

        // fetch endpoint
        fetch(
            `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${Key}`,
            { signal: controller.signal }
        )
            .then(res => {
                clearTimeout(id)
                if (!res.ok || res.status !== 200)
                    throw new Error(res.statusText)

                // test response
                // console.log('response', res)

                return res.json()
            })
            .then(data => {
                if (!data.length) throw new Error('Data not found')

                const temp = data[0]
                const refinedData = {
                    temperature:
                        unit === 'Metric'
                            ? Math.round(temp.Temperature.Metric.Value) + '℃'
                            : Math.round(temp.Temperature.Imperial.Value) + '℉',
                    icon: temp.WeatherIcon,
                    condition: temp.WeatherText,
                }

                // resolve refined data
                resolve(refinedData)
            })
            .catch(e => {
                clearTimeout(id)
                reject(e)
            })
    })
}

// temperature converter
const toImperial = temp => {
    return temp * (9 / 5) + 32
}

// fetch hourlyforcasts
export const fetchHourlyForecast = (key, unit = 'Metric') => {
    return new Promise((resolve, reject) => {
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), timeout)
        // fetch endpoint
        fetch(
            `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${key}?apikey=${Key}&metric=true`,
            { signal: controller.signal }
        )
            .then(res => {
                clearTimeout(id)
                if (!res.ok || res.status !== 200)
                    throw new Error(res.statusText)

                // test response
                // console.log('response', res)

                return res.json()
            })
            .then(data => {
                if (!data.length) throw new Error('Data not found')

                // map over data and return necessary data
                // so to return 5 hours forecast to match graph space
                const indexPoints = [0, 2, 5, 8, 11]

                // returned only necessary values
                const refinedData = data
                    .map(d => {
                        // format predicted temperature
                        const temp =
                            unit === 'Metric'
                                ? d.Temperature.Value
                                : toImperial(d.Temperature.Value)

                        return {
                            icon: d.WeatherIcon,
                            date: format(new Date(d.DateTime), 'p'),
                            temperature: Math.round(temp),
                        }
                    })
                    // get only five intervals
                    .filter((_, i) => indexPoints.includes(i))

                // resolve refined data
                resolve(refinedData)
            })
            // reject if any error occured
            .catch(e => {
                clearTimeout(id)
                reject(e)
            })
    })
}

export const fetchDailyForecast = (key, unit = 'Metric') => {
    return new Promise((resolve, reject) => {
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), timeout)
        // fetch endpoint
        fetch(
            `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${Key}&metric=true`,
            { signal: controller.signal }
        )
            .then(res => {
                clearTimeout(id)
                if (!res.ok || res.status !== 200)
                    throw new Error(res.statusText)

                // test response
                // console.log('response', res)

                return res.json()
            })
            .then(data => {
                if (!data.hasOwnProperty('DailyForecasts'))
                    throw new Error('Data not found')

                // map over data and return necessary data
                const refinedData = data.DailyForecasts.map(d => {
                    // maximum predicted temperature
                    const maxTemp =
                        unit === 'Metric'
                            ? d.Temperature.Maximum.Value
                            : toImperial(d.Temperature.Maximum.Value)

                    // minimum predicted temperature
                    const minTemp =
                        unit === 'Metric'
                            ? d.Temperature.Minimum.Value
                            : toImperial(d.Temperature.Minimum.Value)

                    return {
                        icon: { day: d.Day.Icon, night: d.Night.Icon },
                        date: format(new Date(d.Date), 'ccc'),
                        temperature: { maxTemp, minTemp },
                    }
                })

                // resolve refined data
                resolve(refinedData)
            })
            // reject if any error occured
            .catch(e => {
                clearTimeout(id)
                reject(e)
            })
    })
}

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SearchData = ({ searchedCountries, showCountry }) => {
    if (searchedCountries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else if (searchedCountries.length === 0) {
        return (
            <div>
                No matches
            </div>
        )
    }
    else if (searchedCountries.length === 1) {
        return (
            <Country
                country={searchedCountries[0]}
            />
        )
    }
    else {
        return (
            <div>
                {searchedCountries.map((country, index) => {
                    return (
                        <div key={index}>
                            {country.name}
                            <button value={country.name} onClick={showCountry}>
                                show
                            </button>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const Country = ({ country }) => {
    const [weather, setWeather] = useState()

    const params = {
        access_key: process.env.REACT_APP_API_KEY,
        query: country.capital
    }

    useEffect(() => {
        axios
            .get('http://api.weatherstack.com/current', { params })
            .then(response => {
                setWeather(response.data)
            })
    }, [])

    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>languages</h3>
            <div>
                <ul>
                    {country.languages.map((language, index) => {
                        return (
                            <li key={index}>
                                {language.name}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <img src={country.flag} alt="country flag" width="200" />
            <h3>Weather in {country.capital}</h3>
            <Weather weather={weather} />
        </div>
    )
}

const Weather = ({ weather }) => {
    if (weather !== undefined) {
        return (
            <div>
                <b>temperature:</b> {weather.current.temperature} Celsius
                <br />
                <img src={weather.current.weather_icons} alt="country flag" />
                <br />
                <b>wind: </b>
                {weather.current.wind_speed} mph direction {weather.current.wind_dir}
            </div>
        )
    } 
    else {
        return <div />
    }
}

function App() {
    const [countries, setCountries] = useState([])
    const [searchedCountries, setSearchedCountries] = useState([])


    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleSearchChange = (event) => {
        let searched = []
        countries.forEach(country => {
            if (country.name.toLowerCase().includes(event.target.value.toLowerCase())) {
                searched.push(country)
            }
        })
        setSearchedCountries(searched)
    }

    const showCountry = (props) => {
        let countryToShow = []
        searchedCountries.forEach(country => {
            if (country.name === props.target.value) {
                countryToShow.push(country)
                setSearchedCountries(countryToShow)
            }
        })
    }

    return (
        <div>
            find countries
            <input
                onChange={handleSearchChange}
            />
            <SearchData
                searchedCountries={searchedCountries}
                showCountry={showCountry}
            />
        </div>
    );
}

export default App;

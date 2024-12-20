import React, { useState } from 'react';

export const WeatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = '894d45ccd243a292809c10a19c64532c';
    const difKelvin = 273.15;
    const [ciudad, setCiudad] = useState('');
    const [dataClima, setDataClima] = useState(null);
    const [error, setError] = useState(null);

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ciudad.length > 0) fetchClima();
    };

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            const data = await response.json();
            if (data.cod !== 200) {
                throw new Error(data.message);
            }
            setDataClima(data);
            setError(null);
        } catch (e) {
            console.error('Ocurrió un error:', e);
            setError(e.message);
        }
    };

    return (
        <>
            <div className='container'>
                <h1>Aplicación del Clima</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        value={ciudad}
                        onChange={handleCambioCiudad}
                        placeholder="Ingresa una ciudad"
                    />
                    <button type='submit'>Buscar</button>
                </form>
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                {
                    dataClima && (
                        <div>
                            <h2>{dataClima.name}</h2>
                            <p>Temperatura: {parseInt(dataClima.main.temp - difKelvin)}ºC</p>
                            <p>Condición Meteorológica: {dataClima.weather[0].description}</p>
                            <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="Icono del clima"/>
                        </div>
                    )
                }
            </div>
        </>
    );
};

import React, { useState } from 'react';

export default function App() {
  
  let [data, setData] = useState();
  let [city, setCity] = useState('');
  let [error, setError] = useState();

  const getWeather = (e) => {
    
    e.preventDefault();

    setError(false);
    setData();


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=8042dbed2fc685d3cf1315bed72a0237`)
      .then(response => response.json())
      .then(json => {
        if(json.cod !== 200) {
          throw new Error()
        }

        setData(json)

      })
      .catch(err => {
        setError(true);
        console.log(err.message)
      })
  }


  return (
  	<section>
      <form onSubmit={getWeather}>
        <input
          type="text"
          placeholder=" Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)} 
          required />

        <button type="submit">Get Weather</button>
      </form>

      {error ? <p>Could not find any data. Check spelling and try again.</p> : null}

      {data ? <Display {...data}/> : null}
  	</section>
  );
}

const Display = ({ weather, main }) => {

  return (
    <div>
      <p><img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt={weather[0].description}/></p>
      <p>{weather[0].main}</p>
      <p>Current Temp: {Math.trunc(main.temp)} &deg;F</p>
      <p>High: {Math.trunc(main.temp_max)} &deg;F</p>
    </div>
  )
}
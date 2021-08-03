import './App.css';
import {useState, useEffect} from "react";
import axios from "axios";




function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState(0);
  

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  const API_KEY  = "e219c1949a7cac8876c57db353c059b1";


  const fetchWeather = async () => {
    try{
      //await for requests
      await window.navigator.geolocation.getCurrentPosition(savePositionToState);
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`);
      setTemperature(res.data.main.temp);
      setWeather(res.data.weather[0].main);
      console.log(res.data);
    } catch(err){
      console.error(err)

    }
  }

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);


  return (
    <div className="App">
      <div className ="app__container">
      <div>
       <h1>Perth</h1>
      </div>
      <img src="http://openweathermap.org/img/wn/02n@2x.png"></img>
      <h2 className ="temp">{temperature} °C</h2>
      <h2 className="wet">{weather}</h2>
      </div>
    </div>
  );
}

export default App;

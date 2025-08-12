<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />
        <button @click="searchByCity" class="search-button">
          Search
        </button>
      </div>
    </div>
    
    <!-- Weather Display Section -->
    <div v-if="weatherData" class="weather-display">
      <div class="weather-card">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div class="weather-main">
          <img v-if="iconUrl" :src="iconUrl" :alt="weatherData.weather[0].description" class="weather-icon">
          <div class="temperature">
            <span class="temp-value">{{ temperature }}°C</span>
            <span class="weather-desc">{{ weatherData.weather[0].description }}</span>
          </div>
        </div>
        <div class="weather-details">
          <div class="detail-item">
            <span class="label">Humidity:</span>
            <span class="value">{{ weatherData.main.humidity }}%</span>
          </div>
          <div class="detail-item">
            <span class="label">Wind Speed:</span>
            <span class="value">{{ weatherData.wind.speed }} m/s</span>
          </div>
          <div class="detail-item">
            <span class="label">Pressure:</span>
            <span class="value">{{ weatherData.main.pressure }} hPa</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Loading or Error State -->
    <div v-else class="weather-placeholder">
      <p>Enter a city name and click Search to get weather information</p>
      <p>Or allow location access to get weather for your current location</p>
    </div>
  </div>
</template>

<script>
// The info section in 10.1.1 provided detailed information about this package 
import axios from "axios";

const apikey = "772dab7e5548d61cc71cc851eaf2dcdb"; // Your OpenWeatherMap API key

export default {
  name: "WeatherView",
  data() {
    return {
      city: "",
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: [],
    };
  },
  //computed is a property that is used to define a property that 
  //is dependent on other data properties. 
  //If we using a more easy to understand words to understand the concept: 
  //the derived value such as temperature automatically update when the relevant value change.
  computed: {
    //There are multiple way to obtain the data in Celsius format.
    //Calculation by yourself like below after data is retireved or via API parameters
    
    //Example of adding additional units requirement, if you choose this, remember to change section 3.1
    //https://api.openweathermap.org/data/2.5/weather?lat=XXX&lon=-XXX.15&appid={API key}&units=metric
    temperature() {
      return this.weatherData
        ? Math.floor(this.weatherData.main.temp - 273)
        : null;
    },
    //Get the current weather icon using the API link
    iconUrl() {
      return this.weatherData
        ? `https://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },
  //There are two steps involved in this, 
  //step 1: identify current location 
  //step 2: after identify, get the weather data straight based on the current location.
  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
    //Async in a easy to understand way means the method will run in backend thread, 
    //And it won't occupy the main thread, so the user experience is still smooth
    async fetchCurrentLocationWeather() {
      //The navigator.geolocation object is part of the Web API provided by modern web browsers
      //Please note this function is not belongs to Vue or openweather.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          //API link to obtain the current weather based on the current location browser identified 
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
          //await means wait for the fetchWeatherData method to complete before proceeding
          await this.fetchWeatherData(url);
        });
      }
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        //Returned data from API is stored as JSON file in weatherData
        this.weatherData = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
    // Add searchByCity method for the button click
    async searchByCity() {
      if (this.city.trim()) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
        await this.fetchWeatherData(url);
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.search-input {
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  width: 300px;
  text-align: center;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
}

.search-button {
  padding: 12px 30px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #0056b3;
}

.weather-display {
  margin-top: 30px;
}

.weather-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.weather-card h2 {
  margin: 0 0 20px 0;
  font-size: 1.8rem;
}

.weather-main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.weather-icon {
  width: 80px;
  height: 80px;
}

.temperature {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.temp-value {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.weather-desc {
  font-size: 1.2rem;
  text-transform: capitalize;
}

.weather-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.label {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 5px;
}

.value {
  font-size: 1.1rem;
  font-weight: bold;
}

.weather-placeholder {
  text-align: center;
  margin-top: 50px;
  color: #666;
}

.weather-placeholder p {
  margin: 10px 0;
  font-size: 1.1rem;
}
</style> 
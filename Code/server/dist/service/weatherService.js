import dotenv from 'dotenv';
dotenv.config();
// TODO: Define a class for the Weather object
class Weather {
    constructor(city, date, icon, tempF, windSpeed, humidity, iconDescription) {
        this.city = city;
        this.date = date;
        this.icon = icon;
        this.tempF = tempF;
        this.windSpeed = windSpeed;
        this.humidity = humidity;
        this.iconDescription = iconDescription;
    }
}
// TODO: Complete the WeatherService class
class WeatherService {
    constructor() {
        // TODO: Define the baseURL, API key, and city name properties
        this.city = '';
        this.baseURL = process.env.API_BASE_URL || '';
        this.apiKey = process.env.API_KEY || '';
    }
    formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${month}-${day}-${year}`;
    }
    // TODO: Create fetchLocationData method
    async fetchLocationData(query) {
        const response = await fetch(query);
        const data = await response.json();
        // console.log('Fetch location data:', data)
        return data;
    }
    // TODO: Create destructureLocationData method
    destructureLocationData(locationData) {
        //console.log('destructureLocationData', locationData)
        const coordinates = {
            name: locationData.name,
            lat: locationData.lat,
            lon: locationData.lon,
            country: locationData.country,
            state: locationData.state
        };
        return coordinates;
    }
    // TODO: Create buildGeocodeQuery method
    buildGeocodeQuery() {
        const query = `${this.baseURL}/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.apiKey}`;
        return query;
    }
    // TODO: Create buildWeatherQuery method
    buildWeatherQuery(coordinates) {
        console.log('Hello');
        const query = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;
        return query;
    }
    // TODO: Create fetchAndDestructureLocationData method
    async fetchAndDestructureLocationData() {
        const query = this.buildGeocodeQuery();
        const locationData = await this.fetchLocationData(query);
        //console.log('fetchAndDestructureLocationData', locationData)
        const coordinates = this.destructureLocationData(locationData[0]);
        return coordinates;
    }
    // TODO: Create fetchWeatherData method
    async fetchWeatherData(coordinates) {
        const response = await fetch(this.buildWeatherQuery(coordinates));
        const data = await response.json();
        return data;
        //console.log(data)
        // const list = data.list[0]
        // console.log(list)
        //const list1 =data.list
        //const currentWeather = this.parseCurrentWeather(list)
        //const forecast = this.buildForecastArray(currentWeather, list1)
    }
    // // TODO: Build parseCurrentWeather method
    parseCurrentWeather(response) {
        // console.log('parseCurrentWeather', response)
        const { list } = response;
        const currentWeather = list[0];
        const weather = new Weather(this.city, this.formatDate(new Date(currentWeather.dt_txt)), currentWeather.weather[0].icon, currentWeather.main.temp, currentWeather.wind.speed, currentWeather.main.humidity, currentWeather.weather[0].description);
        // const weather = new Weather(
        //     this.city,
        //     list[0].weather[0].icon,
        //     list[0].weather[0].description,
        //     list[0].main.temp,
        //     list[0].wind.speed,
        //     list[0].main.humidity,
        //     list[0].dt_txt
        // )
        return weather;
    }
    // TODO: Complete buildForecastArray method
    buildForecastArray(currentWeather, weatherData) {
        const forecastArray = [currentWeather];
        for (let i = 1; i < weatherData.length; i += 8) {
            const { weather, main, wind, dt_txt } = weatherData[i];
            forecastArray.push(new Weather(this.city, this.formatDate(new Date(dt_txt)), weather[0].icon, main.temp, wind.speed, main.humidity, weather[0].description));
            //   new Weather(
            //     this.city,
            //     weather[0].icon,
            //     weather[0].description,
            //     main.temp,
            //     wind.speed,
            //     main.humidity,
            //     dt_txt
            //   )
            // )
        }
        return forecastArray;
    }
    // TODO: Complete getWeatherForCity method
    async getWeatherForCity(city) {
        this.city = city;
        const coordinates = await this.fetchAndDestructureLocationData();
        const weatherData = await this.fetchWeatherData(coordinates);
        const currentWeather = this.parseCurrentWeather(weatherData);
        return this.buildForecastArray(currentWeather, weatherData.list);
        //const weatherData1 = await fetch (this.buildGeocodeQuery())
        //const weatherData2 = await weatherData1.json()
        //console.log('getWeatherForCity', weatherData2)
        //console.log('getWeatherForCity', coordinates)
        //const currentWeather = this.parseCurrentWeather(weatherData)
        //return this.buildForecastArray
    }
}
export default new WeatherService();
// export  { WeatherService, Coordinates };

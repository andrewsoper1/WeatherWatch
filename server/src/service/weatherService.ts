import { LargeNumberLike } from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;

}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  tempF: number;
  windSpeed: number;
  humidity: number;
  iconDescription: string;

  constructor(city: string, date: string,icon: string,  tempF: number, windSpeed: number, humidity: number, iconDescription: string ) {
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
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private city: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.city = '';
  }
  // TODO: Create fetchLocationData method
    private async fetchLocationData(query: string) {
      const response = await fetch(query)
      return response
      
    }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const coordinates: Coordinates = {
      name: locationData.name,
      lat: locationData.lat,
      lon: locationData.lon,
      country: locationData.country,
      state: locationData.state

    }
    return coordinates;
    
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    const query = `${this.baseURL}/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.apiKey}`
    return query;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const locationData: Coordinates = {
      name: coordinates.name,
      lat: coordinates.lat,
      lon: coordinates.lon,
      country: coordinates.country,
      state: coordinates.state
    }
    const query = `${this.baseURL}/data/2.5/forecast?lat=${locationData.lat}&lon=${locationData.lon}&appid=${this.apiKey}`
    return query;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const query = this.buildGeocodeQuery()
    const locationData = await this.fetchLocationData(query)
    const coordinates = this.destructureLocationData(locationData)


  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch (this.buildWeatherQuery(coordinates))
    return response;
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const data = response.json()
    return data;

  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const weather: Weather = {
    city: currentWeather.city,
    date: currentWeather.date,
    icon: currentWeather.icon,
    tempF: currentWeather.tempF,
    windSpeed: currentWeather.windSpeed,
    humidity: currentWeather.humidity,
    iconDescription: currentWeather.iconDescription

    }

  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    
  }
}

export default new WeatherService();

import { Router } from 'express';
const router = Router();
import HistoryService from '../../service/historyService.js';
// import HistoryService from '../../service/weatherService.js';
import WeatherService from '../../service/weatherService.js';
// import { WeatherService} from '../../service/weatherService.js';
// const ws  = new WeatherService();
router.post('/', async (req, res) => {
    const city = req.body.cityName;
    const weatherData = await WeatherService.getWeatherForCity(city);
    res.json(weatherData);
    await HistoryService.addCity(city);
    //res.json(weatherData);
    // const coordinates: Coordinates = {
    //   lat: 40.5710454,
    //   lon: -111.8953815
    // }
    // const ws  = new WeatherService();
    // const weatherData = await ws.fetchWeatherData(coordinates)
    // console.log(weatherData)
});
router.get('/history', async (_req, res) => {
    try {
        const cities = await HistoryService.getCities();
        res.json(cities);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
export default router;

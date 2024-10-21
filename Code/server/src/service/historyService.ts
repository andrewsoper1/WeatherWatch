import fs from 'fs/promises'
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import path from  'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(name:string, id:string) {
    this.name = name;
    this.id = id;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    const data = await fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf-8')
      
    return JSON.parse(data);
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    await fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(cities))
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const cities = await this.read();
    return cities.map((city: City) => new City(city.name, city.id));
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
   const cities = await this.read();
   cities.push(new City(city,  uuidv4()));
   await this.write(cities);
  
 
}
}

export default new HistoryService();

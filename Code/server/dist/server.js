import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
// Import the routes
import routes from './routes/index.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// TODO: Serve static files of entire client dist folder
// TODO: Implement middleware for parsing JSON and urlencoded form data
// TODO: Implement middleware to connect the routes
app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const staticFolder = path.join(__dirname, '../client/dist');
app.use(express.static(staticFolder));
app.use(routes);
// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

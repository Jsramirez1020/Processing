import express from 'express'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'
import routeIndex from './routes/index.js';

const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url))


app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('index'));
app.get('/process', (req, res) => res.render('process'));
app.use(routeIndex);

app.listen(3000);
console.log('server  is listening on port', 3000);


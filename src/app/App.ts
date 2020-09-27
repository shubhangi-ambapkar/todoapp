import express, { Application } from "express";
import bodyParser from "body-parser";
import connect from './Db';
import { TodoRouter } from './TodoController';
import * as path from 'path';

const morgan = require('morgan');

const app: Application = express();
const port: Number = 5000 || process.env.PORT;

connect('mongodb://localhost:27017/todos');

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const staticPath = path.join(__dirname, 'client');
const nodeModules = path.join(__dirname, '..', 'node_modules');

app.use('/', express.static(staticPath));
app.use('/node_modules', express.static(nodeModules));
app.use('/api/todo', TodoRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


import 'reflect-metadata';
import { AppDataSource } from "./database/data-source"
import express from 'express';
import routers from './routes';

const app = express()

app.use(express.json())

app.use(routers) 

AppDataSource.initialize().then(() => {
    app.listen(3333, () => console.log('Backend on...'))
}
).catch(err => console.log(err))
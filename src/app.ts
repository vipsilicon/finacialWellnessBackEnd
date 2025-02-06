import express, { Express } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { makeRoutes } from './routes';

class App {

    express: Express;

    constructor(){
        this.express = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.express.set('trust proxy', false);
        this.express.use(cors());
        this.express.use(express.urlencoded({ limit: '5mb', extended: true }));
        this.express.use(express.json({ limit: '5mb' }));
        // this.express.use()
    }

    routes(){
        const routes = makeRoutes();
        const expressRouter = routes.initialize();
        this.express.use(expressRouter);
        // this.express.use()
    }
}

export const makeApp = (): App => {
    return new App();
}
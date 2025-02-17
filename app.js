import express from 'express';
import produtoRoutes from './src/routes/ProdutoRoute.js';
import cors from 'cors';

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes() {
        this.app.use('/produtos/', produtoRoutes);
    }
}

export default new App().app;

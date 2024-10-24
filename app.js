import express from 'express';
import produtoRoutes from './src/routes/ProdutoRoute.js';

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/produtos/', produtoRoutes);
    }
}

export default new App().app;

import express from 'express';
// import ErrorHandler from './Middlewares/ErrorHandler';
import routes from './routes/Routes';
import cors from 'cors';
import connectToDatabase from './models/Connection';

export default class App {
    public app: express.Express;

    constructor() {
        this.app = express();

        this.config();
        this.routes();

        // Não remover essa rota
        this.app.get('/', (req, res) => res.json({ ok: true }));
    }

    private config(): void {
        // const accessControl: express.RequestHandler = (_req, res, next) => {
        //   res.header('Access-Control-Allow-Origin', '*');
        //   res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
        //   res.header('Access-Control-Allow-Headers', '*');
        //   next();
        // };
        const corsOptions = {
            origin: [
                'https://vr-autopecas.vercel.app',
                'https://dashboard-python-production.up.railway.app/api/upload-excel',
                'http://localhost:3000',
                'http://127.0.0.1:5000/api/upload-excel',
            ]
        };

        this.app.use(cors(corsOptions));

        this.app.use(express.json());
        // this.app.use(accessControl);
    }

    private routes(): void {
        this.app.use('/property', routes);
    }

    public start(PORT: string | number): void {
        connectToDatabase()
            .then(() => {
                this.app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));
            })
            .catch((error: any) => {
                console.log('Connection with database generated an error:\r\n');
                console.error(error);
                console.log('\r\nServer initialization cancelled');
                process.exit(0);
            });
    }
}


// const app = express();
// app.use(express.json());
// app.use(routes);
// app.use(ErrorHandler.handle);

// export default app;

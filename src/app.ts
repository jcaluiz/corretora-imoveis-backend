import 'dotenv/config';
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
        const corsOptions = {
            origin: [
                process.env.FRONT_URL as string,
                'http://localhost:3000',
                'http://localhost:3006',
                process.env.BACK_URL as string,
            ]
        };

        this.app.use(cors(corsOptions));

        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}))
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

import 'dotenv/config';
import App from './app';

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.PORT || 3006;

// não remova esse endpoint
new App().start(port);

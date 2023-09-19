// Importar módulos en un archivo .mjs
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import db from '../config/db.mjs';

// Importar rutas desde archivos .mjs
import userRoute from './routes/users.mjs';
import mainRoute from './routes/main.mjs';

// Configuration
var port = process.env.PORT || 3000;
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// Routes
app.use('/', mainRoute);
app.use('/users', userRoute);

// Start
app.listen(port, () =>{
    console.log(`app listening on ${port}`);
});

export default app;
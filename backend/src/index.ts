import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import router from './routes';
import { errorHandler } from './middleware/errorHandler';
import { AppDataSource } from './config/data-source';
import { PORT } from './config/env';

const app = express();

app.use(express.json());

router.forEach(({path, route}) => {
    app.use(path, route);
});

app.use(errorHandler);

AppDataSource.initialize()
.then(() => {
    console.log('📦 Database connected');

    app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.error('❌ Database connection failed:', error);
});
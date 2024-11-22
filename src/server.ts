import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';
import { connectDb, disconnectDB } from './config/database';
import { rideRoutes } from './routers/ride-router';

const app = express();

app.use(cors()).use(express.json()).use('/ride', rideRoutes);

function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
}

async function close(): Promise<void> {
    await disconnectDB();
}

const port = 8080;

init().then(() => {
    app.listen(port, () => {
        console.log(`🌍 Server is listening on port ${port}.`);
    });
});

process.on('SIGINT', async () => {
    console.log('🚪 Server shutting down...');
    await close();
    process.exit(0);
});

export default app;

import { createServer } from 'http';
import { app } from './app';
import { connectToMongoDb } from './db';
connectToMongoDb();

const httpServer = createServer(app);
export { httpServer };

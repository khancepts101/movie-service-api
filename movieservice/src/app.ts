import express from 'express';
import loadRoutes from './loaders/routes.js'

const app = express();
loadRoutes(app)
export default app;
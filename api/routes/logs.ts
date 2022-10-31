import express, { Request, Response } from 'express';
import LogModel from '../models/Log';
import logsController from '../controllers/LogsController';

const routerLogs = express.Router();

routerLogs.post('/logs', logsController.create);

export default routerLogs;
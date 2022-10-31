import { Request, Response, NextFunction } from 'express';
import LogModel from '../models/Log';

class LogsController {

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this._validateData(req.body);
            const log = await LogModel.create(data);
            res.json(log);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    _validateData = async (data: any) => {
        const attributes = ['description'];
        const log: any = {};

        for (const attribute of attributes) {
            if (!data[attribute]) {
                throw new Error(`The attribute "${attribute}" is required.`);
            }

            log[attribute] = data[attribute];
        }

        return log;
    }
}

export default new LogsController();
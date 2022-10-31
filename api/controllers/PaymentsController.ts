import { Request, Response, NextFunction } from 'express';
import PaymentsModel from '../models/Payment';
import LogModel from '../models/Log';

class PaymentsController {

  index = async (req: Request, res: Response, next: NextFunction) => {
    const payments = await PaymentsModel.findAll({});
    res.json(payments);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._validateData(req.body);
      const payment = await PaymentsModel.create(data);
      LogModel.create({
        description: `Payment form ${data.form} created.`
      })
      res.json(payment);
    }
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req: Request, res: Response, next: NextFunction) => {
    const payment = await PaymentsModel.findByPk(req.params.paymentId);
    res.json(payment);
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: any = req.params.paymentId;
      const data = await this._validateData(req.body);
      await PaymentsModel.update(data, {
        where: {
          id: id
        }
      });
      LogModel.create({
        description: `Payment form ${data.form} updated.`
      })
      res.json(await PaymentsModel.findByPk(id));
    }
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await PaymentsModel.destroy({
      where: {
        id: req.params.paymentId
      }
    });
    LogModel.create({
      description: `Payment deleted.`
    })
    res.json({});
  }

  _validateData = async (data: any) => {
    const attributes = ['form'];
    const payment: any = {};

    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      payment[attribute] = data[attribute];
    }

    return payment;
  }

}

export default new PaymentsController();
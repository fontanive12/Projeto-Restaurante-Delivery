import { Request, Response, NextFunction } from 'express';
import pdf from 'html-pdf';
import PaymentsModel from '../models/Payment';
import LogModel from '../models/Log';
import { Op } from 'sequelize';

class PaymentsController {

  index = async (req: Request, res: Response, next: NextFunction) => {
    const payments = await PaymentsModel.findAll({});
    res.json(payments);
  }

  pdf = async (req: Request, res: Response, next: NextFunction) => {
    const payments = await PaymentsModel.findAll();
    let tBody: string = '';
    
    for (let i in payments) {
      let payment = payments[i];

      tBody +=
        `<tr>
        <td>${payment.form}</td>
      </tr>`;
    }

    const html =
      `<h1>Lista de formas de pagamento</h1>
    <table style="width:100%" border="1">
      <tr>
        <th>Forma de pagamento</th>
      </tr>
      ${tBody}
    </table>
    `;

    const options: pdf.CreateOptions = {
      type: 'pdf',
      format: 'A3',
      orientation: 'portrait'
    }

    pdf.create(html, options).toBuffer((err: any, buffer: any) => {
      res.header("Content-Disposition", "attachment;");
      if (err) {
        return res.status(500).json(err)
      }


      res.end(buffer)
    })
  }

  csv = async (req: Request, res: Response, next: NextFunction) => {
    const payments = await PaymentsModel.findAll();
    let csv: string = `forma de pagamento;
    `;

    for (let i in payments) {
      let payment = payments[i];
      csv += `${payment.form};
      `;
    }

    res.header("Content-type", "text/csv");
    res.header("Content-Disposition", "attachment; filename=usuarios.csv");
    res.header("Pragma", "attachment; no-cache");
    res.header("Expires", "0");

    res.send(csv);
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

  _validateData = async (data: any, id?: any) => {
    const attributes = ['form'];
    const payment: any = {};

    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      payment[attribute] = data[attribute];

      if (await this._checkIfPaymentExists(payment.form.toLowerCase(), id)) {
        throw new Error(`The payment form with name "${payment.form}" already exists.`);
      }
    }

    return payment;
  }

  _checkIfPaymentExists = async (form: string, id?: string) => {
    const where: any =
    {
      form: form.toLowerCase()
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await PaymentsModel.count({
      where: where
    });

    return count > 0;
  }

}

export default new PaymentsController();
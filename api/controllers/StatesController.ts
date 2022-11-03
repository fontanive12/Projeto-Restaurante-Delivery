import { Request, Response, NextFunction } from 'express';
import pdf from 'html-pdf';
import StateModel from '../models/State';
import LogModel from '../models/Log';
import { Op } from 'sequelize';

class StatesController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    const states = await StateModel.findAll({});
    res.json(states);
  }

  pdf = async (req: Request, res: Response, next: NextFunction) => {
    const states = await StateModel.findAll();
    let tBody: string = '';

    for (let i in states) {
      let state = states[i];

      tBody +=
        `<tr>
        <td>${state.name}</td>
        <td>${state.province}</td>
      </tr>`;
    }

    const html =
      `<h1>Lista de estados</h1>
    <table style="width:100%" border="1">
      <tr>
        <th>Nome</th>
        <th>Província</th>
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
    const states = await StateModel.findAll();
    let csv: string = `name;province;`;

    for (let i in states) {
      let state = states[i];
      csv += `
${state.name};${state.province}`;
    }

    res.header("Content-type", "text/csv");
    res.header("Content-Disposition", "attachment; filename=states.csv");
    res.header("Pragma", "attachment; no-cache");
    res.header("Expires", "0");
    res.send(csv);
  }




  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._validateData(req.body);
      const state = await StateModel.create(data);
      LogModel.create({
        description: `State ${data.name} created.`
      })
      res.json(state);
    }
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req: Request, res: Response, next: NextFunction) => {
    const state = await StateModel.findByPk(req.params.stateId);
    res.json(state);
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: any = req.params.stateId;
      const data = await this._validateData(req.body);
      await StateModel.update(data, {
        where: {
          id: id
        }
      });

      LogModel.create({
        description: `State ${data.name} updated.`
      })
      res.json(await StateModel.findByPk(id));
    }
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await StateModel.destroy({
      where: {
        id: req.params.stateId
      }
    });
    LogModel.create({
      description: `State deleted.`
    })
    res.json({});
  }

  _validateData = async (data: any, id?: any) => {
    const attributes = ['name', 'province'];
    const state: any = {};

    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      state[attribute] = data[attribute];

      if (await this._checkIfStateExists(state.name.toLowerCase(), id)) {
        throw new Error(`The state with name "${state.name}" already exists.`);
      }
    }

    return state;
  }

  _checkIfStateExists = async (name: string, province: string, id?: string) => {
    const where: any =
    {
      name: name.toLowerCase(),
      province: province.toLowerCase()
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await StateModel.count({
      where: where
    });

    return count > 0;
  }

}

export default new StatesController();
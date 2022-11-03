import { Op } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import pdf from 'html-pdf';
import CityModel from '../models/City';
import StateModel from '../models/State';
import LogModel from '../models/Log';

class CitiesController {

  index = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.query;
    const where: any = {};

    if (params.StateId) {
      where.StateId =
      {
        [Op.eq]: params.StateId
      };
    }

    const cities = await CityModel.findAll(
      {
        where: where,
        include: [{
          model: StateModel,
          required: false,
          attributes: ['name', 'province']
        }]
      });

    res.json(cities);

    console.log(StateModel.name)

  }

  pdf = async (req: Request, res: Response, next: NextFunction) => {
    const cities = await CityModel.findAll();
    const states = await StateModel.findAll();
    let tBody: string = '';

    for (let i in cities) {
      let city = cities[i];
      let state = states[i];
      tBody +=
        `<tr>
        <td>${city.name}</td>
        <td>${state.name}</td>
      </tr>`;
    }

    const html =
      `<h1>Lista de usuários</h1>
    <table style="width:100%" border="1">
      <tr>
        <th>Nome</th>
        <th>Estado</th>
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
    const cities = await CityModel.findAll();
    const states = await StateModel.findAll();
    let csv: string = `cidade;estado;
    `;

    for (let i in cities) {
      let city = cities[i];
      let state = states[i];
      csv += `${city.name};${state.name};
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
      const city = await CityModel.create(data);
      LogModel.create({
        description: `City ${data.name} created.`
      })
      res.json(city);
    }
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req: Request, res: Response, next: NextFunction) => {
    const state = await CityModel.findByPk(req.params.cityId);
    res.json(state);
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.cityId;
      const data = await this._validateData(req.body);
      await CityModel.update(data,
        {
          where: {
            id: id
          }
        });

      LogModel.create({
        description: `City ${data.name} updated.`
      })
      res.json(await CityModel.findByPk(id));
    }
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await CityModel.destroy(
      {
        where: {
          id: req.params.cityId
        }
      });
      LogModel.create({
        description: `City deleted.`
      })
    res.json({});
  }

  _validateData = async (data: any) => {
    const attributes = ['name', 'StateId'];
    const city: any = {};

    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      city[attribute] = data[attribute];
    }

    if (await this._checkIfCityAndStateExists(city.name, city.StateId)) {
      throw new Error(`The city in the State "${city.StateId}" already exists.`);
    }

    return city;
  }

  _checkIfCityAndStateExists = async (name: string, state: string) => {
    const cities = await CityModel.count(
      {
        where:
        {
          [Op.and]: [
            { StateId: state },
            { name: name }
          ]
        }
      });

    return cities > 0;
  }

}

export default new CitiesController();
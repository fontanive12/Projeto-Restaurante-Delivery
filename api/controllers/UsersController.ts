import { Op } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import fs from 'fs';
import pdf from 'html-pdf';
import UserModel from '../models/User';
import LogModel from '../models/Log';
import BaseController from './BaseController';
import CityModel from '../models/City';
import { Article } from 'phosphor-react';

class UsersController {

  index = async (req: Request, res: Response) => {
    const params = req.query;
    const limit: number = parseInt(params.limit as string) || 100;
    const page: number = parseInt(params.page as string) || 1;
    const offset: number = (page - 1) * limit;
    const sort: any = params.sort || 'id';
    const order: any = params.order || 'ASC';
    const where: any = {};

    if (params.name) {
      where.name =
      {
        [Op.iLike]: `%${params.name}%`
      };
    }

    if (params.email) {
      where.email =
      {
        [Op.iLike]: `%${params.email}%`
      };
    }

    if (params.min_age) {
      where.age =
      {
        [Op.gte]: params.min_age
      };
    }

    if (params.max_age) {
      if (!where.age) {
        where.age = {};
      }

      where.age[Op.lte] = params.max_age;
    }

    if (params.sex) {
      where.sex = params.sex;
    }

    const users = await UserModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [[sort, order]],
      include: [{
        model: CityModel,
        required: false,
        attributes: ['name']
      }]
    });
    res.json(users);
  }


  pdf = async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserModel.findAll();
    const cities = await CityModel.findAll();
    
    let tBody: string = '';
    
    for (let i in users) {
      let user = users[i];
      let city = cities[i];

      tBody +=
        `<tr>
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>${user.sex}</td>
        <td>${user.phoneNumber}</td>
        <td>${user.email}</td>
        <td>${city.name}</td>
      </tr>`;
    }

    const html =
      `<h1>Lista de usuários</h1>
    <table style="width:100%" border="1">
      <tr>
        <th>Nome</th>
        <th>Idade</th>
        <th>Gênero</th>
        <th>Telefone</th>
        <th>Email</th>
        <th>Cidade</th>
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
    const users = await UserModel.findAll();
    const cities = await CityModel.findAll();
    let csv: string = `name;age;sex;email;cidade;
    `;

    for (let i in users) {
      let user = users[i];
      let city = cities[i];
      csv += `${user.name};${user.age};${user.sex};${user.phoneNumber}${user.email}${city.name}
      `;
    }

    res.header("Content-type", "text/csv");
    res.header("Content-Disposition", "attachment; filename=usuarios.csv");
    res.header("Pragma", "attachment; no-cache");
    res.header("Expires", "0");

    res.send(csv);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    try {
      const data = await this._validateData(req.body);
      const user = await UserModel.create(data);
      LogModel.create({
        description: `User ${data.name} created.`
      })
      res.json(user);

    }
    catch (error: any) {
      res.status(400).json({ error: error.message + "" });
    }
  }


  criarEmail = (req: Request, res: Response, next: NextFunction) => {

    let email_user = 'franciele.fontanive@universo.univates.br';
    let email_pass = 'Fran458932';
    let email_to = req.params.email;
    let email_subject = 'Bateu aquela fome?';
    let email_html = `Peça já o seu almoço`;

    console.log("destinatario:" + email_to);

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email_user,
        pass: email_pass
      }
    });

    var mailOptions = {
      from: email_user,
      to: email_to,
      subject: email_subject,
      html: email_html
    };

    transporter.sendMail(mailOptions, (error: Error | null, info: SMTPTransport.SentMessageInfo) => {
      if (error) {
        console.log('Erro ao enviar e-mail: ' + error)
      } else {
        console.log('E-mail enviado: ' + info.response);
      }
    })
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findByPk(req.params.userId);
    res.json(user);
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.userId;
      const data = await this._validateData(req.body, id);
      await UserModel.update(data, {
        where: {
          id: id
        }
      });
      LogModel.create({
        description: `User ${data.name} updated.`
      })
      res.json(await UserModel.findByPk(id));
    }
    catch (error: any) {
      res.status(400).json({ error: error.message + "" });
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await UserModel.destroy({
      where: {
        id: req.params.userId
      }
    });
    LogModel.create({
      description: `User deleted.`
    })
    res.json({});
  }

  _validateData = async (data: any, id?: any) => {
    const attributes = ['name', 'age', 'sex', 'phoneNumber', 'number', 'email', 'password', 'CityId'];
    const user: any = {};

    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      console.log(data[attribute]);
      user[attribute] = data[attribute];
    }

    if (await this._checkIfEmailExists(user.email, id)) {
      throw new Error(`The user with mail address "${user.email}" already exists.`);
    }

    return user;
  }

  _checkIfEmailExists = async (email: string, id?: string) => {
    const where: any =
    {
      email: email
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await UserModel.count({
      where: where
    });

    return count > 0;
  }
}

export default new UsersController();
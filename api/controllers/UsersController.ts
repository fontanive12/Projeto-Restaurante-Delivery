import { Op } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/User';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

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
      order: [[sort, order]]
    });
    res.json(users);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._validateData(req.body);
      const user = await UserModel.create(data);

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



  // _sendMail = async (req: Request, res: Response, next: NextFunction) => {
  //   let user = 'fontanive12@gmail.com';
  //   let password = 'fran458932';
  //   let to = req.params.email;
  //   let subject = 'Finalmenete!';
  //   let content = 'You have been registered in the RHPlus system!';
  //   let html = 'Só um e-mail de <i>exemplo</i>, com <b>html</b>, e acentuação.';

  //   var transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: user,
  //       pass: password
  //     }
  //   });

  //   var mailOptions = {
  //     from: user,
  //     to: to,
  //     subject: subject,
  //     text: content
  //   }

  //   transporter.sendMail(mailOptions, (error: Error | null, info: SMTPTransport.SentMessageInfo) => {
  //     if (error) {
  //       console.log('Erro on sendMail:' + error);
  //     } else {
  //       console.log('Mail sent!');
  //     }
  //   });
  // }

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
    res.json({});
  }



  _validateData = async (data: any, id?: any) => {
    const attributes = ['name', 'age', 'sex', 'email', 'password'];
    const user: any = {};

    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

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
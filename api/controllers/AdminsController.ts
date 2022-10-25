import { Op } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import AdminModel from '../models/Admin';

class AdminsController {

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

    const Admins = await AdminModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [[sort, order]]
    });
    res.json(Admins);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._validateData(req.body);
      const admin = await AdminModel.create(data);
      res.json(admin);
    }
    catch (error: any) {
      res.status(400).json({ error: error.message + "" });
    }
  }

  show = async (req: Request, res: Response, next: NextFunction) => {
    const admin = await AdminModel.findByPk(req.params.AdminId);
    res.json(admin);
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.AdminId;
      const data = await this._validateData(req.body, id);
      await AdminModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await AdminModel.findByPk(id));
    }
    catch (error: any) {
      res.status(400).json({ error: error.message + "" });
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await AdminModel.destroy({
      where: {
        id: req.params.AdminId
      }
    });
    res.json({});
  }



  _validateData = async (data: any, id?: any) => {
    const attributes = ['name', 'birth_date', 'age', 'genre', 'position', 'email', 'password'];
    const admin: any = {};

    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      admin[attribute] = data[attribute];
    }

    if (await this._checkIfEmailExists(admin.email, id)) {
      throw new Error(`The admin with mail address "${admin.email}" already exists.`);
    }

    return admin;
  }

  _checkIfEmailExists = async (email: string, id?: string) => {
    const where: any =
    {
      email: email
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await AdminModel.count({
      where: where
    });

    return count > 0;
  }
}

export default new AdminsController();
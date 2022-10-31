import { Request, Response, NextFunction } from 'express';
import CategoryModel from '../models/Category';
import LogModel from '../models/Log';

class CategoriesController {

  index = async (req: Request, res: Response, next: NextFunction) => {
    const categories = await CategoryModel.findAll({});
    res.json(categories);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._validateData(req.body);
      const category = await CategoryModel.create(data);
      LogModel.create({
        description: `Category ${data.description} created.`
      })
      res.json(category);
    }
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req: Request, res: Response, next: NextFunction) => {
    const category = await CategoryModel.findByPk(req.params.categoryId);
    res.json(category);
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: any = req.params.categoryId;
      const data = await this._validateData(req.body);
      await CategoryModel.update(data, {
        where: {
          id: id
        }
      });
      LogModel.create({
        description: `Category ${data.description} updated.`
      })
      res.json(await CategoryModel.findByPk(id));
    }
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await CategoryModel.destroy({
      where: {
        id: req.params.categoryId
      }
    });
    LogModel.create({
      description: `Category deleted.`
    })
    res.json({});
  }

  _validateData = async (data: any) => {
    const attributes = ['description'];
    const category: any = {};

    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      category[attribute] = data[attribute];
    }

    return category;
  }

}

export default new CategoriesController();
import { Op } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import ProductModel from '../models/Product';
import CategoryModel from '../models/Category';

class CitiesController {

  index = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.query;
    const where: any = {};

    if (params.CategoryId) {
      where.CategoryId =
      {
        [Op.eq]: params.CategoryId
      };
    }

    const products = await ProductModel.findAll(
      {
        where: where,
        include: [{
          model: CategoryModel,
          required: false,
          attributes: ['description']
        }]
      });

    res.json(products);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._validateData(req.body);
      const product = await ProductModel.create(data);
      res.json(product);
    }
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req: Request, res: Response, next: NextFunction) => {
    const category = await ProductModel.findByPk(req.params.productId);
    res.json(category);
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.productId;
      const data = await this._validateData(req.body);
      await ProductModel.update(data,
        {
          where: {
            id: id
          }
        });

      res.json(await ProductModel.findByPk(id));
    }
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await ProductModel.destroy(
      {
        where: {
          id: req.params.productId
        }
      });
    res.json({});
  }

  _validateData = async (data: any) => {
    const attributes = ['name', 'description', 'size', 'price', 'CategoryId'];
    const product: any = {};

    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      product[attribute] = data[attribute];
    }

    if (await this._checkIfCityAndStateExists(product.name, product.CategoryId)) {
      throw new Error(`The product in the Category "${product.CategoryId}" already exists.`);
    }

    return product;
  }

  _checkIfCityAndStateExists = async (name: string, category: string) => {
    const products = await ProductModel.count(
      {
        where:
        {
          [Op.and]: [
            { CategoryId: category },
            { name: name }
          ]
        }
      });

    return products > 0;
  }

}

export default new CitiesController();


// {
//   "name": "xis salada",
//   "description": "cheio de delicias",
//   "size": "grande",
//   "price": 20,
//   "CategoryId": "oi"
// }
import { Op } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import pdf from 'html-pdf';
import ProductModel from '../models/Product';
import CategoryModel from '../models/Category';
import LogModel from '../models/Log';
import BaseController from './BaseController';

class CitiesController extends BaseController {

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

  pdf = async (req: Request, res: Response, next: NextFunction) => {
    const products = await ProductModel.findAll();
    const categories = await CategoryModel.findAll();
    
    let tBody: string = '';
    
    for (let i in products) {
      let product = products[i];
      let category = categories[i];

      tBody +=
        `<tr>
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td>${product.size}</td>
        <td>${product.price}</td>
        <td>${category.description}</td>
      </tr>`;

      console.log(category.description)
    }

    const html =
      `<h1>Lista de usuários</h1>
    <table style="width:100%" border="1">
      <tr>
        <th>Nome</th>
        <th>Descrição</th>
        <th>Tamanho</th>
        <th>Preço</th>
        <th>Categoria</th>
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
    const products = await ProductModel.findAll();
    const categories = await CategoryModel.findAll();
    let csv: string = `name;description;size;price;category;
    `;

    for (let i in products) {
      let product = products[i];
      let category = categories[i];
      csv += `${product.name};${product.description};${product.size};${product.price}${category.description}
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
      const product = await ProductModel.create(data);
      LogModel.create({
        description: `Product ${data.name} created.`
      })
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
      LogModel.create({
        description: `Product ${data.name} updated.`
      })
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
      
    LogModel.create({
      description: `Product deleted.`
    })
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
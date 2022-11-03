import { Request, Response, NextFunction } from 'express';
import pdf from 'html-pdf';
import { Op } from 'sequelize';
import CategoryModel from '../models/Category';
import LogModel from '../models/Log';

class CategoriesController {

  index = async (req: Request, res: Response, next: NextFunction) => {
    const categories = await CategoryModel.findAll({});
    res.json(categories);
  }

  pdf = async (req: Request, res: Response, next: NextFunction) => {
    const categories = await CategoryModel.findAll();
    let tBody: string = '';

    for (let i in categories) {
      let category = categories[i];

      tBody +=
        `<tr>
        <td>${category.description}</td>
      </tr>`;
    }

    const html =
      `<h1>Lista de categorias</h1>
    <table style="width:100%" border="1">
      <tr>
        <th>Nome</th>
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
    const categories = await CategoryModel.findAll();
    let csv: string = `description;`;

    for (let i in categories) {
      let category = categories[i];
      csv += `
${category.description};`;
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

  _validateData = async (data: any, id?: string) => {
    const attributes = ['description'];
    const category: any = {};

    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      category[attribute] = data[attribute];

      // if (await this._checkIfCategoryExists(category.description.toLowerCase(), id)) {
      //   throw new Error(`The category with name "${category.description}" already exists.`);
      // }
    }

    return category;
  }

  // _checkIfCategoryExists = async (description: string, id?: string) => {
  //   const where: any =
  //   {
  //     description: description.toLowerCase(),
  //   };

  //   if (id) {
  //     where.id = { [Op.ne]: id }; // WHERE id != id
  //   }

  //   const count = await CategoryModel.count({
  //     where: where
  //   });

  //   return count > 0;
  // }

}

export default new CategoriesController();
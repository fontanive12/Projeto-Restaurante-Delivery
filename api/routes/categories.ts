import express, { Request, Response } from 'express';
import CategoryModel from '../models/Category';
import categoriesController from '../controllers/CategoriesController';
const routerCategories = express.Router();

const validateStateId = async (req: Request, res: Response, next: any) => {
    const category = await CategoryModel.findByPk(req.params.categoryId);

    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }

    next();
}

routerCategories.get('/categories/pdf', categoriesController.pdf);
routerCategories.get('/categories/csv', categoriesController.csv);
routerCategories.post('/categories', categoriesController.create);
routerCategories.get('/categories', categoriesController.index);
routerCategories.get('/categories/:categoryId', validateStateId, categoriesController.show);
routerCategories.put('/categories/:categoryId', validateStateId, categoriesController.update);
routerCategories.delete('/categories/:categoryId', validateStateId, categoriesController.delete);

export default routerCategories;
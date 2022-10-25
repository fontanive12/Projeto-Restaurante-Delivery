import express, { Request, Response } from 'express';
import CategoryModel from '../models/Category';
import categoriesController from '../controllers/CategoriesController';
const routerCategories = express.Router();

const validateCategoryId = async (req: Request, res: Response, next: any) => {
    const category = await CategoryModel.findByPk(req.params.categoryIdId);

    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }

    next();
}

routerCategories.post('/categories', categoriesController.create);
routerCategories.get('/categories', categoriesController.index);
routerCategories.get('/categories/:categoryIdId', validateCategoryId, categoriesController.show);
routerCategories.put('/categories/:categoryIdId', validateCategoryId, categoriesController.update);
routerCategories.delete('/categories/:categoryIdId', validateCategoryId, categoriesController.delete);

export default routerCategories;
import express, { Request, Response } from 'express';
import ProductModel from '../models/Product';
import productsController from '../controllers/ProductsController';
const routerProducts = express.Router();

const validateProductId = async (req: Request, res: Response, next: any) => {
  const product = await ProductModel.findByPk(req.params.productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  next();
}

routerProducts.get('/products', productsController.index);
routerProducts.post('/products', productsController.create);
routerProducts.get('/products/:productId', validateProductId, productsController.show);
routerProducts.put('/products/:productId', validateProductId, productsController.update);
routerProducts.delete('/products/:productId', validateProductId, productsController.delete);

export default routerProducts;
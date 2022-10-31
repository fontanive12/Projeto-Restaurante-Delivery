import express, { Request, Response } from 'express';
import CityModel from '../models/Product';
import citiesController from '../controllers/product';
const routerCities = express.Router();

const validateCityId = async (req: Request, res: Response, next: any) => {
    const city = await CityModel.findByPk(req.params.cityId);

    if (!city) {
        return res.status(404).json({ error: 'City not found' });
    }

    next();
}

routerCities.post('/products', citiesController.create);
routerCities.get('/products', citiesController.index);
routerCities.get('/products/:cityId', validateCityId, citiesController.show);
routerCities.put('/products/:cityId', validateCityId, citiesController.update);
routerCities.delete('/products/:cityId', validateCityId, citiesController.delete);

export default routerCities;

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import UserModel from '../models/User';
import routerUsers from './users';
import routerStates from './states';
import routerCities from './cities';
import routerCategories from './categories';
import routerProducts from './products';
import routerAuth from './auth';

const router = express.Router();

// Auth middleware
const authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let authorization = req.headers.authorization as string;

        if (!authorization || authorization.indexOf('Basic ') === -1) {
            return res.status(401).json({ message: 'Missing Authorization Header' });
        }

        authorization = authorization.replace("Basic ", '');
        let ascii = Buffer.from(authorization, 'base64').toString('ascii');
        let data = ascii.split(":");

        let username = data[0];
        let password = data[1];

        let user = await UserModel.locateUser(username, password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid Authentication Credentials' });
        }

        if (req.path === "/auth" || req.path === "/verify") {
            return res.json(user);
        } else {
            next();
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message + "" });
    }
}

router.use(cors());
router.use(authentication);
router.use(routerUsers);
router.use(routerStates);
router.use(routerCities);
router.use(routerCategories);
router.use(routerAuth);
router.use(routerProducts);

export default router;
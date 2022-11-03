import express, { Request, Response } from 'express';
import UserModel from '../models/Employee';
import usersController from '../controllers/EmployersController';
const routerUsers = express.Router();

const validateUserId = async (req: Request, res: Response, next: any) => {
  const user = await UserModel.findByPk(req.params.userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  next();
}

routerUsers.get('/employes/pdf', usersController.pdf);
routerUsers.get('/employes/csv', usersController.csv);

routerUsers.get('/email/:email', usersController.criarEmail);
routerUsers.get('/employes', usersController.index);
routerUsers.post('/employes', usersController.create);
routerUsers.get('/employes/:userId', validateUserId, usersController.show);
routerUsers.put('/employes/:userId', validateUserId, usersController.update);
routerUsers.delete('/employes/:userId', validateUserId, usersController.delete);

export default routerUsers;
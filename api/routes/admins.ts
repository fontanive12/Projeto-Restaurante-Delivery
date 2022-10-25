import express, { Request, Response } from 'express';
import AdminModel from '../models/Admin';
import adminsController from '../controllers/AdminsController';
const routerAdmins = express.Router();

const validateAdminId = async (req: Request, res: Response, next: any) => {
  const admin = await AdminModel.findByPk(req.params.adminId);

  if (!admin) {
    return res.status(404).json({ error: 'Admin not found' });
  }

  next();
}

routerAdmins.get('/admins', adminsController.index);
routerAdmins.post('/admins', adminsController.create);
routerAdmins.get('/admins/:adminId', validateAdminId, adminsController.show);
routerAdmins.put('/admins/:adminId', validateAdminId, adminsController.update);
routerAdmins.delete('/admins/:adminId', validateAdminId, adminsController.delete);

export default routerAdmins;
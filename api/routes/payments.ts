import express, { Request, Response } from 'express';
import PaymentModel from '../models/Payment';
import paymentsController from '../controllers/PaymentsController';
const routerPayments = express.Router();

const validatePaymentId = async (req: Request, res: Response, next: any) => {
    const payment = await PaymentModel.findByPk(req.params.paymentId);

    if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
    }

    next();

}

routerPayments.get('/payments/pdf', paymentsController.pdf);
routerPayments.get('/payments/csv', paymentsController.csv);

routerPayments.post('/payments', paymentsController.create);
routerPayments.get('/payments', paymentsController.index);
routerPayments.get('/payments/:paymentId', validatePaymentId, paymentsController.show);
routerPayments.put('/payments/:paymentId', validatePaymentId, paymentsController.update);
routerPayments.delete('/payments/:paymentId', validatePaymentId, paymentsController.delete);

export default routerPayments;
import { DataTypes, Model } from 'sequelize';
import db from '../db';

class Payment extends Model {
  declare id: number;
  declare form: string;
};

Payment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  form: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  sequelize: db,
  tableName: 'payments',
  modelName: 'Payment'
});

export default Payment;
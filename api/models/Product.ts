import { DataTypes, Model } from 'sequelize';
import db from '../db';
import Category from './Category';

class Product extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare size: string;
  declare price: string;
};

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
},
  {
    sequelize: db,
    tableName: 'products',
    modelName: 'Product'
  });

Category.hasMany(Product);
Product.belongsTo(Category);

export default Product;
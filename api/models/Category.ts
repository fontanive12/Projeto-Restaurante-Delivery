import { DataTypes, Model } from 'sequelize';
import db from '../db';

class Category extends Model {
  declare id: number;
  declare name: string;
};

Category.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
  {
    sequelize: db,
    tableName: 'categories',
    modelName: 'Category'
  });

export default Category;
import { DataTypes, Model } from 'sequelize';
import db from '../db';

class Admin extends Model {
  declare id: number;
  declare name: string;
  declare age: string;
  declare sex: string;
  declare email: string;

  static locateAdmin = async (email: string, password: string) => {
    return await Admin.findOne({
      where: {
        email: email,
        password: password
      }
    });
  }
};

Admin.init({
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
  birth_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
  {
    sequelize: db,
    tableName: 'admins',
    modelName: 'Admin'
  });

export default Admin;
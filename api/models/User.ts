import { DataTypes, Model } from 'sequelize';
import db from '../db';
import City from './City';

class User extends Model {
  declare id: number;
  declare name: string;
  declare age: string;
  declare sex: string;
  declare phoneNumber: string;
  declare number: string;
  declare email: string;
  declare password: string;
  


  static locateUser = async (email: string, password: string) => {
    return await User.findOne({
      where: {
        email: email,
        password: password
      }
    });
  }
};

User.init({
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
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
},
  {
    sequelize: db,
    tableName: 'users',
    modelName: 'User'
  });

City.hasMany(User);
User.belongsTo(City);

export default User;
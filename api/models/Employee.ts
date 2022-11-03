


import { DataTypes, Model } from 'sequelize';
import db from '../db';
import City from './City';

class Employee extends Model {
    declare id: number;
    declare name: string;
    declare birthDate: Date;
    declare genre: string;
    declare phoneNumber: string;
    declare position: string;
    declare address: string;
    declare email: string;
    declare password: string;
    
    
    
    static locateUser = async (email: string, password: string) => {
        return await Employee.findOne({
            where: {
                email: email,
                password: password
            }
        });
    }
};

Employee.init({
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
    birthDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
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
        },
        
    },
    {
        sequelize: db,
        tableName: 'employers',
        modelName: 'Employee'
    });
    
    City.hasMany(Employee);
    Employee.belongsTo(City);
    
    // Employee.sync({ force: true })
    export default Employee;
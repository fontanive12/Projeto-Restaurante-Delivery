import { DataTypes, Model } from 'sequelize';
import db from '../db';

class Log extends Model {
    declare id: number;
    declare description: string;
};

Log.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        sequelize: db,
        tableName: 'logs',
        modelName: 'Logs'
    });

// Book.sync({force:true})

export default Log;



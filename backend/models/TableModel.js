import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const TableModel = db.define('tables', {
   
    div_code: {
        type: DataTypes.STRING
    },
    div_type: {
        type: DataTypes.NUMBER
    },
    flag: {
        type: DataTypes.NUMBER
    }
}, {
     freezeTableName: true
});

export default TableModel;


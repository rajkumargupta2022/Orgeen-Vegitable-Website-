import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const OrderModel = db.define('tblorders', {
   
    email: {
        type: DataTypes.STRING
    },
    user_id: {
        type: DataTypes.NUMBER
    },
    total_price: {
        type: DataTypes.NUMBER
    },
    cod: {
        type: DataTypes.STRING
    },
    order_number: {
        type: DataTypes.STRING
    }
}, {
     freezeTableName: true
});

export default OrderModel;


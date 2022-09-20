import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const SubOrderModel = db.define('tbl_suborder', {
   
    order_number: {
        type: DataTypes.STRING
    },
    sub_total: {
        type: DataTypes.NUMBER
    },
    product_id: {
        type: DataTypes.NUMBER
    },
    category_id: {
        type: DataTypes.NUMBER
    }
}, {
     freezeTableName: true
});

export default SubOrderModel;


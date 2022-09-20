import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const AddSubscriptionModel = db.define('subscription_plan', {
   
    subscription_type: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    discount_percentage: {
        type: DataTypes.NUMBER
    },
    price: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    }
}, {
     freezeTableName: true
});

export default AddSubscriptionModel;


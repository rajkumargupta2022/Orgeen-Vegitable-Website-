import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const CheckOut = db.define('billing_detail', {
    // id: {
    //     type: DataTypes.NUMBER,
    //     primaryKey:true
    // },
    first_name: {
        type: DataTypes.STRING
      // type: Sequelize.STRING,
    },
    last_name: {
        type: DataTypes.STRING
    },
    company_name: {
        type: DataTypes.NUMBER
    },
    country_name: {
        type: DataTypes.STRING
    },
    street_address: {
        type: DataTypes.TEXT
    },
    town_city: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    location: {
        type: DataTypes.TEXT
    },
    pin: {
        type: DataTypes.NUMBER
    },
    phone: {
        type: DataTypes.NUMBER
    },
    email: {
        type: DataTypes.STRING
    }
}, {
     freezeTableName: true
});

export default CheckOut;


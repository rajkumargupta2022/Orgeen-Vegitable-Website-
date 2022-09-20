import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    // id: {
    //     type: DataTypes.NUMBER,
    //     primaryKey:true
    // },
    email:{
        type: DataTypes.STRING
    },
    name:{
        type: DataTypes.STRING
    },
    lname:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
   freezeTableName:true
});

export default Users;
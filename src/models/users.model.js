const db = require('../utlis/database');
const {DataTypes} = require('sequelize');


const Users = db.define('users',{
    id: {
        primaryKey: true, //llave primaria
        type: DataTypes.INTEGER,//tipo de datos
        autoIncrement: true, //increment
        allowNull: false, //not null
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{ //validar email
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Users;
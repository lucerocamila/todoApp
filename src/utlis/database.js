const { Sequelize } = require('sequelize');

const db = new Sequelize({
    database: "todoapp",
    username: "postgres",
    host: "localhost", //127.0.0.1
    port: "5432",
    password: "26105389",
    dialect: "postgres" 
});

module.exports = db;
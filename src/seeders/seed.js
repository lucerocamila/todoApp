const db = require('../utlis/database');
const Users = require('../models/users.model');
const Todos =  require('../models/todos.models');

const users = [
    {username: 'Lucero', email:'Lucero@hotmail.com', password: '1234'},
    {username: 'Steven', email:'Steven@hotmail.com', password: '1234'},
    {username: 'Jhorman', email:'Jhorman@hotmail.com', password: '1234'}
];  

const todos = [
    {title: 'tarea1',description: 'descripcion para 1',userId: 1},
    {title: 'tarea1',description: 'descripcion para 1',userId: 1},
    {title: 'tarea2',description: 'shlala ahala',userId: 2},
    {title: 'tarea2',description: 'descripcion para 2',userId: 2},
    {title: 'tarea3',description: 'shlalalsda',userId: 3},
    {title: 'tarea3',description: 'descripcion para 3',userId: 3},
];

const categories = [];

const todosCategories = [];


db.sync({force: true})
.then(() => {
    console.log('Iniciando con el sembradio malicioso');
    users.forEach((user) => Users.create(user)); //INSERT INTO users
    
    setTimeout(() => {
        todos.forEach((todo) => Todos.create(todo));
    }, 100);
})
.catch(error => console.log(error));
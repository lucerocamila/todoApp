const Users = require('./users.model');
const Todos = require('./todos.models');
const Categories = require('./categories.models');
const TodosCategories = require('./todos-categories.models');

const initModels = () => {
 
    Todos.belongsTo(Users, {as: 'author', foreignKey: 'user_id'}); //con belongsTo sabe que tiene la llave foranea, as es para decir quien lo hizo y foreinKey es para decir como se llama la llave foranea
    Users.hasMany(Todos, {as: 'task', foreignKey: 'user_id'});

    // Relacion M-M categorias y tareas
    TodosCategories.belongsTo(Todos, {as: 'task', foreignKey:'todo_id'});
    Todos.hasMany(TodosCategories, {as: 'category', foreignKey: 'todo_id'});

    TodosCategories.belongsTo(Categories, {as: 'category', foreignKey: 'category_id'});
    Categories.hasMany(TodosCategories, {as: 'task', foreignKey: 'category_id'});
}

module.exports = initModels;
// Importamos express
const express = require('express');
const db = require('./utlis/database'); //importamos
const initModels = require('./models/init.models');
const Users = require('./models/users.model');
const Todos = require('./models/todos.models');

// crear una instancia de express
const app = express();

app.use(express.json());

const PORT = 8000;

// probando la conexion a la base de datos
db.authenticate()//devuelve una promesa
.then(() => console.log('Autenticacion exitosa'))
.catch((error) => console.log(error));

initModels();

// vamos a usar el metodo sync para sincronizar la informacion de la base de datos
//devuelve una promesa y la resolvemos con then

db.sync({force: false}) //devuelve una promesa // No existe la tabla la creo con alter
.then(() => console.log('Base de datos sincronizada'))
.catch((error) => console.log(error));

app.get('/', (req, res) => {
    //codigo de estado
    res.status(200).json({message: 'Bienvenido al servidor'});
});

// definir las rutas de nuestros endpoints ( de ahora aelante ep)
// todas las consultas de usuarios
// localhost:8000/users ---> todo para usuarios
// localhost:8000/todos ---> todo para tareas

// GET a /users 
app.get('/users', async (req,res) => {
    try{
        // vamos a obtener el resultado de consultar a todos los usuarios de la DB
        const result = await Users.findAll(); //SELECT * FROM users
        res.status(200).json(result);
    }catch(error){
        console.log(error)
    }
});

app.get('/users/:id', async (req, res)=> {
    try{
        console.log(req.params);
        const {id} = req.params; //destructuracion
        const result = await Users.findByPk(id);
        res.status(200).json(result);
    }catch(error){
        console.log(error)
    }
});

app.get("/users/username/:username", async (req,res) => {
    try{
        const  {username} = req.params;   
        const result = await Users.findOne({where: {username}}); //SELECT * FROM users WHERE username = ianaacus 
        res.status(200).json(result);
    }catch(error){
        console.log(error)
    }
});

app.post('/users', async (req,res) => {
    try{
        const user = req.body;
        const result = await Users.create(user);
        res.status(201).json(result);//se creó un nuevo recurso como resultado

    }catch(error){
        console.log(error);
    }
});

// actualizar un usuario, solo podemos cambiar password
app.put('/users/:id', async(req,res)=> {
    try{
        const {id} = req.params;//destructuring
        const field = req.body;//informacion que queremos actualizar
        const result = await Users.update(field, {
            where: {id} //where: {id: id}
        });
        res.status(200).json(result);
    }catch(error){
        res.status(400).json(error.message);
    }
});

//eliminar un usuario
app.delete('/users/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const result = await Users.destroy({
            where: {id}
        });
        res.status(200).json(result);
    }catch(error){
        res.status(400).json(error.message);
    }
});

app.get('/todos', async (req, res) => {
    try{
        const result = await Todos.findAll();
        res.status(200).json(result);
    }catch(error){
        console.log(error);
    }
});

app.get('/todos/:id', async (req, res)=> {
    try {
        const {id} = req.params;
        const result = await Todos.findByPk(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
});

app.post('/todos', async (req, res) => {
    try{
        const todos = req.body;
        const result = await Todos.create(todos);
        res.status(201).json(result);//se creó un nuevo recurso como resultado

    }catch(error){
        console.log(error);
    }
});

app.put('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const field = req.body;
        const result = await Todos.update(field, {
            where: {id}
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Todos.destroy({
            where: {id}
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// vamos a terminar los modelos ---> rapido
// model todos
// crear las relaciones entre los modelos
// les voy a enseñar a insertar informacion desde este mismo proyecto


// vamos a estar haciendo los endpoints y consultas

// users

//vamos a insertarinformacionen en nuestra base de datos
//desde nuestro proyecto de node

//consultar la informacion con endpoints

//seed
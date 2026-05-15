//Indica la información para conectar con la base de datos
const mongoose = require('mongoose');

//Guarda la conexion del modulo
const dbconnect = () =>{
    mongoose.set('strictQuery', true)
    mongoose.connect("mongodb://localhost:27017/login_node")

    .then((ssucess) => console.log("Conexión exitosa"))
    .catch((err)=> console.log(err.message));
}

module.exports =dbconnect;

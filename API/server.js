//SERVICIO WEB DE LA API
//Importar express
const express = require('express');

//Crear aplicación
const app = express();

//Puerto del servidor
const PORT = 3000;

//Para recibir datos JSON
app.use(express.json());

//Base de datos temporal
let usuarios = [];

//***Registro de usuarios inicio***
app.post('/registro',(req, res)=>{

    //Obtener datos enviados
    const {usuario, password} = req.body;

    //Validar campos vacios
    if(!usuario||!password){
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }
    //Verificar si el usuario exite
    const usuarioExiste = usuario.find(
        user=>user.usuario == usuario
    );
    
    if (usuarioExiste){
        return res.status(400).json({
            mensaje: "El usuario ya existe"
        });
    }
    
    //Crear el usuario
    const usuarioNuevo = {
        usuario,
        password
    };

    //Guardar usuario
    usuarios.push(usuarioNuevo);

    //Respuesta al Guardar
    res.status(201).json({
        mensaje:"Usuario registrado"
    });
});//***Registro de usuarios final***
//***Inicio de sesión de  usuarios inicio***
app.post('/login',(req, res)=>{
    //Obtener datos del usuario
    const {usuario, password} = req.body;
    
    //Buscar usuario
    const usuarioEncontrado = usuario.find(
        user => 
            user.usuario == usuario &&
            user.password == password
    );
    
    //Validar autenticación
    if(usuarioEncontrado){
        res.json({
            mensaje: "Autenticación exitosa"
        });
    }else{
        res.status(401).json({
            mensaje:"Error de autenticación"
        });
    }
});

//Inciar el servidor
app.listen(PORT,()=> {
    console.log(`Servidor ejecutandose en ${PORT}`)
});//***Inicio de sesión de  usuarios final***
//SERVICIO WEB DE LA API
//Importar express
const express = require('express');

//Conexión con mongoo
const mongoose = require('mongoose');
const dbconnect = require('./config');
const ModelUser = require('./model');

//LLamar para que reconozca el archivo config
dbconnect();
//Crear aplicación
const app = express();

//Puerto del servidor
const PORT = 3000;

//Para recibir datos JSON
app.use(express.json());

//Manejar las rutas
const router = express.Router();

//Create
router.post('/', async (req, res) => {
    const body = req.body;
    const respuesta = await ModelUser.create(body)
    res.send(respuesta)
})
//Consulta
router.get('/',async (req, res) => {
    const body = req.body;
    const respuesta = await ModelUser.find({})
    res.send(respuesta)})
//Consultar por Id
router.get('/:id',async (req,res) => {
    const id = req.params.id;
    const respuesta = await ModelUser.findById({_id:id})
    res.send(respuesta)})
//Actualizar
router.put('/:id',async(req, res)=>{
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelUser.findByIdAndUpdate({_id:id},body)
    res.send(respuesta)
})
//Eliminar
router.delete('/:id',async(req, res)=>{
    const id = req.params.id;
    const respuesta = await ModelUser.deleteOne({_id:id})
    res.send(respuesta)
})
//Inicio de sesion
//con POST en la ruta debe ir el /login
app.post('/login',async(req, res)=>{
    try{
        //Guarda el usuario y la contraseña desde mongo db
        const{nomuser,password}=req.body;
    //Buscar si el nombre existe en mongodb
    //Busca en la base de datos el usuario que se recibio
    const usuarioExiste = await ModelUser.findOne({nomuser});

    //Validar si existe
    //Si el usuario No existe
    if(!usuarioExiste){
        return res.status(401).json({mensaje: "Error de autenticación"});
    }
    //Validar si la contraseña existe
    //Compara la contraseña
    if(usuarioExiste.password=== password){
        //200= todo salio perfecto
        return res.status(200).json({mensaje:"Autenticación satisfactora"});
    }else{//401= no autorrizado
        return res.status(401).json({mensaje: "Error de autenticación"});
    }
} catch(error){//obligatorio si la base de datos falla
    //500= Error ineterno
        return res.status(500).json({mensaje:"Error",error:error.message});}
});
//json hara uso de las rutas
app.use(router);
//Inciar el servidor
app.listen(PORT,()=> {
    console.log(`Servidor activo en ${PORT}`)
})
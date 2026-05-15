//llamar a mongoose
const mongoose= require('mongoose');
//nueva variable Para acceder al esquema de la base de datos
const userModel= new mongoose.Schema({
     nomuser:{
        type :String
    },
    password:{
        type :String
    }
    },
    {
        //Para mirar el tiempo en que se creo y la versión
       timestamps:true,
       versionKey:false,
    }
)
//Exportación para js y guarde el proceso
const ModelUser = mongoose.model("usuarios",userModel);
//Para exportarlo
module.exports= ModelUser
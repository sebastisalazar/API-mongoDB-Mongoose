
const mongoose=require('mongoose');


//console.log(process.env.DB_URI)
const connection=async()=>{
    try {
        
        //connect recibe un string de conexion guardado en nuestro archivo de variables de entorno (.ENV)
        const response= await mongoose.connect(process.env.DB_URI)
         console.log("Conectado a la base de datos")

         return response
    } catch (error) {
        return {
            ok:false,
            msg:"error al conectar con la base de datos"
        }
    }
}

module.exports = {connection};
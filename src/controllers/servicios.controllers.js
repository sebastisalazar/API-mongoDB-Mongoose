//Requerimiento del esquema de Servicios
const Servicio=require("../models/Servicio.model")


//GET ALL
const getAllServices=async(req,res)=>{

    
    try{
        
        //accede a la base de datos para crear el servicio. AWAIT ES por latencia en la conexion
        const servicios=await Servicio.find({})

        //console.log(servicios)

        //si el id existe el ID y lo elimina, devuelve lo siguiente
       if (servicios) {
       
            return res.status(200).json({
                ok:true,
                message:"Servicios listados con exito",
                data:servicios
            });
            
        //si la respuesta de almacenada en servicioPorId es null significa que no existe el ID y devuelve lo siguiente
       }else{
            return res.status(404).json({
                ok:false,
                message:"Servicios no encontrados "
            })
       }
    

    }catch(error){
        //Gestionar si hay error

        console.log(error,': Desde getAServiceByID')
        return res.status(500).json({
            ok:false,
            message:"Ha habido un error, contacte con el administrador",
        })
    }
    
}

//GET ONE BY ID
const getAServiceById=async(req,res)=>{
    
    //buscar el id el los params del endPoint

    //desestructuracon de params dentro del requerimiento
    const {id}=req.params;

    console.log
    try{
        
        //accede a la base de datos para crear el servicio. AWAIT ES por latencia en la conexion
        const servicioPorId=await Servicio.findById(id)

        //console.log(servicioPorId)

        //si el id existe el ID y lo elimina, devuelve lo siguiente
       if (servicioPorId) {
       
            return res.status(200).json({
                ok:true,
                message:"Servicio encontrado con exito",
                data:servicioPorId
            });

        //si la respuesta de almacenada en servicioPorId es null significa que no existe el ID y devuelve lo siguiente
       }else{
            return res.status(404).json({
                ok:false,
                message:"Servicio no encontrado"
            })
       }
    

    }catch(error){
        //Gestionar si hay error

        console.log(error,': Desde getAServiceByID')
        return res.status(500).json({
            ok:false,
            message:"Ha habido un error, contacte con el administrador",
        })
    }

}

//CREATE SERVICE
const createAService=async(req,res)=>{

    //console.log(req.body)
    //capturar el body (valores que vendrian desde el frontend) que trae el requerimiento
    const body=req.body;

    try{
        
        //instancia del modelo/clase requerido pasandole como parametro lo que se ha recodigo del body
        const servicio= new Servicio(body);

        //accede a la base de datos para crear el servicio. AWAIT ES por latencia en la conexion
        const servicioCreado=await servicio.save();

        //visualizar por consola el objeto (CON EL OBJECTID) creado en la base
        console.log({servicioCreado})

        //si el se ha podido añadir devuelve lo siguiente
        return res.status(201).json({
                ok:true,
                message:"Servicio creado con exito",
                data:servicioCreado

         });

    }catch(error){
        //Gestionar si hay error

        console.log(error,': Desde createAService')
        return res.status(500).json({
            ok:false,
            message:"Ha habido un error, contacte con el administrador",
        })
    }

}

//MODIFY SERVICE BY ID
const updateAServiceById=async(req,res)=>{
    
    //buscar el id el los params del endPoint

    //desestructuracon de params dentro del requerimiento
    const {id}=req.params;

    //para capturar los nuevos valores recibidos por el body del requerimiento
    const body=req.body

    //console.log(body)
    //ver el id del servicio encontrado
    //console.log(id)

    try{

        //se pasan por parametro el ID y body recogidos desde el requerimiento. Devuelve el documento DESPUÉS de la actualización. 
       const servicioActualizado=await Servicio.findByIdAndUpdate(id,body,{returnDocument:"after"});
       
       //verificacion del resultado del findByIdAndUpdate
       //console.log(servicioActualizado)
       
       //si el id existe el ID y lo actualiza, devuelve lo siguiente
       if (servicioActualizado) {
       
            return res.status(200).json({
                ok:true,
                message:"Servicio modificado con exito",
                data:servicioActualizado

            });
        //si la respuesta de almacenada en servicioActualizado es null significa que no existe el ID
       }else{
            return res.status(404).json({
                ok:false,
                message:"Servicio no encontrado"
            })
       }

       
        
    }catch(error){
        console.log(error, ': Desde updateAServiceById')
        return res.status(500).json({
            ok:false,
            message:"Ha habido un error, contacte con el administrador",
        })
    }

}

//DELETE SERVICE BY ID
const deleteAServiceById=async(req,res)=>{

    //buscar el id el los params del endPoint

    //desestructuracion de params dentro del requerimiento
    const {id}=req.params;

    //ver el id del servicio encontrado
    //console.log(id)

    try{

        //se pasan por parametro el ID recogidos desde parametros en el requerimiento
       const servicioEliminado=await Servicio.findByIdAndDelete(id);
       
       //verificacion del resultado del deleteAServiceById
       //console.log(servicioEliminado)
       
       //si el id existe el ID y lo elimina, devuelve lo siguiente
       if (servicioEliminado) {
       
            return res.status(200).json({
                ok:true,
                message:"Servicio eliminado con exito",
                data:servicioEliminado
            });
        //si la respuesta de almacenada en servicioActualizado es null significa que no existe el ID
       }else{
            return res.status(404).json({
                ok:false,
                message:"Servicio no encontrado"
            })
       }
        
    }catch(error){
        console.log(error,': Desde deleteAServiceById')
        return res.status(500).json({
            ok:false,
            message:"Ha habido un error, contacte con el administrador",
        })
    }


}




module.exports={createAService,getAllServices,getAServiceById,updateAServiceById, deleteAServiceById}
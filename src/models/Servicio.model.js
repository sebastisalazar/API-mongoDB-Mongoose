const {Schema,model}=require("mongoose");

const ServicioEschema= new Schema({

    nombre:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    descripcion:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true
    }

})

module.exports=model("Servicio",ServicioEschema)
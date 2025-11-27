
const {validationResult}=require('express-validator')

//funcion middleware a ejectuar en routes
const validateInputs=(req,res,next)=>{

    const errors=validationResult(req)
    console.log(errors)
    
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors: errors.mapped() //se mapean errores por el noombre del path
        })
    }
}

module.exports={
    validateInputs
}
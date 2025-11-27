const jwt=require('jsonwebtoken')

const validarJWT=(req,res,next)=>{

    
        try {
             
        } catch (error) {
            console.log(error)
        }

       next()
    
}

module.exports={validarJWT}
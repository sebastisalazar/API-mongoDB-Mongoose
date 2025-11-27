const jwt= require('jsonwebtoken')
const {decodeToken}=require('../helpers/jwt')

const verifyToken=(req,res,next)=>{

    //captura el token que hay dentro authorization. diviendolo en un array para quitar la primera parte que es 'bearer'
        const tokenEnHeader=req.headers['authorization'].split(' ')[1]

        //imprime
        //console.log('token en headers desde validarJWT:',tokenEnHeader);

        //evalua si el token extraido de authorization es undefined/null
        if (!tokenEnHeader) {
            return res.status(403).json({ //403 forbidden no posee permisos para cierto contenido
                ok:false,
                msg:'Token no proporcionado'
            })
        }

        try {

            //payload decodificado
            const payload=decodeToken(tokenEnHeader)

            //imprime payload
            //console.log(payload)

            //evalua el payload codificado, si es null/undefined retorna status 401
            if(!payload){
                return res.status(401).json({ //Aunauthorized  no tiene permisos
                    ok: false,
                    msg: 'Token no válido'
                })
            }

            //extrae los atributos del payload decodificado y los guarda en el requerimiento
            //req.uid=payload.uid
            req.name=payload.name
            req.role=payload.role
            
            //pasar el control al siguiente middleware (si lo hubiese)
            next();

        } catch (error) {
            console.log(error)
        }
}
module.exports={verifyToken}
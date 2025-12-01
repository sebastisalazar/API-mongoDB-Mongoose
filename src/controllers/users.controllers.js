const User=require('../models/User.model');
//parse application/X-ww-form-urlencoded

//modulo para encriptar password
const bcrypt=require('bcryptjs')

const {JWTGenerator}=require('../helpers/jwt')

const createUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        //console.log(body)

        //Se hace una busqueda por email para saber si el usuario existe
        const userExists=await User.findOne({email})
        
        //console.log(userExists)

        //Se evalua el resultado almacenado en userExists
        if (userExists) {
            return res.status(400).json({
                ok:false,
                msg:'Usuario ya existe'
            })
        }

        //ENCRIPTACION SI EL USUARIO NO EXISTE
        const salt=bcrypt.genSaltSync() //msg numeros por defecto es 10 bits
        const hashedPassword=bcrypt.hashSync(password,salt);

        // console.log(hashedPassword) VER PASSWORD HASHEADA

        //datos finales de usuario a crear (con la password hasheada)
        const userToSave= {
            name,
            email,
            password:hashedPassword
        }

        //inicializa el constructor pasandole el objeto literal que contiene los atributos del body y el password hasheado
        const user= new User(userToSave) 

        //se salva/crea el usuario
        const usuarioCreado=await user.save();

        //console.log(usuarioCreado)

        //preparacion de payload para el token
        const payload={
            uid:usuarioCreado._id, //se extrae el usuariocreado
            name:usuarioCreado.name,
            role:usuarioCreado.role
        }
         //genera token apartir del payload
        const token=await JWTGenerator(payload)

        return res.status(200).json({
            ok:true,
            msg:'Usuario registrado con exito',
            //data:usuarioCreado,
            token:token //token generado
        })


    } catch (error) {
        console.log(error)

        return res.status(500).json({
            ok:false,
            msg:'Contacte con el administrador'
        })
    }
} 

const loginUser=async(req,res)=>{
    try {

        const {email,password}=req.body
        
        //Se hace una busqueda por email para saber si el usuario existe
        const userExists=await User.findOne({email})
        
        //console.log(userExists)

        //Se evalua el resultado almacenado en userExists
        if (!userExists) {
            return res.status(400).json({
                ok:false,
                msg:'Email no registrado',
                email:email,
                password:password

            })
        }
        //si el usuario existe compara las contraseñas
        const passwordOk=bcrypt.compareSync(password,userExists.password )

        //console.log(passwordOk)

        //si las contraseñas no coinciden da error 401
        if(!passwordOk){
            return res.status(401).json({ //401 unathorized
                ok:false,
                msg:'La contraseña no es valida'
            })
        }

        //si las contraseñas coinciden procede con la creacion del token
        //preparacion de payload para el token
        const payload={
            uid:userExists._id, //se extrae el usuariocreado
            name:userExists.name,
            role:userExists.role
        }

        //generacion del token
        const token=await JWTGenerator(payload)

        //SETEO de propiedades del usuario necesarias para payload y las guardamos en authorization

        //req.headers.authorization=`${token}`

        //Comprobacion que exista en headers
        //console.log("Header seteado desde login:",req.headers.authorization)

        return res.status(200).json({
            ok:true,
            msg:'Usuario Logeado con Exito',
            user:userExists,
            token:token
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Contacte con el administrador'
        })
    }
}

const renewToken=async(req,res)=>{
    try {

        //Recoge los valores almacenado en el requerimiento        
         const payload={
            //uid:req.uid,
            name:req.name,
            role:req.role
        }
        
        //console.log('nuevo payload:',payload)

        //generacion de nuevo token pasando el payload construido
        const newtoken= await JWTGenerator(payload)

        //console.log('nuevo token:',newtoken)

        //retorna status OK
        return res.status(200).json({
            ok:true,
            msg:'Token renewed',
            user:{
                uid:payload.uid,
                name:payload.name
            },
            newtoken
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Contacte con el administrador'
        })
    }
}

module.exports={
    createUser,
    loginUser,
    renewToken
}
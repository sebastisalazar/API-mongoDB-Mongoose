const express=require('express')
const router = express.Router();

const {validarJWT}=require('../middlewares/validateJWT')
const {verifyToken}=require('../middlewares/verifyToken')

//importacion de controllers
const {createUser, loginUser,renewToken}= require('../controllers/users.controllers')

//REGISTER
router.post('/new', /*[validacion],*/ createUser)

//LOGIN
router.post('/', /*[validacion],*/ loginUser)

//RENEWTOKEN

router.get('/renew', [verifyToken], renewToken)


 module.exports=router
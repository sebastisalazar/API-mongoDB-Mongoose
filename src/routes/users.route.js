const express=require('express')
const router = express.Router();

const {verifyToken,verifyRole}=require('../middlewares/authMiddleware')

//importacion de controllers
const {createUser, loginUser,renewToken}= require('../controllers/users.controllers')

//REGISTER
router.post('/new',/* [verifyRole],*/ createUser)

//LOGIN
router.post('/', /*[validacion],*/ loginUser)

//RENEWTOKEN

router.get('/renew', [verifyToken], renewToken)


 module.exports=router
const express = require("express");
const router = express.Router();
const { validateInputs }=require('../middlewares/validateInputs.js')

//desestructuracion de express validator
const {check,validationResult}=require('express-validator')

//importacion de funciones controladoras
const {createAService,
    getAllServices,
    getAServiceById,
    updateAServiceById,
    deleteAServiceById}= require('../controllers/servicios.controllers.js')

// GET ALL SERVICES
router.get('/servicios',getAllServices)

//DIVISION DE RESPONSABILIDADES - CONTROLADORES
// GET A SERVICE BY ID
router.get('/servicios/:id',getAServiceById)

// CREATE A SERVICE
//endpoint probado desde postman (body-raw)
router.post('/crearservicio',[

            check('nombre')
            .not().isEmpty().withMessage('Debes escribir el nombre')
            .isLength({min:2,max:10}).withMessage('La longitud debe ser entre 2 y 10 caracteres'),

            check('descripcion').not().isEmpty().withMessage('Debes introducir la descripcion'),

            check('email').isEmail().withMessage('Debes escribir un email correcto'),

            check('precio').not().isEmpty().withMessage('Debes introducir el precio')
            .isInt({ min:1, max: 2000}).withMessage('Debes introducir un precio entre 1 y 2000'),
            validateInputs
        
],createAService)

// UPDATE A SERVICE 
router.put('/actualizarservicio/:id', updateAServiceById)

// DELETE A SERVICE 
router.delete('/elimininarservicio/:id',deleteAServiceById)

//Exporta todo el objeto ROUTER
module.exports = router;

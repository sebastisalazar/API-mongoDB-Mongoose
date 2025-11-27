//IMPORTACIONES de MODULOS externos
const express = require("express")
require('dotenv').config()
const cors=require("cors")


const cookieParser = require('cookie-parser')

const {connection}=require("./config/dbConnect.js")

//IMPORTACIONES locales
const app=express();
const port=process.env.PORT;


//MIDDLEWARE
app.use(cors());

app.use(cookieParser())

//ayuda a leer el body de las peiticiones en formato JSON
app.use(express.json());

//parse application/X-ww-form-urlencoded
app.use(express.urlencoded());

//BBDD
connection()

//Templates
app.set('view engine', 'ejs')
app.set("views", __dirname + "/views");


//middleware
app.use(express.static(__dirname + "/public"))

app.use(express.urlencoded())
app.use(express.json())


/* RUTAS */

//uso de rutas servicios
app.use('/api/v1',require("./routes/servicios.route.js"));
app.use('/api/v1/auth',require("./routes/users.route.js"));


//listener
app.listen(port, () => {
   console.log(`Servidor a la escucha del puerto ${port} `);
});

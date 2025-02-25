const express = require('express')
const bodyParser = require('body-parser')
const rutaAves = require("./routes/aves.js")
const path = require('path');
const cors = require('cors');

const myApp = express()
const port = 8080

myApp.use(cors());

myApp.use('/API/img/', express.static(path.join(__dirname, './img/')));

myApp.use(bodyParser.json())

myApp.use('/API/aves/', rutaAves)

myApp.listen(port, () =>{
    console.log('la api esta ejecutandose por el puerto ', port)
})

myApp.use((req, res)=>{
    res.status(404).json({message: "Ruta no encontrada ❌"})
})
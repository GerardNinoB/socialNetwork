'use strict'

//express 

var express = require('express');
var bodyParser = require('body-parser');


var app= express();

//cargar rutas


//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//core


//rutas

app.get('/pruebas',(req,res)=>{
    res.status(200).send({
        message : "accion de prueba en el servidor de nodejs"
    })
})


//exportar 

module.exports =app;

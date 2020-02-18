'use strict'



var moongoose=require('mongoose');
var app = require('./app');
var port = 3800;

//conexion a la bbdd 
moongoose.Promise=global.Promise;
moongoose.connect('mongodb://localhost:27017/SocialNetwork',{useUnifiedTopology: true})
.then(()=>{
    console.log("La conexion a la bbdd se ha realizado correctamente")
    //crear servidor
    app.listen(port,()=>{
        console.log("servidor corriendo http://localhost:3800");
    });


}).catch(err=> console.log(err));
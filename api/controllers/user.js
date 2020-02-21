'use strict'

var bcrypt= require('bcrypt-nodejs');

var User =require('../models/user');



function home (req,res){
    res.status(200).send({
        message: 'home'
    });
}

function pruebas(req,res){
    console.log(req.body);
    res.status(200).send({
        message: 'Accion de pruebas en el servidor NodeJs'
    });
}

function saveUser(req,res){
    var params= req.body;
    var user=new User();

    if(params.name && params.surname && 
        params.nick && params.email && params.password){
            user.name=params.name;
            user.surname=params.surname;
            user.nick=params.nick;
            user.email=params.email;

            //Cotrolar usuarios duplicados
            User.findOne({ $or: [
                                    {email: user.email.toLowerCase()},
                                    {nich: user.nick.toLowerCase()}
                                ]}).exec((err, users)=>{
                                    if(err) return res.status(500).send({message: 'Error en la peticion de usarios'});

                                    if(users &&users.length >=1){
                                        return res.status(200).send({message: 'El usario que intentas registrar ya existe'});
                                    }
                                });

            //Cifra los datos
            bcrypt.hash(params.password,null,null,(err,hash)=>{
                user.password=hash;

                user.save((err,userStored)=>{
                    if (err) return res.statuus(500).send({message:'Errorr al guardar el usario'});
                    if(userStored){
                        res.status(200).send({user: userStored});
                    }else{
                        res.status(404).send({message:'no se ha registrado el usario'});
                    }
                });
            });
    }else{
        res.status(200).send({
            message: 'Eniva todos los campos necesarios'
        });
    }
}



function loginUser(req, res){
    var params= req.body;

    var email= params.email;
    var password= params.password;

    User.findOne({email: email},(err,user)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'});

        if(user){
            bcrypt.compare(password,user.password,(err,check)=>{
                if(check){
                    //devolver datos de usario
                    return res.status(200).send(user);
                }else{
                    return res.status(404).send({message:'El usuario no se ha podido identificar'});
                }
            });
        }else{
            return res.status(404).send({message:'El usario no se ha podido identificar'});
        }
    });
}

module.exports = {
    home,
    pruebas,
    saveUser,
    loginUser
}
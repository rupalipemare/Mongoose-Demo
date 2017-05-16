'use strict';
var User = require('./../model/users');
module.exports = {
    index : function (request, response) {
        response.render('index');
    },
    login : function (request, response) {
        response.render('login');
    },
    userList : function(request, response){
        User.find(function(err, data){
            if(err){
                console.log(err);
            }else{
                response.render('userList', { 'user' : data});
            }
        });
    },
    addUser : function(request, response){
        response.render('addUser');
    },
    saveUser : function (request, response) {
        var user = new User(request.body);
        User.bcryptpassword(request.body.password, function(err, data){
            if(err){
                console.log(err);   
            }else {
                user.password = data;
                user.save(function(err){
                    if (err){
                        if (err.name === 'MongoError' && err.code === 11000) {
                            return response.status(500).send({ succes: false, message: 'User already exist!' });
                        }
                        console.log(err)
                    }else
                        response.redirect('/');
                })
            }
        });
    },
    updateUserView :  function (request, response) {
        User.findById(request.params.id, function(err, data){
            if(err){
                console.log(err);
            }else{
                response.render('updateUser', { 'user' : data});
            }
        });
    },
    updateUser : function (request, response) {
        console.log(request.body.id);
        var id = request.body.id;
        User.findOneAndUpdate({ _id : id}, request.body, function(err, data){
            if(err){
                console.log("err" + err);
            }else{
                response.redirect('/userList');
            }
        });
    },
    deleteUser : function (request, response) {
        var query =  User.remove({_id : request.params.id});
        query.exec();
        response.redirect('/userList');
        /*User.remove({ _id : request.params.id}, function(err, data) {
            if (err){
                console.log(err);
            }else {
                response.redirect('/userList');
            }
        });*/
    }
};
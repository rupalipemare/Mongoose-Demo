'use strict';
var User = require('./../model/users');
var passport = require('passport'),
    local = require('passport-local').Strategy;

module.exports = function () {
    passport.use(new local({
        usernameField: 'username',
        passwordField: 'password'
    }, function (username, password, done) {
        var data = {
            'username': username,
            'password': password
        };
        User.findOne({username: data.username}, function (err, user) {
            if (err) {
                console.log("err "+err);
            }
            if (user) {
                user.comparePassword(password, function(err, data){
                    if (data == false) {
                        done(null, false, {message: 'Invalid Password'});
                    } else {
                        user = user;
                        done(err, user);
                    }
                });
            }else{
                done(null, false, {message : "Invalid Username"})
            }
        });
    }));
};

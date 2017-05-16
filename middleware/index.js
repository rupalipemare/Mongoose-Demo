'use strict';
var express = require('express');

module.exports = {
    isLoginCheck : function (request, response, next) {
        if(request.session.user && request.path != '/login'){
            response.redirect('/login');
        }else{
            next();
        }
    },
};

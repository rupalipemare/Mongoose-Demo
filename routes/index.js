var express = require('express'),
    indexController = require('./../controller/index'),
    middleware = require('./../middleware/index'),
    passport = require('passport'),
    router =  express.Router();

router.get('/addUser', indexController.addUser);
router.post('/saveUser', indexController.saveUser);
router.use(middleware.isLoginCheck);
router.get('/', indexController.index);
router.get('/login', indexController.login);
router.post('/login', function(request, response, next){
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            var message = "Invalid credentials";
            return response.render('login',{message: info.message, userLoggedIn : null});
        }
        request.logIn(user, function(err) {
            if (err) { return next(err); }
            request.session.user = request.user;
            response.redirect('/userList');
        });
    })(request, response, next);
});
router.get('/logout', indexController.logout);
router.get('/userList', indexController.userList);

router.get('/updateUser/:id', indexController.updateUserView);
router.post('/updateUser', indexController.updateUser);
router.get('/deleteUser/:id', indexController.deleteUser);

module.exports =  router;
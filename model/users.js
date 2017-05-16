var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


//child address schema
var addressSchema = new Schema({
    line1: String,
    line2: String,
    city: String,
    state: String,
    country: String,
    pincode: Number
});

//create schema
//parent User Schema
var user = new Schema({
    id: Number,
    name: String,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: [addressSchema],
    created_at: {type: Date, default: Date.now},
    updated_at: Date
});

user.statics = {
    bcryptpassword: function (data, cb) {
        var saltRounds = 10;
        bcrypt.hash(data, saltRounds, function (err, hash) {
            if (err) {
                return cb(err);
            } else {
                return cb(null, hash);
            }
        });
    },
    /*comparePassword : function(data, cb){
        bcrypt.compare(data.compare, data.compareTo, function (err, passRes) {
            if (err) {
                return cb(err);
            } else {
                return cb(null, passRes);
            }
        });
    },*/
};

user.methods = {
    comparePassword : function(data, cb){
        bcrypt.compare(data.compare, data.compareTo, function (err, passRes) {
            if (err) {
                return cb(err);
            } else {
                return cb(null, passRes);
            }
        });
    },
};
// we need to create a model using it
var User = mongoose.model('User', user);

// make this available to our users in our Node applications
module.exports = User;
# Mongoose-Demo
Mongoose Demo having simple CRUD operations and authentication using passport

Install npm in the folder as the package.json has all the required nodejs modules, so simply
    npm install
   will load all the required modules.

Basic authenication for login is done using passport and passport local
We have simple dashboard from where in we login or sign up

As the demo requires mongoDb , make sure mongodb is installed in system

Simple userListing , add new user, update user and delete user is done
Have also added validation to user schema during create and update user.
Used pre save middleware to bcrypt the user password during saving the data to mongodb.


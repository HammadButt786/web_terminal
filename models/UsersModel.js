const mongoose = require ('mongoose');

const UserSchema =  mongoose.Schema({
    name : String,
    email : 
    {
        type: String,
        unique: true
    },
    gender : String,
    password : String
});

const Users = mongoose.model('user',UserSchema);
module.exports = Users;
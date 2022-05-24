const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {type : String , required : true , trim: true},
    email : {type : String , required : true , trim: true},
    password : {type : String , required : true , trim: true},
    // tc : {type : boolean , required : true }
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
},   { timestamps: true })
const UserModel = mongoose.model("user" ,UserSchema );

module.exports = UserModel;
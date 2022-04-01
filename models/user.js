const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
const defaultPath = path.join('/uploads/users/default/noPro.jpg');
const UserSchema  = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:defaultPath
    },
    follower:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
},{
    timestamps:true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' +Date.now());
    }
});
UserSchema.statics.uploadAvatar = multer({storage:storage}).single('avatar');
UserSchema.statics.avatarPath = AVATAR_PATH;
const User = mongoose.model('User',UserSchema);
module.exports = User;
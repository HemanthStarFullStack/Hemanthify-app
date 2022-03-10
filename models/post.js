const mongoose = require('mongoose');
const User = require('./user');
const multer = require('multer');
const path = require('path');
const avatarFilePath = path.join('/uploads/posts/pics');
const posts = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    avatarPath : {
        type :String
    },
    comments:[
        {
           type:mongoose.Schema.Types.ObjectId,
           ref:'Comment' 
        }
    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref : 'Like'
        }
    ]

},{
    timestamps: true
});
let storage = multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,path.join(__dirname,'..',avatarFilePath));
    },
    filename: function(req,res,cb){
        cb(null, file.fieldname + '-' +Date.now());
    }
})
posts.statics.uploadPicture = multer({storage:storage}).single('avatarPath');
const Post = mongoose.model('Post',posts);
module.exports = Post;
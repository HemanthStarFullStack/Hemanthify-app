const mongoose = require('mongoose');

const posts = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps: true
});

const Post = mongoose.model('Post',posts);
module.exports = Post;
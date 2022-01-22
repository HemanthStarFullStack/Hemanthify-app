const Post = require('../models/post');
const comment = require("../models/comments");

module.exports.posts = async function(req,res){
    try{
        await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        
        return res.redirect('back');

    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.query.id);
    
        if(post.user == req.user.id){
            post.remove();
            await comment.deleteMany({post:req.query.id})
            return res.redirect('back'); 
        }
        else
        {
            return res.redirect('back');
            
        }

    }catch(err){
        console.log(err);
        return;
    }
     
     
}

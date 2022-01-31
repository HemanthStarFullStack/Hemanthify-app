const Post = require('../models/post');
const comment = require("../models/comments");

module.exports.posts = async function(req,res){
    try{
        let post = await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        
        if(req.xhr){
            await post.populate('user');
             
            return res.status(200).json({

                data:{
                    postUserName:post.user.name,
                    postContent:post.content,
                    postId:post._id
                },
                message:"post Created"
            })
        }

        req.flash('success','Posted');
        return res.redirect('back');

    }catch(err){
        req.flash('err',err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.query.id);
    
        if(post.user == req.user.id){
            post.remove();
            await comment.deleteMany({post:req.query.id});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.query.id,
                    },
                    message:"postDeleted"
                });
            }

            req.flash('success','Post Deleted');
            return res.redirect('back'); 
        }
        else
        {   
            req.flash('error','Post Deletion Failed');
            return res.redirect('back');
            
        }

    }catch(err){
        req.flash('err',err);
        return;
    }
     
     
}

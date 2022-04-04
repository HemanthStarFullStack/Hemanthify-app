const comment = require('../models/comments');
const post = require('../models/post');
const queue = require('../config/kue');
const Like = require('../models/like');
const User = require('../models/user');
module.exports.comment_section  = async function(req,res)
{   
    try{
        let postData = await post.findById(req.body.post);
        let userData = await User.findById(req.user.id).populate();
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",userData.avatar);
        if(postData)
        {
            let commentNew = await comment.create(
                {
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
                });
                postData.comments.push(commentNew);
                postData.save();
                await commentNew.populate('user');
                let job = queue.create('emails',commentNew).save(function(err){
                    if(err){
                        console.log(err);
                        return;
                    }
                    console.log(job.id,"job enqueued");

                });
                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            commentor_con:req.body.content,
                            commentor_name:req.user.name,
                            comment_id: commentNew._id,
                            commentor_avatar:userData.avatar,
                            post_id:req.body.post
                        },
                        message:"comment-Created"
                    })
                    
                }
                req.flash('success',"comment Added");
                res.redirect("/");
                
        }

    }catch(err){
        console.log(err);
        return;

    }
}
module.exports.commentDeletion = async function(req,res){
    try{
        let commentData = await comment.findById(req.query.id);
        await Like.deleteMany({likeable:req.query.id});
        if(commentData.user == req.user.id){
                let postID = commentData.post;
                commentData.remove();
                await post.findByIdAndUpdate(postID,{$pull:{comments: req.query.id}});
                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            comment_id:req.query.id
                        },
                        message:"commentDeleted"
                    });
                }
                req.flash('error',"comment Deleted")
                return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return;
    }
     
}

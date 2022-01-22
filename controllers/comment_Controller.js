const comment = require('../models/comments');
const post = require('../models/post');

module.exports.comment_section  = async function(req,res)
{   
    try{
        let postData = await post.findById(req.body.post);
        if(post)
        {
            let commentNew = await comment.create(
                {
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
                });
                 
                postData.comments.push(commentNew);
                postData.save();
                res.redirect("/");
                
        }

    }catch(err){
        console.log(err);
        return;

    }
     
}

module.exports.commentDeletion = function(req,res){
    comment.findById(req.query.id , function(err,commentData){
        console.log(commentData.user.id);
        if(commentData.user == req.user.id){
            let postID = commentData.post;
            commentData.remove();
            post.findByIdAndUpdate(postID,{$pull:{comments: req.query.id}},function(err,post){
                if(err){
                    console.log(err);
                }
                return  res.redirect("back");
            })
        }
        else{
            return res.redirect('back');
        }
        

    })
}

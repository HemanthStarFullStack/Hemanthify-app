const Like  = require("../models/like");
const Comment = require('../models/comments');
const Post = require('../models/post');
module.exports.toggleLiker = async function(req,res){
    try{
        let likeables;
        let deleted = false;
        if(req.query.type == "Post"){
            likeables = await Post.findById(req.query.id).populate('likes');
        }else{
            likeables = await Comment.findById(req.query.id).populate('likes');
        }
        
        let extisingLike = await Like.findOne({
            likeable: req.query.id,
            onModel : req.query.type,
            user : req.user._id
        });
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@",extisingLike);
        if(extisingLike != null){
            likeables.likes.pull(extisingLike._id);
            likeables.save();
            extisingLike.remove();
            deleted = true;
        }else{
            let like = await Like.create({
                user: req.user._id,
                likeable:req.query.id,
                onModel:req.query.type
            });
            likeables.likes.push(like._id);
            likeables.save();
        }
        console.log("sucessful");
        return res.json({
            meassage: "request successful",
            data:{
                deleted:deleted,
                likesLen : likeables.likes.length
            }
        })
    }catch(err){
        console.log(err);
        return res.json(500,{
            message :"Internal Server Error"
        });
    }
}

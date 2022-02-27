const Post = require("../../../models/post");
const Comment = require("../../../models/comments");
module.exports.index = async function(req,res){
    let postData = await Post.find({})
        .sort("-createdAt")
        .populate("user","-password")
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
        
    return res.json(200,{
        message: "post-list",
        posts : postData
    });
}
module.exports.destroy = async function(req,res){
    console.log("**********",req.params.id);
    try{
        console.log(req.params.id);
        let post = await Post.findById(req.params.id);
        console.log(post);
        post.remove();
        await Comment.deleteMany({post:req.query.id});
        return res.json(200,{
            message: "deleted post and comments in it"
        }); 
    }catch(err){
        console.log(err);
        return res.json(401,{
            message:"api error"
        });
        
    }
     
     
}
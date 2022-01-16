const Post = require('../models/post');
module.exports.posts = function(req,res){
    console.log(req.user._id);
    // if(!user.body._id){
    //     window.alert("log In Please")
    //     return res.redirect('back')
    // }
    Post.create({
        content:req.body.content,
        user:req.user._id
    }, function(err,post){
        if(err){
            console.log(err);
            return;
        }
        return res.redirect('back');

    }
    
    
    );
}

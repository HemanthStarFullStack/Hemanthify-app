const post = require("../models/post");
const user = require("../models/user");
module.exports.home = async function(req,res){
    try{
        let postData = await post.find({})
        .sort("-createdAt")
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'likes'
            },
            populate:{
                path:'user',
            },
        }).populate('likes')
        
        // console.log("222222222222222222222222",postData);
        
        let userData = await user.find({});
        return res.render('home',{
            title:'Hemanthify Feed',
            posts:postData,
            users:userData
        });

    }catch(err){
        console.log(err);
        return;
    }
    
     
}

// (common syntax)module.exports.action = function(req,res)
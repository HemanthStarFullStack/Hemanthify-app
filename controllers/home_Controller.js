const post = require("../models/post");
const user = require("../models/user");
module.exports.home = async function(req,res){
    try{
        let postData = await post.find({})
        .sort("-createdAt")
        .populate({path:'user'})
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
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
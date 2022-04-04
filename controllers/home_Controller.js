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
                path:'likes',
            },
        }).populate('likes')
        .populate({
            path:'comments',
            populate:{
                path:'user',
            },
        });
        console.log(postData[0].comments);
        let userData = {};
        let followerData = {}
        if(req.user !== undefined){
            userData = await user.find({})
            followerData = await user.findById(req.user.id).populate('following');
        }
        if(userData.length > 0){
            userData = await userData.filter((user)=>{
                return user.id != req.user.id;
            });
        }
        userData = userData.filter((user)=>{
            let data = followerData.following.findIndex((follow)=>{
                return follow.id == user.id
            })
            if(data == -1){
                return true
            }
            else{
                return false
            }
        });
        return res.render('home',{
            title:'Hemanthify Feed',
            posts:postData,
            users:userData,
            followers:followerData
        });

    }catch(err){
        console.log(err);
        return;
    }
    
     
}

// (common syntax)module.exports.action = function(req,res)
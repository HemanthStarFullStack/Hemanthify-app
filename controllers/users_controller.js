const User = require("../models/user");
const fs = require("fs");
const path  = require('path');
const Friends = require("../models/friends");
const Post = require("../models/post");
module.exports.profile = async function(req,res){
   
    let Friend = await Friends.find({
        from_user:req.params.acId,
        to_user:req.params.id
    });
    let bools = false
    if(Friend.length == 0){
        bools = true
    }
    const user = await User.findById(req.params.id)
    .populate('follower')
    .populate('following');
    const post = await Post.find({user:req.params.id})
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
    const userData = await User.find({});
    let newUser = {}
    if(userData.length > 0){
        newUser = await userData.filter((user)=>{
            return user.id != req.params.id;
        });
    }
    return res.render('users',{
        title:"Profile",
        users_profile:user,
        user_connections:user,
        all:newUser,
        bools:bools,
        user_posts:post
    });
}
module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadAvatar(req,res,function(err){
                if(err){
                    console.log(err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                console.log(req.file);
                if (req.file){
                    if(user.avatar){
                        if (fs.existsSync(path.join(__dirname, '..', user.avatar))){
                            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        }
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save()
                return res.redirect('back');
            });
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
         }
        }
        else{
            req.flash('error',"unauthorized");
            return res.status(401).send('Unauthorized');
        }
}
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    
    return res.render("user_signUp",{
        title: "Hemanthify :: Sign Up"
    })
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    } 

    return res.render("user_signIn",{
        title: "Hemanthify :: Sign In "
    })
}

module.exports.create = async function(req,res){
   
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    let user =await User.findOne({email:req.body.email});
    if(!user){
        console.log(req.body);
        newUser = await User.create(req.body);
        return res.redirect('/users/sign-in');
    }else{
            return res.redirect('back');

    }
}
module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect(`/`);
}
module.exports.destroySesson = function(req,res){
    req.logout();
    req.flash('success','Logged out Successfully');
    return res.redirect("/users/sign-in");
}
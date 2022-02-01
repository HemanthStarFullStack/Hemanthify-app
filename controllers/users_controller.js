const User = require("../models/user");
const fs = require("fs");
const path  = require('path');
module.exports.profile = function(req,res){
    User.findById(req.params.id , function(err,user){
        console.log(user);
        return res.render('users',{
            title:"Profile",
            users_profile:user

        });

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

                    if (fs.existsSync(path.join(__dirname, '..', user.avatar))){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }


                    // this is saving the path of the uploaded file into the avatar field in the user
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
    return res.redirect(`/users/profile/${req.user.id}`);

}

module.exports.destroySesson = function(req,res){
    req.logout();
    req.flash('success','Logged out Successfully');
    return res.redirect("/");
}
const User = require("../models/user")
module.exports.profile = function(req,res){
     
    return res.render('users',{
        title:"usersArea"
    });
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

module.exports.create = function(req,res){
    console.log("body",req.body);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('not found');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('sign up error');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');

        }
    });

}
module.exports.createSession = function(req,res){
    return res.redirect("/users/profile");
}

module.exports.destroySesson = function(req,res){
    req.logout();
    return res.redirect("/");
}
const User = require("../models/user")

module.exports.profile = function(req,res){
    if (req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                 
                return res.render('users',{
                    title:"User_profile",
                    user:user
                })

            }
            // else if(user.password != req.body.password){
            //     window.alert("wrong Password");
                 

            // }
             
            return res.redirect('/users/sign-In')
            
             
        
        
        });
            
    }
    else{
        res.redirect('/users/sign-In')
    }
    

    // console.log("at user_con");
    // return res.render('users',{
    //     title:"usersArea"
    // });
}

module.exports.signUp = function(req,res){
    return res.render("user_signUp",{
        title: "Hemanthify :: Sign Up"
    })
}

module.exports.signIn = function(req,res){
    return res.render("user_signIn",{
        title: "Hemanthify :: Sign In "
    })
}
module.exports.signOut = function(req,res){
    res.cookie('user_id'," ");
    
    return res.redirect('/')
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
    console.log('create-session');
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('not found');
            return;
        }
        if(user){
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            res.cookie('user_id', user._id);
            return res.redirect('/users/profile');

        }
        else{
            return res.redirect('back');

        }

            
    });

}
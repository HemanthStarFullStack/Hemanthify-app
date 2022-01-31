const User = require("../models/user");
module.exports.profile = function(req,res){
    User.findById(req.params.id , function(err,user){
        return res.render('users',{
            title:"Profile",
            users_profile:user

        });

    });
    
}
module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        try{

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');

        }
        User.findByIdAndUpdate(req.params.id,req.body ,function(err,user){
            res.redirect('back');
        })
    }
    else{
        return res.status(401).send("Unauthorizerd");
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
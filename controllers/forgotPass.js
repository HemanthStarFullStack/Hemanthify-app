const User = require("../models/user");
const forgotPassword = require("../models/forgotPass");
const crypto = require('crypto'); 
const forgotMailer = require("../mailer/forgotPassMailer");

exports.forgotPass =(req,res) => {
    return res.render('forgot',{
        title :'Reset Password'
    })
}
module.exports.ForgotMailAuthForPass = async function(req,res){
    let user = await User.findOne({email:req.body.email});
    if(!user){
        req.flash('error','No Such User');
        return res.redirect('back');
    }
    if(user){
       let id = await forgotPassword.create({
            user: user,
            accessToken:crypto.randomBytes(20).toString('hex'),
            isValid : true
        });
        await forgotMailer.newForgotMail(id)
        req.flash('success','mail sent');
        return res.redirect('back');
    }
    
}
module.exports.SetNewPassPage = async function(req,res){
    let forgotPassObj = await forgotPassword.findOne({accessToken:req.params.token});
    if(forgotPassObj){
        req.flash('success',"Fill the form")
        console.log(forgotPassObj);
        return res.render('resetPass',{
            title: "Reset Password Form"
        });
    }   
    return res.render('invalid',{
        title: "Reset Password Form"
    });
    
    
}
module.exports.ForgotPassForm = async function(req,res){
    let passReqUser = await User.findOne({email:req.body.email});
    if(req.body.password == req.body.confirmPassword){
        passReqUser.password = req.body.password;
        passReqUser.save();
        req.flash('success',"Password Sucessfully Changed");
    }
    console.log(passReqUser);
    console.log(passReqUser._id);
    await forgotPassword.deleteOne({user:passReqUser._id});
    return res.redirect('/users/sign-in');
}
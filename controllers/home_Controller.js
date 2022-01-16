const post = require("../models/post");
module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',35)
    // return res.render('home',{
    //     title:'home'

    // });
    post.find({}).populate('user').exec(function(err,postData){
        // if(!req.isAuthenticated()){
        //     return res.redirect("/users/sign-in");
        // }
       
        return res.render('home',{
            title:'Hemanthify Feed',
            posts:postData,
        })

    });
}

// (common syntax)module.exports.action = function(req,res)
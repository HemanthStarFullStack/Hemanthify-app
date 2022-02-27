const User = require("../../../models/user");
 
const jwt = require("jsonwebtoken");


module.exports.createSession = async function(req,res){
    console.log(req);
    try{
        console.log(req.body.email);
        let user = await User.findOne({email:req.body.email});
        console.log(user.email);
        if(!user || user.password != req.body.password ){
            return res.json(401,{
                message:"invalid userName or Password"
            });

        }
        return res.json(200,{
            message:"sign IN successful ",
            data:{
                token : jwt.sign(user.toJSON(),"Hemanth",{expiresIn:"10000000"})
            }
        });

    }catch(err){
        console.log(err);
        console.log(err);
        return res.json(401,{
            message:"api error"
        });
    }
}
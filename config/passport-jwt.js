const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const env = require('../config/enivironment');
const User = require("../models/user");

let opts= {
    jwtFromRequest :  ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.jwt_key

}
console.log(opts);
passport.use(new JWTstrategy(opts, function(jwtPayload,done){
    console.log(jwtPayload);
    User.findById(jwtPayload._id , function(err,user){
        if(err){
            console.log(err);
            return;
        }
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })

}));

module.exports = passport;
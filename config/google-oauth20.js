const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto  = require('crypto');
const User = require('../models/user');


passport.use(new googleStrategy({

        clientID:"993786068542-or7irrp445g9m010s2ios1i24s8qnag0.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:8000/users/auth/google/callback"
        },
        function(accessToken,refreshToken,profile,done){
            User.findOne({email:profile.emails[0].value}).exec(function(err,user){
                if(err){
                    console.log("googleAuth",err);
                    return;
                }
                 
                if(user){
                    return done(null,user);
                }else{
                    User.create({
                        name:profile.displayName,
                        email:profile.emails[0].value,
                        password:crypto.randomBytes(20).toString('hex'),
                        // avatar : User.defaultPath

                    },function(err,user){
                        if(err){
                            console.log("googleAuth",err);
                            return;
                        }
                        return done(null,user);

                    })
                }
            })
        }

));

module.exports = passport;
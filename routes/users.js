const express = require('express');

const router  = express.Router();

const passport = require('passport');

const users_controller = require('../controllers/users_controller');
const forgot_pass = require('../controllers/forgotPass')

router.get('/profile/:id',passport.checkAuthentication,users_controller.profile);
router.post('/update/:id',passport.checkAuthentication,users_controller.update);
router.get('/sign-up',users_controller.signUp);
router.get('/sign-in',users_controller.signIn);

router.post('/create',users_controller.create);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'},
),users_controller.createSession);

router.get('/sign-out',users_controller.destroySesson);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:"/users/sign-in"}),users_controller.createSession);
router.get('/forgotPassword',forgot_pass.forgotPass);
router.get('/forgotPassword/:token',forgot_pass.SetNewPassPage);
router.post('/forgotPassword',forgot_pass.ForgotMailAuthForPass);
router.post('/forgotForm',forgot_pass.ForgotPassForm);

module.exports = router;
const nodemailer = require('../config/nodemailer');
exports.newForgotMail = (job)=>{
    // let link = `forgotPass/$("job.accessToken")`;
    console.log("$$$$$$$$$$$$$$",job.user.email);
    console.log('inside job  mailer');
    let htmlString = nodemailer.renderTemplate({job:job},'/forgotMails/forgotPassMailer.ejs');
     
    nodemailer.transporter.sendMail({
        from:'hemanthifyApp@gmail.com',
        to: job.user.email,
        subject:"New Password Link",
        html: htmlString
    },(err,info)=>{
         
        if(err){
            console.log(err);
            return;
        }
        console.log('message sent');
         
        return;
    });
}
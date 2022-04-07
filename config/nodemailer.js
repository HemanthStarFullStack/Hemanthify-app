const ejs  = require("ejs");
const nodemailer = require("nodemailer");
const path = require('path');
const env = require('../config/enivironment')
let transporter = nodemailer.createTransport(env.smtp);


let renderTemplate  = (data, relativePath)=>{
    console.log(".............................renderTemp");
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mailer',relativePath),
        data,
        function(err,template){
             
          
            if(err){
                console.log(data);
                console.log("mailer",err);
            }
            mailHtml = template
        }
    
    )
     
    return mailHtml;

}

module.exports = {
    transporter: transporter,
    renderTemplate:renderTemplate
}
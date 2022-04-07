const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});

const development = {
    name:'development',
    asset_path:process.env.asset_path,
    grunt_path:process.env.grunt_path,
    grunt_path_css:process.env.grunt_path_css,
    sessionCookie:process.env.sessionCookie,
    db:process.env.db,
    smtp:{
        service :process.env.service,
        host:process.service,
        port :process.env.port,
        secure:process.env.secure,
        auth:{
           user:process.env.user,
           pass:process.env.pass 
        }
    },
    google_client_id:process.env.google_client_id,
    google_client_secret:process.env.google_client_secret,
    google_callback_url:process.env.google_callback_url,
    jwt_key:process.env.jwt_key,
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}

const production = {
    name:process.env.mode,
    asset_path:process.env.asset_path,
    grunt_path:process.env.grunt_path,
    grunt_path_css:process.env.grunt_path_css,
    sessionCookie:process.env.sessionCookie,
    db:process.env.db,
    smtp:{
        service :process.env.service,
        host:process.service,
        port :process.env.port,
        secure:process.env.secure,
        auth:{
           user:process.env.user,
           pass:process.env.pass 
        }
    },
    google_client_id:process.env.google_client_id,
    google_client_secret:process.env.google_client_secret,
    google_callback_url:process.env.google_callback_url,
    jwt_key:process.env.jwt_key,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}


module.exports = eval(process.env.mode) == undefined ? development : eval(process.env.mode);
const sass = require('node-sass');
const grunt=require('grunt');
const env = require('./config/enivironment');
const path = require('path');
require('load-grunt-tasks')(grunt);
grunt.loadNpmTasks('grunt-rev');
const gPath = path.join(__dirname,env.grunt_path);
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {                       
            dist: {                         
              options: {                      
                style: 'expanded',
                implementation:sass
              },
              files: [{                      
                expand:true,
                cwd:gPath,
                src: '**/*.scss',
                dest:path.join(__dirname,"./public/assets/css"),
                ext: '.css'
              }]
            }
        } 
    })

    grunt.registerTask('default',['sass']);
};
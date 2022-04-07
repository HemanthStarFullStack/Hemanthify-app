
const sass = require('node-sass');
const grunt=require('grunt');
const env = require('./config/enivironment');
const path = require('path');
require('load-grunt-tasks')(grunt);

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
                cwd:path.join(__dirname,env.grunt_path),
                src: '**/*.scss',
                dest:path.join(__dirname,env.grunt_path_css),
                ext: '.css'
              }]
            }
        }
    })

    grunt.registerTask('default',['sass']);
};
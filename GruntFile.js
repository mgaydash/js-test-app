module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            files: [
                "js/**/*.js",
                "css/**/*.css",
                "view/**/*.html",
                "view/**/*.jsp"
            ],
            options: {
                livereload: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
};

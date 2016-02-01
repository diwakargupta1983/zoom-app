module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            less: {
                files: "public/less/*",
                tasks: ["less"]
            }
        },
        less: {
            development: {
                options: {
                    paths: ["public/css"]
                },
                files: {"public/css/style.css": "public/less/style-source.less"}
            },
            production: {
                options: {
                    paths: ["public/css"],
                    cleancss: true
                },
                files: {"public/css/style.css": "public/less/style-source.less"}
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('default', ['watch']);
};
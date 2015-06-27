module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'clientjs/**/*.js', 'index.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    uglify: {
      dist: {
        files: {
            'build/build.js': ['clientjs/**/*.js']
        }
      }
    },
    watch: {
      clientjs: {
        files: ['clientjs/**/*.js'],
        tasks: ['jshint', 'uglify']
      }
    },
    nodemon: {
      start: {
        script: "index.js",
        options: {
          ignore: ['node_modules/**', 'bower_components/**'],
          watch: ['Gruntfile.js', 'index.js'],
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon:start', 'watch:clientjs'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['jshint', 'uglify', 'concurrent:dev']);

};

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'public/**/*.js', 'server/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/js/build.js': ['public/**/*.js']
        }
      }
    },

    watch: {
      clientjs: {
        files: ['public/**/*.js'],
        tasks: ['jshint', 'uglify']
      },
      css: {
        files: ['public/css/**'],
        tasks: ['exec:copywww']
      }
    },

    nodemon: {
      dev: {
        script: "server/index.js",
        options: {
          env: {
            NODE_ENV: "development"
          },
          ignore: ['node_modules/**', 'bower_components/**'],
          watch: ['Gruntfile.js', 'server/**/*.js'],
        }
      },
      prod: {
        script: "server/index.js",
        options: {
          env: {
            NODE_ENV: "production"
          },
        }
      }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon:dev', 'watch:clientjs', 'watch:css'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    exec: {
      clearwww: 'rm -rf dist && mkdir -p dist/css && mkdir -p dist/js',
      copywww: 'cp -R public/css/* dist/css'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', [
    'jshint',
    'exec:clearwww',
    'exec:copywww',
    'concurrent:dev'
  ]);

  grunt.registerTask('deploy', [
    'exec:clearwww',
    'exec:copywww',
    'uglify',
    'nodemon:prod'
  ]);

};

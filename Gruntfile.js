module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	grunt.loadTasks("tasks");

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		resume: {
			custom_options: {				
				files: {
					'index.html': ['resume.template', "styles/main.css", "resume.json"]
				}
			}
		},
		watch: {
			src: {
				files: [
					'scss/*',
					'resume.template',
					'resume.json' 
				],
				tasks: ['dev'],
			}
		},
		sass: {
			options: {
				includePaths: [
					'scss/'
				]
			},
			dist: {
				files: {
					'css/main.css': 'scss/base.scss'
				}
			}
		},
		postcss: {
    		options: {
    			map: true,
	    		processors: [
	        		require("pixrem")(), // add fallbacks for rem units
	        		require("autoprefixer")({browsers: "last 2 versions"}), // add vendor prefixes
	        		require("cssnano")() // minify the result
	      		]
    		},
    		dist: {
		    	src: "css/*.css"
		    }
    	}
	})

	grunt.registerTask('default', ['dev', 'watch'])
	grunt.registerTask('dev', ['sass', 'resume'])
	grunt.registerTask('build', ['dev', 'postcss'])
}

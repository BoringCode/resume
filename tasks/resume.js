module.exports = function(grunt) {
	var fs = require("fs");
	var Handlebars = require("handlebars");

	Handlebars.registerHelper("nl2br", function(value) {
		return (value || "").replace(/\n/g, "</p><p>");
	});

	var render = function(css, resume, template) {
		return Handlebars.compile(template)({
			css: css,
			resume: resume
		});
	}

	var checkFileExists = function(f) {
		if (!grunt.file.exists(f)) {
			grunt.log.warn("No such file: " + f.src);
			return false;
		}
		return true;
	}

	grunt.registerMultiTask("resume", "A simple grunt task to render a resume", function() {
		var options = this.options();
		grunt.log.writeln("Rendering resumes...");

		this.files.forEach(function(f) {
			//Little quick and dirty
			if (f.src.length !== 3 || !checkFileExists(f.src[0]) || !checkFileExists(f.src[1]) || !checkFileExists(f.src[2])) {
				return false;
			}
			
			var template = grunt.file.read(f.src[0]);
			var css = grunt.file.read(f.src[1]);
			var json = JSON.parse(grunt.file.read(f.src[2]));

			var resume = render(css, json, template);

			grunt.file.write(f.dest, resume);

			grunt.log.writeln("Resume: " + f.dest + " created");
		})
	})
}


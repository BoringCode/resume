# Resume - Bradley Rosenfeld

This is my custom resume built with HTML and CSS. I export it as a PDF from Google Chrome.

## Requirements

- Node.js
- NPM
- Grunt

## Setup

Install dependencies

```bash
npm install
```

Build resume (outputs to index.html, configurable in Gruntfile.js)
```bash
grunt build
```

## Updates

All resume data is stored in `resume.json` and is output in a template called `resume.template`. A custom Grunt plugin (`tasks/resume.js`) handles rendering it using Handlebars.
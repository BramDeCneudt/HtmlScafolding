# HtmlScafolding
A project to start working on static html pages with some out of the box tooling.

Out of the box it supports following:

* compiles sass to css
* automatic minifying of js and css files
* uses Handlebar.js to supply more (basic) component based implementations as you see in Vue/React without leaving the footprints behind. It all compiles to just basic HTML.
* uses browser-sync to auto reload on any changes
* uses PurgeCSS to purge any unused css



# Folder structure

The project follows a particular structure

* src/
  * vendor: folder for adding 3rd party dependencies like tailwind.css, alpine.js,...
  * js: folder for js stylesheets
  * sass: folder to hold your sass files
  * css: folder to hold css. If you run sass-watch it will compile the sass files to css and add it to this directory
  * root folder holds all the html pages
  * image and docs: hold the respectively file needed for displaying  images or files
  * templates: you can create handlebars partials in here to use in you index.html

# Usage

`npm run app-package`, if you want to build the project.

`npm run sass-watch`, compiles the sass into css in the src/css folder to use in the html.

`npm run sync`, starts the local dev server with browser-sync.

# How to start

start by installing the dependencies:

`npm install`

Once that is succeeded you can start the automatic compile from sass to css:

`npm run sass-watch`

and start up the local dev server:

`npm run sync`

Once you are ready with the changes you can build it with:

`npm run app-package`

And deploy it wherever you want it.
# HtmlScafolding
basic html template for npm, uses gulp and sass to compile the resources



# Folder structure

* src/
  * vendor: folder for adding 3rd party dependencies like tailwind.css, alpine.js
  * js: folder for js stylesheets
  * sass: folder to hold your sass files
  * css: folder to hold css. If you run sass-watch it will compile the sass files to css and add it to this directory
  * root folder holds all the html pages

# Usage

npm run app-package, if you want to build the develop output, outputs in dist.

npm run sass-watch, compiles the sass into css in the src/css folder to use in the html.
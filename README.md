# PDFMerger

Merge up to five pdf files in chosen order into one. The frontend is handled by HTML/CSS and some JavaScript. Backend uses python and django. The file is stored on the server side and then served to the client with a http file response when ready to download. Merged file is stored indefinitely (cleanup as a future feature?).

## Get started

I used FontAwesome icons as buttons so if you don’t want to refactor:  
* Register at https://fontawesome.com/ (it’s free)
* Set up a kit (again, free)
* Copy the “*.js” part from your kit’s code (https://kit.fontawesome.com/the_part_you_want.js)
* In your project .env file add FONT_AWESOME=the_part_you_want.js

You should also provide SECRET_KEY in the project .env file.

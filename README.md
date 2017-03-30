## Result
![alt tag](https://raw.githubusercontent.com/manuelro/canvas-image-hue/master/result.gif)

### Changing image hue with HTML5 Canvas
Changing the hue of an image in the client side is not as easy as if you had some processor on a server specifically for that task. It requires many things:

#### First
An image (of course), you can load this via XHR or from your same host.

#### Second
You have to find a way to iterate over each pixel, detect if it has color (is not white, nor black) somehow convert the RGB values of that pixel to HSL to then replace the hue with the desired one.

#### Third
Iterating over each pixel is a very RAM consuming task. Some regular size images can contain up to 1 million pixels. In order to avoid blocking the one and only JS thread (JS has only one), you have to make sure to accomplish the iteration in a async way.

#### Fourth
You may want to cache the new set of modified pixels somewhere. These can be stored in an array. Thay way the next time you need to change switch the image hue, the only thing you must do is to iterate over the array, that will save your computer and OS a lot of RAM and everything will run smoothly.

Changing the hue of an image on the client side is perhaps one of those things you want to avoid, it consumes a lot of resources and the result can take some time depending on the image pixel density.

#### Running the project
I used Yeoman Webapp generator for this. In orther to start the server you should download the repo to you computer, cd to it and run from the command line `gulp serve`.

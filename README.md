aspectRatioResizeImg
====================

This is a jQuery plugin that allows resizing of an image preserving its aspect ratio, fitting a container. Optionally the container can be resized to match the image aspect ratio.

Features
====================

1. Resizing an image to fit container width and height
2. Align the image in vertical and horizontal axis
3. Resizing the image container (width or height) to fit image aspect ratio

Example
====================

[Example in jsFiddle](http://jsfiddle.net/Mandarinazul/B8Bby/ "Example")

Getting Started
====================

1. Download jQuery
2. Download aspectRatioResizeImg plugin
3. Call the function aspectRatioResizeImg on a jQuery object. It must have a <img> object inside it. It is possible to select the class of the object using the parameter imageClass.

Parameters
--------
* backgroundHorizontalAlign. Values: "LEFT" | "RIGHT" | "CENTER". Default: "CENTER"
* backgroundVerticalAlign. Values: "TOP" | "BOTTOM" | "MIDDLE". Default: "MIDDLE"
* resizeContainerType: Values: "WIDTH" | "HEIGHT". Default: null. This parameter defines the behavior of container, if it must be resized before the image resize. If "WIDTH" is selected, the container will change its width to match image aspect ratio, if "HEIGHT" is selected, the container will change its height to match image aspect ratio. If nothing is selected, the container won't change its aspect ratio.
* debug: Values: true | false. Default: false. This parameter defines if the plugin should print debug info in console
* callback: Values: function. Default value: null. The callback function that should be called after the plugins finishes its execution
* imageClass: Values: String. Default value: null. The class of the image that will be resized. If nothing is provided, will change any <img> inside the container.

BUT...
--------
You can do it with CSS! [Explanation](http://jsfiddle.net/Mandarinazul/B8Bby/ "Explanation").
Yes, you are right, max-width and max-height WILL do the trick. But the image will never fit the container if the container is bigger than the image. And sometimes you will need to FILL the container with the image, you can't do it with CSS only. I'll add an option that allows the developer control the behaviour of the plugin between "fill" and "center".

TODO
--------
1. Error handling
2. Examples
3. A site for the plugin
4. Completing debug info
5. Align the image in percentaje or pixels units
6. Option to select "fill" or "center" the image in the container
7. Giving a nice format to this file
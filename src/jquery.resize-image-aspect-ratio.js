/** Copyright (c) 2013-2014 Mandarinazul
 *
 * Author: Julian Acosta
 *
 * Permission is hereby granted, free of charge, to any
 * person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice
 * shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
 * KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * Version: 1.2.5
 */

(function ($) {
	$.fn.aspectRatioResizeImg = function (options) {

		var settings = $.extend (
			{
				backgroundHorizontalAlign: "CENTER",
				backgroundVerticalAlign: "MIDDLE",
				resizeContainerType: null,
				debug: false,
				callback: null,
				imageClass: null,
				mode: "FILL",
				horizontalAlignFrom: "LEFT",
				verticalAlignFrom: "TOP"
			}, options
		);

		return this.each (
			function () {

				/*************** GLOBAL VARIABLES ************/
				var containerHeight;
				var imgHeight;
				var diffHeight;
				var containerWidth;
				var imgWidth;
				var diffWidth;
				var container = $ (this);
				var aspectRatioContainer;
				var aspectRatioImg;
				var img;

				if (settings.imageClass) {
					img = container.find ("img." + settings.imageClass);
				}
				else {
					img = container.find ("img");
				}

				img.css ("display", "block");
				updateAspectRatio ();
				resizeContainerF ();
				updateAspectRatio ();
				resizeBg ();
				centerBg ();

				if (settings.callback) {
					settings.callback ();
				}

				function updateAspectRatio () {
					aspectRatioContainer = container.width () / container.height ();
					aspectRatioImg = img.attr ("width") / img.attr ("height");
					debugAspectRatio ();
				}

				function resizeContainerF () {
					if (settings.resizeContainerType === "WIDTH") {
						var newContainerWidth = container.height () * aspectRatioImg;
						if (container.css ("box-sizing") === "border-box") {
							newContainerWidth += parseInt (container.css ("padding-left"));
							newContainerWidth += parseInt (container.css ("padding-right"));
							newContainerWidth += parseInt (container.css ("border-left-width"));
							newContainerWidth += parseInt (container.css ("border-right-width"));
						}
						container.css ('width', newContainerWidth);
					}
					else {
						if (settings.resizeContainerType === "HEIGHT") {
							var newContainerHeight = container.width () / aspectRatioImg;
							if (container.css ("box-sizing") === "border-box") {
								newContainerHeight += parseInt (container.css ("padding-top"));
								newContainerHeight += parseInt (container.css ("padding-bottom"));
								newContainerHeight += parseInt (container.css ("border-top-width"));
								newContainerHeight += parseInt (container.css ("border-bottom-width"));
							}
							container.css ('height', newContainerHeight);
						}
					}
					debugResizeContainer ();
				}

				function resizeBg () {

					var containerWider = (aspectRatioContainer > aspectRatioImg) ? true : false;

					if (settings.mode === "FILL") {
						if (containerWider) {
							img.attr ("width", container.width ());
							img.attr ("height", img.attr ("width") / aspectRatioImg);
						}
						else {
							img.attr ("height", container.height ());
							img.attr ("width", img.attr ("height") * aspectRatioImg);
						}
					}
					else if (settings.mode === "FIT") {
						if (containerWider) {
							img.attr ("height", container.height ());
							img.attr ("width", img.attr ("height") * aspectRatioImg);
						}
						else {
							img.attr ("width", container.width ());
							img.attr ("height", img.attr ("width") / aspectRatioImg);
						}
					}
					else if (settings.mode === "STRETCH") {
						img.attr ("width", container.width ());
						img.attr ("height", container.height ());
					}
					debugResizeBg ();
				}

				function centerBg () {
					 containerHeight = container.height ();
					 imgHeight = img.height ();
					 diffHeight = imgHeight - containerHeight;
					 containerWidth = container.width ();
					 imgWidth = img.width ();
					 diffWidth = imgWidth - containerWidth;
					if (settings.mode === "CENTER") {
						img.css ('marginLeft', -diffWidth / 2);
						img.css ('marginTop', -diffHeight / 2);
					}
					else if (settings.mode === "VERTICAL_CENTER") {
						img.css ('marginTop', -diffHeight / 2);
						if (settings.backgroundHorizontalAlign === 'LEFT') {
							img.css ('marginLeft', 0);
						}
						else if (settings.backgroundHorizontalAlign === 'CENTER') {
							img.css ('marginLeft', -diffWidth / 2);
						}
						else if (settings.backgroundHorizontalAlign === 'RIGHT') {
							img.css ('marginLeft', -diffWidth);
						}
						else {
							if (settings.horizontalAlignFrom === "LEFT") {
								img.css ('marginLeft', settings.backgroundHorizontalAlign);
							}
							else if (settings.horizontalAlignFrom === "RIGHT") {
								img.css ('marginLeft', "-" + settings.backgroundHorizontalAlign);
							}
						}
					}
					else {
						if (settings.backgroundHorizontalAlign === 'LEFT') {
							img.css ('marginLeft', 0);
						}
						else if (settings.backgroundHorizontalAlign === 'CENTER') {
							img.css ('marginLeft', -diffWidth / 2);
						}
						else if (settings.backgroundHorizontalAlign === 'RIGHT') {
							img.css ('marginLeft', -diffWidth);
						}
						else {
							if (settings.horizontalAlignFrom === "LEFT") {
								img.css ('marginLeft', settings.backgroundHorizontalAlign);
							}
							else if (settings.horizontalAlignFrom === "RIGHT") {
								if (settings.backgroundHorizontalAlign.substring (0, 1) === "-") {
									settings.backgroundHorizontalAlign = settings.backgroundHorizontalAlign.substring (1, settings.backgroundHorizontalAlign.length);
								}
								img.css ('marginLeft', "-" + settings.backgroundHorizontalAlign);
							}
						}

						if (settings.backgroundVerticalAlign === 'TOP') {
							img.css ('marginTop', 0);
						}
						else if (settings.backgroundVerticalAlign === 'MIDDLE') {
							img.css ('marginTop', -diffHeight / 2);
						}
						else if (settings.backgroundVerticalAlign === 'BOTTOM') {
							img.css ('marginTop', -diffHeight);
						}
						else {
							if (settings.verticalAlignFrom === "TOP") {
								img.css ('marginTop', settings.backgroundVerticalAlign);
							}
							else if (settings.verticalAlignFrom === "BOTTOM") {
								if (settings.backgroundVerticalAlign.substring (0, 1) === "-") {
									settings.backgroundVerticalAlign = settings.backgroundVerticalAlign.substring (1, settings.backgroundVerticalAlign.length);
								}
								img.css ('marginTop', "-" + settings.backgroundVerticalAlign);
							}
						}
						debugCenterBg ();
					}
				}

				function debugAspectRatio () {
					if (settings.debug) {
						console.log ("Container AR :" + aspectRatioContainer);
						console.log ("Img AR :" + aspectRatioImg);
					}
				}

				function debugResizeContainer () {
					if (settings.debug) {
						console.log ("Container WIDTH :" + container.width ());
						console.log ("Container HEIGHT :" + container.height ());
					}
				}

				function debugResizeBg () {
					if (settings.debug) {
						console.log ("IMG WIDTH:" + img.width ());
						console.log ("IMG HEIGHT:" + img.height ());
					}
				}

				function debugCenterBg () {
					if (settings.debug) {
						console.log ("Width Difference" + diffWidth);
						console.log ("Height Difference" + diffHeight);
					}
				}
			}
		);
	}
}(jQuery));
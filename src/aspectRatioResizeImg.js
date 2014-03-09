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

 * Version: 1.0.1
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
				mode: "FILL"
			}, options
		);

		return this.each (
			function () {
				var container = $ (this);
				if (settings.imageClass) {
					var img = container.find ("img." + settings.imageClass);
				}
				else {
					var img = container.find ("img");
				}
				img.css ("display", "block");

				var aspectRatioContainer;
				var aspectRatioImg;

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
							console.log ("a");
						}
						else {
							console.log ("b");
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
					var containerHeight = container.height ();
					var imgHeight = img.height ();
					var diffHeight = imgHeight - containerHeight;
					var containerWidth = container.width ();
					var imgWidth = img.width ();
					var diffWidth = imgWidth - containerWidth;
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
							img.css ('marginLeft', settings.backgroundHorizontalAlign);
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
							img.css ('marginTop', settings.backgroundVerticalAlign);
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
						console.log ("IMG CLASS:" + img.attr ('class'));
					}
				}

				function debugCenterBg () {
					if (settings.debug) {

					}
				}
			}
		);
	}
}(jQuery));
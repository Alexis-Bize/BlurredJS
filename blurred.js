/*
 * BlurredJS - 1.0.2
 * @author: Alexis (@_SuckMyLuck) Bize / Mathieu (@OtaK_) Amiot
 * @about: JavaScript canvas-based image blurring engine
 * @changelog
 *    1.0.2 - callback support
            - getProps prototype
 *    1.0.1 : toDataURL fallback
 *    1.0.0 : Initial release
 */

(function() {

	var allowedMimeTypes = [
		'image/jpeg',
		'image/png'
	];

	var Blurred = function(element) {
		this._element = element;
		this._imgTag = !!(this._element.tagName === 'IMG');
		this._url = this._element.getAttribute(this._imgTag ? 'src' : 'data-blurred');
		this._mimeType = allowedMimeTypes[0];
		this._blurStrength = 5;
		this._imgContainer = null;
		this._callback = function() {
			return;
		};
	};

	Blurred.prototype.setBlurStrength = function(blur) {
		this._blurStrength = parseInt(blur, 10);
		return this;
	};

	Blurred.prototype.setMimeType = function(mime) {
		this._mimeType = (!!~allowedMimeTypes.indexOf(mime)) ? mime : this._mimeType;
		return this;
	};

	Blurred.prototype.setUrl = function(url) {
		this._url = url;
		return this;
	};

	Blurred.prototype.setCallback = function(callback) {
		this._callback = typeof callback === 'function' ? callback : this._callback;
		return this;
	};

	Blurred.prototype.render = function() {
		var canvas = document.createElement('canvas');

		if (!!(canvas.getContext && canvas.getContext('2d')) === false)
		{
			this._imgTag ?
				this._element.src = this._url :
					this._element.style.backgroundImage = 'url(' + this._url + ')';

			return this._callback();
		}

		var img = new Image();
		img.crossOrigin = 'Anonymous';
		img.src = this._url;

		var self = this;

		img.onload = function()
		{
			self._imgContainer = this;

			var iw = this.width,
				ih = this.height;

			canvas.setAttribute('width', iw);
			canvas.setAttribute('height', ih);

			canvas = document.body.appendChild(canvas);

			var context = canvas.getContext('2d');

			var cw = context.canvas.width,
				ch = context.canvas.height;

			context.drawImage(img, (cw / 2 - iw / 2), (ch / 2 - ih / 2));

			context.globalAlpha = 0.5;

			for (var y = -self._blurStrength; y <= self._blurStrength; y += 2)
			{
				for (var x = -self._blurStrength; x <= self._blurStrength; x += 2)
				{
					context.drawImage(canvas, x, y);
					if (x >= 0 && y >= 0)
						context.drawImage(canvas, -(x - 2.5), -(y - 2.5));
				}
			}

			context.globalAlpha = 1.0;

			var base64;
			try { base64 = context.canvas.toDataURL(self._mimeType); }
			catch (e) { base64 = self._url; }

			document.body.removeChild(canvas);

			self._imgTag ?
				self._element.src = base64 :
					self._element.style.backgroundImage = 'url(' + base64 + ')';

			return self._callback();
		};
	};

	Blurred.prototype.getProps = function(obj) {
		if (!!this._element)
		{
			if (obj !== Object(obj))
				return;

			var props = {};

			for (var i in obj)
				if (!!this.hasOwnProperty('_' + obj[i]) && obj[i] !== 'callback')
					props[obj[i]] = this['_' + obj[i]];

			return props;
		}
	};

	Blurred.prototype.destroy = function() {
		if (!!this._element)
			this._imgTag ?
				this._element.src = this._url :
					this._element.style.backgroundImage = this._url;
	};

	// AMD / CommonJS stuff
	if (typeof define === 'function' && !!define.amd)
		define(function() { return Blurred; });
	else if (typeof module === 'object' && !!module && typeof module.exports === 'object' && !!module.exports)
		module.exports = Blurred;
	else
		window.Blurred = Blurred;

})();

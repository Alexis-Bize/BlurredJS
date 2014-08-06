var Blurred = {

	render: function(DOMElement, ImgUrl, blurStrength, mimeType)
	{
		if (DOMElement === undefined)
			return;

		if (ImgUrl === undefined)
			ImgUrl = DOMElement.getAttribute('data-blur');

		if (ImgUrl === null)
			return;

		var canvas = document.createElement('canvas');

		if (!!(canvas.getContext && canvas.getContext('2d')) === false)
			return DOMElement.style.backgroundImage = 'url(' + ImgUrl + ')';

		var allowedMimeTypes = [
			'image/jpeg',
			'image/png',
			'image/gif'
		];

		mimeType = !!~allowedMimeTypes.indexOf(mimeType) ? mimeType : allowedMimeTypes[0];
		blurStrength = !isNaN(blurStrength) ? parseInt(blurStrength, 10) : 5;

		var img = new Image();
		img.crossOrigin = 'Anonymous';
		img.src = ImgUrl;

		img.onload = function()
		{
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

			for (var y = -blurStrength; y <= blurStrength; y += 2)
				for (var x = -blurStrength; x <= blurStrength; x += 2)
				{
					context.drawImage(canvas, x, y);
					if (x >= 0 && y >= 0)
						context.drawImage(canvas, -(x - 1), -(y - 1));
				}

			context.globalAlpha = 1.0;

			var base64 = context.canvas.toDataURL(mimeType);
			document.body.removeChild(canvas);

			return DOMElement.style.backgroundImage = 'url(' + base64 + ')';
		};
	}

};
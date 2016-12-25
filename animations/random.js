var colors = require('../colors');
var tinycolor = require('tinycolor2');

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Random() {
	this._brightnessRoot = {
		value: 0.2,
		direction: 1,
		min: 0,
		max: 0.45,
		step: 0.04
	};

	this._pixelsBrightness = [];

	this.config = {
		color: {
			value: {
				r: 0,
				g: 0,
				b: 255
			}
		},
		range: 'single'
	};
}

Random.prototype = {
	requestFrame: function (pixels) {
		this.setRandomPixel(pixels.length);

		for (var i = 0; i < pixels.length; i++) {
			if (this._pixelsBrightness[i]) {
				if (this._pixelsBrightness[i].value >= this._brightnessRoot.max) {
					this._pixelsBrightness[i].direction = -1;
				}

				this._pixelsBrightness[i].value = this._pixelsBrightness[i].value
					+ this._brightnessRoot.step * this._pixelsBrightness[i].direction;

				var rgb = tinycolor.fromRatio({
					h: this._pixelsBrightness[i].hue,
					s: 1,
					l: this._pixelsBrightness[i].value
				});
				pixels[i] = colors.rgb2Int(rgb._r, rgb._g, rgb._b);

				if (this._pixelsBrightness[i].value <= this._brightnessRoot.min) {
					this._pixelsBrightness[i] = undefined;
				}
			}
		}

		return pixels;
	},

	setRandomPixel: function (pixels) {
		var randomPixel;
		var tries = 0;

		do {
			randomPixel = getRandom(0, pixels);
		}
		while (this._pixelsBrightness[randomPixel] && ++tries < pixels);

		var hue = getRandom(0, 360);

		this._pixelsBrightness[randomPixel] = {
			value: this._brightnessRoot.min + this._brightnessRoot.step,
			direction: 1,
			hue: hue
		};
	}
};

module.exports = new Random();
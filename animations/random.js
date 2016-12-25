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
			pixels[i] = colors.rgb2Int(getRandom(0, 255), getRandom(0, 255), getRandom(0, 255));
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

		var hue = this.config.color.range === 'single'
			? tinycolor(this.config.color.value).toHsl().h
			: getRandom(0, 360);

		this._pixelsBrightness[randomPixel] = {
			value: this._brightnessRoot.min + this._brightnessRoot.step,
			direction: 1,
			hue: hue
		};
	}
};

module.exports = new Random();
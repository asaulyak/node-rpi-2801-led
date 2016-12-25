var colors = require('../colors');
var tinycolor = require('tinycolor2');

function Comet(color) {
	this._head = 0;
	this._tailLength = 50;
	this._color = tinycolor.fromRatio(color).toHsv();

	this.update();
}

Comet.prototype = {
	update: function () {
		this._colors = [];

		for (var i = 0; i < this._tailLength; i++) {
			var brightens = (1 - i / this._tailLength) / 2.5;

			this._colors.push(tinycolor.fromRatio({
				h: this._color.h,
				s: 1,
				l: brightens
			}).toRgb());
		}
	},

	requestFrame: function (pixels, frame) {
		for (var i = 0; i < pixels.length; i++) {
			var distance = this._head - i;

			if(this._head < this._tailLength && distance < 0 && frame - this._tailLength > 0) {
				distance = pixels.length - i + this._head;
			}

			var rgb = {
				r: 0,
				g: 0,
				b: 0
			};

			if (distance >= 0 && distance < this._tailLength) {
				rgb = this._colors[distance];
			}

			pixels[i] = colors.rgb2Int(rgb.r, rgb.g, rgb.b);
		}

		this._head = frame % pixels.length;
	}
};

module.exports = new Comet({
	r: 0,
	g: 0,
	b: 255
});
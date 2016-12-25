var colors = require('../colors');
var tinycolor = require('tinycolor2');

function Comet() {
	this._head = 0;
	this._tailLength = 50;
	this._step = 0.4;
}

Comet.prototype = {
	requestFrame: function (pixels, frame) {
		for (var i = 0; i < pixels.length; i++) {
			var distance = i - this._head;
			var brightens = 0;

			if (distance >= 0 && distance <= this._tailLength) {
				brightens = (1 - distance / this._tailLength) * 1;
			}

			var rgb = tinycolor.fromRatio({
				h: 100,
				s: 1,
				l: brightens
			});

			console.log(brightens);

			pixels[i] = colors.rgb2Int(rgb._r, rgb._g, rgb._b);
		}

		this._head = frame % pixels.length;

		// console.log(this._head);

		return pixels;
	}
};

module.exports = new Comet();
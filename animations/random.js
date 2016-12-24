var colors = require('../colors');

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
	requestFrame: function (pixels) {
		for (var i = 0; i < pixels.length; i++) {
			pixels[i] = colors.rgb2Int(getRandom(0, 255), getRandom(0, 255), getRandom(0, 255));
		}

		return pixels;
	}
};
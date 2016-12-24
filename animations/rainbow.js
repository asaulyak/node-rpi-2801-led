var colors = require('../colors');

// rainbow-colors, taken from http://goo.gl/Cs3H0v
function colorwheel(pos) {
	pos = 255 - pos;
	if (pos < 85) {
		return colors.rgb2Int(255 - pos * 3, 0, pos * 3);
	}
	else if (pos < 170) {
		pos -= 85;
		return colors.rgb2Int(0, pos * 3, 255 - pos * 3);
	}
	else {
		pos -= 170;
		return colors.rgb2Int(pos * 3, 255 - pos * 3, 0);
	}
}

module.exports = {
	requestFrame: function (pixels, frames) {
		var offset = frames % 256;

		for (var i = 0; i < pixels.length; i++) {
			pixels[i] = colorwheel((offset + i) % 256);
		}
		return pixels;
	}
};
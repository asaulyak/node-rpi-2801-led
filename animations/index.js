var rainbow = require('./rainbow');
var random = require('./random');

var animations = {
	rainbow: rainbow,
	random: random
};

module.exports = {
	get: function (animation) {
		return animations[animation];
	}
};
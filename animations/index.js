var rainbow = require('./rainbow');

var animations = {
	rainbow: rainbow
};

module.exports = {
	get: function (animation) {
		return animations[animation];
	}
};
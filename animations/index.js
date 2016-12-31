var rainbow = require('./rainbow');
var random = require('./random');
var comet = require('./comet');

var animations = {
	rainbow: rainbow,
	random: random,
	comet: comet
};

module.exports = {
	get: function (animation) {
		return animations[animation];
	},

	all: function () {
		return Object.keys(animations)
			.map(function (animation) {
				return animations[animation];
			});
	}
};
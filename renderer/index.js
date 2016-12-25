var ws281x = require('rpi-ws281x-native');

var interval;

module.exports = {
	run: function (pixelsCount, render) {
		var pixelData = new Uint32Array(pixelsCount);

		process.on('SIGINT', function () {
			ws281x.reset();
			process.nextTick(function () {
				process.exit(0);
			});
		});

		ws281x.init(pixelsCount);

		var offset = 0;
		interval = setInterval(function () {
			render(pixelData, offset++);

			ws281x.render(pixelData);

		}, 1000 / 60);
	},

	stop: function () {
		clearInterval(interval);
	}
};
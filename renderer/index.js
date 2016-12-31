var ws281x = require('rpi-ws281x-native');

var interval;

process.on('SIGINT', function () {
	ws281x.reset();
	process.nextTick(function () {
		process.exit(0);
	});
});

module.exports = {
	run: function (pixelsCount, render) {
		var pixelData = new Uint32Array(pixelsCount);

		ws281x.init(pixelsCount);

		var offset = 0;
		interval = setInterval(function () {
			render(pixelData, offset++);

			ws281x.render(pixelData);

		}, 1000 / 60);
	},

	stop: function () {
		ws281x.reset();
		clearInterval(interval);
	},

	runSequance: function (pixelsCount, renders, interval) {
		var currentRenderIndex = 0;

		setInterval(function () {
			this.stop();
			this.run(pixelsCount, renders[currentRenderIndex++ % renders.length]);
		}.bind(this), interval);
	}
};
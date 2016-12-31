var animations = require('./animations');
var renderer = require('./renderer');
var argv = require('yargs').argv;

var PIXELS_COUNT = parseInt(argv.n, 10) || 10;
var animationName = argv.a;

if(animationName) {
	var animation = animations.get(animationName);
	renderer.run(PIXELS_COUNT, animation.requestFrame.bind(animation));
}
else {
	var animationSequance = animations.all()
		.map(function (animation) {
		    return animation.requestFrame.bind(animation);
		});

	renderer.runSequance(PIXELS_COUNT, animationSequance, 60000);
}

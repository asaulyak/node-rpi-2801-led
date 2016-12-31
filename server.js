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
	var animationSequence = animations.all()
		.map(function (animation) {
		    return animation.requestFrame.bind(animation);
		});

	renderer.runSequence(PIXELS_COUNT, animationSequence, 60000);
}

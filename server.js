var animations = require('./animations');
var renderer = require('./renderer');

var PIXELS_COUNT = parseInt(process.argv[2], 10) || 10;

var animation = animations.get('comet');

renderer.run(PIXELS_COUNT, animation.requestFrame.bind(animation));

var animation = require('./animations/rainbow');
var renderer = require('./renderer');

var PIXELS_COUNT = parseInt(process.argv[2], 10) || 10;

var pixels = new Array(PIXELS_COUNT).fill(0);

renderer.run(PIXELS_COUNT, animation.requestFrame);

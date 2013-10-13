#include "../include/debug.jsxinc"
#include "../lib/graphics.js"
//#include "include/util.jsxinc"
//#include "include/models.jsxinc"
//#include "include/photoshopr.jsxinc"
log(G);
var c = new G.Color("333");
log (c.toJSON("hsla"));

//TODO: 
/*
    - Create test document,
    - Go through all actions and compare result with predefined values
    - Output status
*/

//log( extend({a:23, b:1,c:2,d:3}, {b:3}, {c:4,d:5}, {f:12}, {b:5}, undefined, {}) )

/* Tests supposed to perform */

// - Color overlay opacity
// - Color overlay blending mode
// - Color overlay commented
// - Color overlay as multiple bg component
// - Color overlay alone

// - Solid fill opacity
// - Solid fill blending mode
// - Solid fill commented,
// - Solid fill as a multiple bg component
// - Solid fill alone

// - Gradient fill opacity
// - Gradient fill alone commented
// - Gradient fill as a component
// - Gradient fill commented

// - Gradient fill opacity soft light + color overlay opacity + gradient overlay opacity

// - Box-shadows all
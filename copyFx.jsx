#script "Copy FX as CSS"
#target photoshop

#include "include/debug.jsxinc"
#include "include/util.jsxinc"
#include "include/models.jsxinc"
#include "include/photoshopr.jsxinc"
#include "include/getLayerCss.jsxinc"

var cssStr = photoshopr.getLayerCss();
$.writeln(cssStr)
//photoshopr.copy(cssStr);
//photoshopr.bindNotifiers();
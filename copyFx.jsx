#script "Copy FX as CSS"
#target photoshop

#include "include/util.jsxinc"
#include "include/debug.jsxinc"
#include "include/models.jsxinc"
#include "include/photoshopr.jsxinc"
#include "include/getLayerCss.jsxinc"

var cssStr = photoshopr.getLayerCss();
photoshopr.copy(cssStr);
photoshopr.bindNotifiers();
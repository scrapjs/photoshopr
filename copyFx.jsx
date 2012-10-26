#script "Copy FX as CSS"
#target photoshop

#include "include/debug.jsxinc"
#include "include/util.jsxinc"
#include "include/models.jsxinc"
#include "include/photoshopr.jsxinc"
#include "include/getLayerCss.jsxinc"


var cssStr = photoshopr.getLayerCss();
$.writeln("--------------result")
$.writeln(cssStr)
/*$.writeln( t2s(c2t("T   ")) )
$.writeln( t2s(c2t("Clr ")) )
$.writeln( t2s(c2t("RGBC")) )*/
//photoshopr.copy(cssStr);
//photoshopr.bindNotifiers();
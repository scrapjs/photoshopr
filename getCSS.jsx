#script "Copy FX as CSS"
#target photoshop

#include "include/debug.jsxinc"
#include "include/util.jsxinc"
#include "include/models.jsxinc"
#include "include/photoshopr.jsxinc"
#include "include/getLayerCss.jsxinc"


var cssStr = photoshopr.getLayerCss();
$.writeln("--------------result");
$.writeln(cssStr);

/*if (photoshopr.settings.showResultDialog) {//Show dialog with result
    var d = 8, ow = d*35.5, oh = d*30, pl = d, pt = d, pb = d, pr = d, lh = d*4, 
    h=d*3, bw = d*16.5;
    var dlg = new Window('dialog', 'Your CSS, sir!');
    dlg.frameLocation = [400, 160];
    dlg.size = [ow, oh];
    dlg.css = dlg.add('edittext', undefined, cssStr, {multiline:true});
    dlg.css.bounds = {x:pl, y:pt, height:oh - pt - pb - lh - d/2, width: ow - pl - pr}
    
    //btns
    dlg.ok = dlg.add('button', undefined, 'OK');
    dlg.ok.bounds = {x:ow - pr - bw, y:dlg.css.bounds.bottom+d/2, width:bw, height:lh};
    dlg.canc = dlg.add('button', undefined, 'Copy');
    dlg.canc.bounds = {x: pl, y: dlg.css.bounds.bottom+d/2, width:bw, height:lh};
    
    dlg.show();
    
} else {//To clipboard
    photoshopr.copy(cssStr); 
}

if (photoshopr.settings.bindToCopyFx) {
photoshopr.bindNotifiers();  
}*/
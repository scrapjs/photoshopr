#script "Photoshopr settings"
#target photoshop

#include "include/util.jsxinc"
#include "include/debug.jsxinc"
#include "./include/photoshopr.jsxinc"

var P = photoshopr; //alias

var d = 8, h = d*3, lh = d*3, w1 = d*29, pl = d, pt = d/2, pr = d, pb = d, 
ow = d*43, oh = d*36, w2 = d*15, w3 = d*7;

// Create empty dialog
var dlg = new Window('dialog', 'Photoshopr settings');
dlg.frameLocation = [400,160];
dlg.size = [ow, oh];

//Formatting panel
dlg.fp = dlg.add('panel', undefined, 'Resulting CSS');
dlg.fp.bounds = {x:pl, width:w1, y:pt, height:lh*4+pt*2+pb+d};
//show prefixes
var top = 0;
dlg.fp.sp = dlg.fp.add('checkbox', undefined, 'Show browser prefixes');
dlg.fp.sp.bounds = {x:pl, y : top+=d, width:w1, height:h};
dlg.fp.sp.value = P.settings.showPrefixes;
dlg.fp.sp.helpTip = "Make browser prefixes or not.\nSupported prefixes: \n-webkit-, -moz-, -ms-, -o-";
//wrap lines
dlg.fp.wl = dlg.fp.add('checkbox', undefined, 'Wrap lines');
dlg.fp.wl.bounds = {x:pl, y : top+=lh, width:w1, height:h};
dlg.fp.wl.value = P.settings.wrapLines;
dlg.fp.wl.helpTip = "Wrap lines of CSS or display inline";
//comments
dlg.fp.sc = dlg.fp.add('checkbox', undefined, 'Show comments');
dlg.fp.sc.bounds = {x:pl, y : top+=lh, width:w1, height:h};
dlg.fp.sc.value = P.settings.comments;
dlg.fp.sc.helpTip = "Show commentaries in CSS, e. g. \n/*Color Overlay*/, /*Drop Shadow*/, etc.";//comments
//Unsupported CSS3
dlg.fp.mu = dlg.fp.add('checkbox', undefined, 'Make unsupported CSS3');
dlg.fp.mu.bounds = {x:pl, y : top+=lh, width:w1, height:h};
dlg.fp.mu.value = P.settings.makeUnsupportedCSS3;
dlg.fp.mu.helpTip = "Produce not supported yet CSS3 properties, like text-align-last, text-justify and so on.";

//Rendering properties
//dlg.rp = dlg.add('panel', undefined, 'Rendering');
//dlg.rp.bounds = {x:pl, width:w1, y:dlg.fp.bounds.bottom + d, height:lh*3+pt+pb+d};

//mergebg
/*dlg.rp.mb = dlg.rp.add('checkbox', undefined, 'Merge background');
dlg.rp.mb.bounds = {x:pl, y : top+=pt, width:w1, height:h};
dlg.rp.mb.value = P.settings.mergeBackground;
dlg.rp.mb.helpTip = "Merge layer fill properties to one background \naccording to blending modes or do multiple backgrounds";
*/
//do character
/*
dlg.rp.cp = dlg.rp.add('checkbox', undefined, 'Characted properties');
dlg.rp.cp.bounds = {x:pl, y : top+=lh, width:w1, height:h};
dlg.rp.cp.value = P.settings.characterProperties;
dlg.rp.cp.helpTip = "Make character properties of text-layer: \nfont-family, font-size, font-weight, font-style, \nletter-spacing, line-height, text-transform, \ntext-decoration";
//do paragraph
dlg.rp.pp = dlg.rp.add('checkbox', undefined, 'Paragraph properties');
dlg.rp.pp.bounds = {x:pl, y : top+=lh, width:w1, height:h};
dlg.rp.pp.value = P.settings.paragraphProperties;
dlg.rp.pp.helpTip = "Make paragraph properties of text-layer: \npadding, margin, text-indent, text-align";
*/
//do text
/*
dlg.rp.ct = dlg.rp.add('checkbox', undefined, 'Copy text');
dlg.rp.ct.bounds = {x:pl, y : top+=lh, width:w1, height:h};
dlg.rp.ct.value = P.settings.paragraphProperties;
dlg.rp.ct.helpTip = "Make character properties of text-layer";
*/

//colorFormat
dlg.cf = dlg.add('panel', undefined, 'Color format');
dlg.cf.bounds = {x:pl, width:w1, y:dlg.fp.bounds.bottom + pt, height:lh+pt*2+pb+d};
top = 0;
/*dlg.cf.title = dlg.cf.add("statictext", undefined, "Color format");
dlg.cf.title.bounds = {left:pl, top:d, right:d*25, bottom:lh}*/
dlg.cf.rgb = dlg.cf.add('radiobutton', undefined, "rgb[a]");
dlg.cf.rgb.bounds = {x:pl, y:top+=d, height:h, width : w3};
dlg.cf.rgb.helpTip = "Represent color as rgba. \nIf opacity = 100 then format would be rgb(..), \nelse - rgba(..)";
dlg.cf.hsl = dlg.cf.add('radiobutton', undefined, "hsl[a]");
dlg.cf.hsl.bounds = {x:dlg.cf.rgb.bounds.right + pl, y:top, height:h, width : w3};
dlg.cf.hsl.helpTip = "Represent color as hsla. \nIf opacity = 100 then format would be hsl(..), \nelse - hsla(..)";
dlg.cf.hex = dlg.cf.add('radiobutton', undefined, "hex");
dlg.cf.hex.bounds = {x:dlg.cf.hsl.bounds.right + pl, y:top, height:h, width : w3};
dlg.cf.hex.helpTip = "Represent color as hex, for ex.: #a1b2c3.\nLayer opacity represented as opacity CSS property.";
switch (P.settings.colorFormat) {
    case "hsl":
        dlg.cf.hsl.value = true;
        break;
    case "hex":
        dlg.cf.hex.value = true;
        break;
    default:
        dlg.cf.rgb.value = true;     
}

//Interface
dlg.intf = dlg.add('panel', undefined, 'Way of performing');
dlg.intf.bounds = {x:pl, width:w1, y:dlg.cf.bounds.bottom + pt, height:lh*3+d+pb+d};
top = 0;
//bind to copy fx
dlg.intf.sd = dlg.intf.add('radiobutton', undefined, "Show dialog with result");
dlg.intf.sd.bounds = {x:pl, y:top+=d, height:h, width : w1};
dlg.intf.sd.helpTip = "Show dialog with resulting CSS when clicked on \"Get CSS\"";
dlg.intf.cc = dlg.intf.add('radiobutton', undefined, "Copy result to the clipboard");
dlg.intf.cc.bounds = {x:pl, y:top+=lh, height:h, width :w1};
dlg.intf.cc.helpTip = "Copy resulting CSS to the clipboard when clicked on \"Get CSS\"";
if (P.settings.showResultDialog) {
    dlg.intf.sd.value = true;
} else {
    dlg.intf.cc.value = true;
}
dlg.intf.b = dlg.intf.add('checkbox', undefined, 'Bind to "Copy Layer Style"');
dlg.intf.b.bounds = {x:pl, y : top+=lh, width:w1, height:h};
dlg.intf.b.value = P.settings.bindToCopyFx;
dlg.intf.b.helpTip = "Perform \"Get CSS\" always when clicked on \"Copy layer style\".";//comments

//btns
dlg.ok = dlg.add('button', undefined, 'OK');
dlg.ok.bounds = {x:ow-pr-d*11, y:d, width:d*11, height:h};
dlg.canc = dlg.add('button', undefined, 'Cancel');
dlg.canc.bounds = {x:ow-pr-d*11, y:pt+h+d, width:d*11, height:h};

//Save handler
dlg.ok.onClick = function(e){
    var cf, st;
    
    if (dlg.cf.hex.value) cf = "hex";
    else if (dlg.cf.hsl.value) cf = "hsl";
    else cf = "rgb";
    
    P.settings = extend(P.settings,{
        showPrefixes : dlg.fp.sp.value,
        colorFormat : cf,
        wrapLines: dlg.fp.wl.value,
        comments: dlg.fp.sc.value,
        makeUnsupportedCSS3: dlg.fp.mu.value,
        bindToCopyFx: dlg.intf.b.value, 
        showResultDialog: dlg.intf.sd.value
    });
    P.saveSettings();
    dlg.close();
}

//Do dlg
dlg.show();
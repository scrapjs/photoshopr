#script "Photoshopr settings"
#target photoshop

#include "include/util.jsxinc"
#include "include/debug.jsxinc"
#include "./include/photoshopr.jsxinc"

var a = {b:1, c:2};

var P = photoshopr; //alias

var d = 8, h = d*3, lh = d*3, w1 = d*29, pl = d, pt = d+d/2, pr = d, pb = d, 
ow = d*43, oh = d*42, w2 = d*15;

// Create empty dialog
var dlg = new Window('dialog', 'Photoshopr settings');
dlg.frameLocation = [400,160];
dlg.size = [ow, oh];

//Formatting panel
var top = 0;
dlg.fp = dlg.add('panel', undefined, 'Formatting');
dlg.fp.bounds = {x:pl, width:w1, y:d, height:lh*3+pt+pb+d};
//show prefixes
dlg.fp.sp = dlg.fp.add('checkbox', undefined, 'Show prefixes');
dlg.fp.sp.bounds = {x:pl, y : top+=pt, width:w1, height:h};
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
dlg.fp.sc.helpTip = "Show commented sources in CSS, e. g. \n/*Color Overlay*/, /*Drop Shadow*/, etc.";

//Rendering properties
dlg.rp = dlg.add('panel', undefined, 'Rendering');
dlg.rp.bounds = {x:pl, width:w1, y:dlg.fp.bounds.bottom + d, height:lh*3+pt+pb+d};
top = 0;
//mergebg
dlg.rp.mb = dlg.rp.add('checkbox', undefined, 'Merge background');
dlg.rp.mb.bounds = {x:pl, y : top+=pt, width:w1, height:h};
dlg.rp.mb.value = P.settings.mergeBackground;
dlg.rp.mb.helpTip = "Merge layer fill properties to one background \naccording to blending modes or do multiple backgrounds";
//do character
dlg.rp.cp = dlg.rp.add('checkbox', undefined, 'Characted properties');
dlg.rp.cp.bounds = {x:pl, y : top+=lh, width:w1, height:h};
dlg.rp.cp.value = P.settings.characterProperties;
dlg.rp.cp.helpTip = "Make character properties of text-layer: \nfont-family, font-size, font-weight, font-style, \nletter-spacing, line-height, text-transform, \ntext-decoration";
//do paragraph
dlg.rp.pp = dlg.rp.add('checkbox', undefined, 'Paragraph properties');
dlg.rp.pp.bounds = {x:pl, y : top+=lh, width:w1, height:h};
dlg.rp.pp.value = P.settings.paragraphProperties;
dlg.rp.pp.helpTip = "Make paragraph properties of text-layer: \npadding, margin, text-indent, text-align";
//do text
/*dlg.rp.ct = dlg.rp.add('checkbox', undefined, 'Copy text');
dlg.rp.ct.bounds = {x:pl, y : top+=lh, width:w1, height:h};
dlg.rp.ct.value = P.settings.paragraphProperties;
dlg.rp.ct.helpTip = "Make character properties of text-layer";*/

//colorFormat
dlg.cf = dlg.add('panel', undefined, 'Color format');
dlg.cf.bounds = {x:pl, width:d*12, y:dlg.rp.bounds.bottom + d, height:lh*3+pt+pb+d};
top += lh*2 + pt + pb;
dlg.cf.rgb = dlg.cf.add('radiobutton', undefined, "rgb[a]");
dlg.cf.rgb.bounds = {x:pl, y:pt, height:h, width : w1};
dlg.cf.rgb.helpTip = "Represent color as rgba. \nIf opacity = 100 then format would be rgb(..), \nelse - rgba(..)";
dlg.cf.hsl = dlg.cf.add('radiobutton', undefined, "hsl[a]");
dlg.cf.hsl.bounds = {x:pl, y:pt+lh, height:h, width : w1};
dlg.cf.hsl.helpTip = "Represent color as hsla. \nIf opacity = 100 then format would be hsl(..), \nelse - hsla(..)";
dlg.cf.hex = dlg.cf.add('radiobutton', undefined, "hex");
dlg.cf.hex.bounds = {x:pl, y:pt+lh+lh, height:h, width : w1};
dlg.cf.hex.helpTip = "Represent color as hex, for ex.: #a1b2c3";
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

//strokeType
dlg.st = dlg.add('panel', undefined, 'Outline method');
dlg.st.bounds = {x:dlg.cf.bounds.right+pl, width:d*16, y:dlg.rp.bounds.bottom + d, height:lh*3+pt+pb+d};
dlg.st.bs = dlg.st.add('radiobutton', undefined, "box-shadow");
dlg.st.bs.bounds = {x:pl, y:pt, height:h, width : w1};
dlg.st.bs.helpTip = "Represent layer stroke as box-shadow";
dlg.st.b = dlg.st.add('radiobutton', undefined, "border");
dlg.st.b.bounds = {x:pl, y:pt+lh, height:h, width : w1};
dlg.st.b.helpTip = "Represent layer stroke as border";
dlg.st.ou = dlg.st.add('radiobutton', undefined, "outline");
dlg.st.ou.bounds = {x:pl, y:pt+lh*2, height:h, width : w1};
dlg.st.ou.helpTip = "Represent layer stroke as outline";
switch (P.settings.strokeType) {
    case "box-shadow":
        dlg.st.bs.value = true;
        break;
    case "border":
        dlg.st.b.value = true;
        break;
    default:
        dlg.st.ou.value = true;     
}
//btns
dlg.ok = dlg.add('button', undefined, 'OK');
dlg.ok.bounds = {x:ow-pr-d*11, y:pt, width:d*11, height:h};
dlg.canc = dlg.add('button', undefined, 'Cancel');
dlg.canc.bounds = {x:ow-pr-d*11, y:pt+h+d/2, width:d*11, height:h};

//Save handler
dlg.ok.onClick = function(e){
    var cf, st;
    if (dlg.st.b.value) st = "border";
    else if (dlg.st.ou.value) st = "outline";
    else st = "box-shadow";
    
    if (dlg.cf.hex.value) cf = "hex";
    else if (dlg.cf.hsl.value) cf = "hsl";
    else cf = "rgb";
    
    P.settings = extend(P.settings,{
        showPrefixes : dlg.fp.sp.value,
        colorFormat : cf,
        wrapLines: dlg.fp.wl.value,
        comments: dlg.fp.sc.value,
        strokeType: st,
        characterProperties: dlg.rp.cp.value,
        paragraphProperties: dlg.rp.pp.value,
        mergeBackground: dlg.rp.mb.value
    });
    P.saveSettings();
    dlg.close();
}

//Do dlg
dlg.show();
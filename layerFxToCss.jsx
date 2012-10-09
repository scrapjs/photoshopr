//TODO: bind to click on copy-layer-style
//TODO: make site description & donate
//TODO: define text layers & text-shadow
//TODO: make text properties

//TODO: take into account overlay modes of color, gradient overlay
//TODO: take into account opacity & fill, not only opacity

//TODO: PRIORITY: do interface;

//TODO: make 2 & more layers combining effects


//Settings of script
var settings = {
    showPrefixes : false,
    colorFormat : 'rgb', //rgb, hsl, hex
    wrapLines: false    ,
    comments: false,
    strokeType: 'box-shadow', //'box-shadow', 'border', 'outline'
    makeTextProperties: true   
}
var prefixes = ['-webkit-','-moz-','-ms-','-o-'];
var css = {
    'drop-shadow':'',
    'inner-shadow':'',
    'outer-glow':'',
    'inner-glow':'',
    'box-shadow-stroke':'',
    'border-stroke':'',
    'gradient-overlay':'',
    'color-overlay':'',
    'fill-style':''
}, //resulting object of converted to CSS photoshop layer fx's
delim = (settings.wrapLines ? "\n" : " " );
var s2t =stringIDToTypeID, t2s = typeIDToStringID, t2c = typeIDToCharID, c2t = charIDToTypeID;

//Get fx of active layer
function getActiveLayerProperty( psKey, psType ) {
      var ref;
      ref = new ActionReference();
      ref.putProperty( charIDToTypeID( 'Prpr' ), psKey );
      ref.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
      if( undefined == psType ){
          return executeActionGet( ref ).getObjectValue( psKey );
    }else{
        return executeActionGet( ref );
    }
};


//Necessary vars
layerEffects = getActiveLayerProperty( charIDToTypeID( 'Lefx' ) );
fx = layerEffects;


//Debug functions - logs to console all properties & their types of @param actionDescriptor
var showObject = function(actionDescriptor){
    for (var i = actionDescriptor.count; i--;){    
            var keyId = actionDescriptor.getKey(i), key = t2s(keyId);
            $.writeln(key + '  :  ' + actionDescriptor.getType(keyId));
        }
}
var showList = function(list){
    if (list instanceof Array){
        for (var i = list.length; i--;){
            val = list[i];
            $.writeln(val+"\n")
        }
    } else {
        var type = list.typename;
        $.writeln('List of values of type: '+list.getType(0))
        for (var i = list.count; i--;){
            val = list.getObjectValue(i)
            $.writeln(val+"\n")
        }
    }
}


//key is a typeID of fx property. Returns fx ActionDescriptor
var getEffect = function(key){
        var prop;//fx property ActionDescriptor object
        
        switch(fx.getType(key)){
            case DescValueType.OBJECTTYPE: //Show action descriptors
                prop = fx.getObjectValue(key);
                break;
        };        
        return prop;        
}


//Start calculating fx. Fills css object.
var generateCss = function(){
    var cssStr = "";
    for (var i = fx.count; i--;){
            var key = fx.getKey(i);
            
            var fxprop = getEffect(key);
            if (!fxprop) continue; //if not fx
            //$.writeln(t2s(key))
            proccess[t2s(key)] ? proccess[t2s(key)](fxprop) : "";        
    }
    return "";
}


//Object with processing funcs of different layer properties
var proccess = {
    "dropShadow" : function(fxProp){
        var styleValue = "", //resulting style
        enabled = fxProp.getBoolean(s2t("enabled")), 
        mode, //TODO: take into account
        color = fxProp.getObjectValue(s2t("color")), 
        opacity = fxProp.getUnitDoubleValue(s2t("opacity")), 
        useGlobalAngle = fxProp.getBoolean(s2t("useGlobalAngle")), 
        angle = fxProp.getUnitDoubleValue(s2t("localLightingAngle")),
        distance = fxProp.getUnitDoubleValue(s2t("distance")), 
        spread = fxProp.getUnitDoubleValue(s2t("chokeMatte")), 
        blur = fxProp.getUnitDoubleValue(s2t("blur"));        
        //TODO: make analysis of gradient fill layer, pattern fill layer & solid color fill layer instead returning
        if (!enabled) return;        
        //get global light angle
        if (useGlobalAngle) {
            var ref = new ActionReference();
            ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
            angle = executeActionGet(ref).getInteger(stringIDToTypeID('globalAngle'));
        }        
        //showProperties(fxProp);        
        styleValue += getX(angle, distance)+"px " + getY(angle, distance) + "px " + getBlurStroke (blur, spread) + getColor(color, opacity);        
        css['drop-shadow'] = styleValue;//do css object        
        return styleValue;
    },

    "outerGlow" : function(fxProp){//TODO: take into account all glowing options
        var styleValue = "", //resulting style
        enabled = fxProp.getBoolean(s2t("enabled")), 
        mode, //TODO: take into account
        color = fxProp.getObjectValue(s2t("color")), 
        opacity = fxProp.getUnitDoubleValue(s2t("opacity")), 
        spread = fxProp.getUnitDoubleValue(s2t("chokeMatte")), 
        blur = fxProp.getUnitDoubleValue(s2t("blur"));
        if (!enabled) return;        
        //showProperties(fxProp);        
        styleValue += "0 0 " + getBlurStroke (blur, spread) + getColor(color, opacity);        
        css['outer-glow'] = styleValue;//do css object        
        return styleValue;
    },

    "innerShadow" : function(fxProp){
        var styleValue = "", 
        enabled = fxProp.getBoolean(s2t("enabled")), 
        mode, //TODO: take into account
        color = fxProp.getObjectValue(s2t("color")), 
        opacity = fxProp.getUnitDoubleValue(s2t("opacity")), 
        spread = fxProp.getUnitDoubleValue(s2t("chokeMatte")), 
        blur = fxProp.getUnitDoubleValue(s2t("blur")),
        useGlobalAngle = fxProp.getBoolean(s2t("useGlobalAngle")), 
        angle = fxProp.getUnitDoubleValue(s2t("localLightingAngle")),
        distance = fxProp.getUnitDoubleValue(s2t("distance"));        
        if (!enabled) return;    
        //get global light angle
        if (useGlobalAngle) {
            var ref = new ActionReference();
            ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
            angle = executeActionGet(ref).getInteger(stringIDToTypeID('globalAngle'));
        }
        styleValue += "inset " + getX(angle, distance)+"px " + (getY(angle, distance)) + "px " + getBlurStroke (blur, spread) + getColor(color, opacity);
        css['inner-shadow'] = styleValue;//do css object        
        return styleValue;
    },

    "innerGlow" : function(fxProp){//TODO: take into account all glowing options
        var styleValue = "", //resulting style
        enabled = fxProp.getBoolean(s2t("enabled")), 
        mode, //TODO: take into account
        color = fxProp.getObjectValue(s2t("color")), 
        opacity = fxProp.getUnitDoubleValue(s2t("opacity")), 
        spread = fxProp.getUnitDoubleValue(s2t("chokeMatte")), 
        blur = fxProp.getUnitDoubleValue(s2t("blur"));
        if (!enabled) return;        
        //showProperties(fxProp);        
        styleValue += "inset 0 0 " + getBlurStroke (blur, spread) + getColor(color, opacity);        
        css['inner-glow'] = styleValue;//do css object        
        return styleValue;
    },
    
    //Stroke
    "frameFX": function(fxProp){
        //TODO: make border colouring by gradient
        try {
        var styleValue = "", //resulting style
        enabled = fxProp.getBoolean(s2t("enabled")), 
        mode, //TODO: take into account
        color = fxProp.getObjectValue(s2t("color")), 
        opacity = fxProp.getUnitDoubleValue(s2t("opacity")), 
        size = fxProp.getUnitDoubleValue(s2t("size")),
        position = fxProp.getEnumerationValue(s2t("style"));
        if (!enabled) return;        
        //showProperties(fxProp);        
        switch (settings.strokeType){
            case "box-shadow":
                switch (t2s(position)){
                    case "outsetFrame":
                        styleValue += "0 0 0 " + size + "px " + getColor(color, opacity);
                        break;
                    case "insetFrame":
                        styleValue += "inset 0 0 0 " + size + "px " + getColor(color, opacity);
                        break;
                    case "centeredFrame":
                        styleValue += "inset 0 0 0 " + (size*.5) + "px " + getColor(color, opacity) + 
                        ", 0 0 0 " + (size*.5) + "px " + getColor(color, opacity);
                        break;
                }
                css['box-shadow-stroke'] = styleValue;//do css object        
                break;
            default:
                styleValue += size + "px solid " + getColor(color, opacity);
                css['border-stroke'] = styleValue;//do css object        
        }        
        return styleValue;
        } catch (err) {$.writeln(err)}
    },


//Color overlay


//Gradient overlay of layer
    "gradientFill": function(fxProp){
        var styleValue = "",
        gradient = fxProp.getObjectValue(s2t('gradient')),
        enabled = fxProp.getBoolean(s2t('enabled')),
        opacity = fxProp.getUnitDoubleValue(s2t('opacity')),
        reverse = fxProp.getBoolean(s2t('reverse')),
        angle = fxProp.getUnitDoubleValue(s2t('angle')),
        type = t2s(fxProp.getEnumerationValue(s2t("type"))),
        align = fxProp.getBoolean(s2t('align')),
        scale = fxProp.getUnitDoubleValue(s2t('scale')),
        offset = fxProp.getObjectValue(s2t('offset'));
        if(!enabled) return;    
        
        //showObject (gradient)
        gradientForm = gradient.getEnumerationValue(s2t('gradientForm'));
        if (t2s(gradientForm) == "colorNoise") return; //dont fuck with colorNoise gradients
        
        transparency = gradient.getList(s2t('transparency')),
        colors = gradient.getList(s2t('colors')),
        iicon = gradient.getDouble(s2t('interfaceIconFrameDimmed')); //TODO: whattafuck is this? Do get know    
        
        //defining exact size of gradient and render
        var position = "";//TODO: take into account        
        switch(type){
            case "linear":
                //do reverse
                angle = reverse ? angle : ((angle + 180)%360);
                styleValue += getLinearGradient(transparency, colors, angle, opacity);
                break;
            case "radial":
                styleValue += getRadialGradient(transparency, colors, angle, opacity);
                break;
            case "angle":
                //Get out
                break;
            case "reflected":
                //do 2 linears
                //styleValue += 
                break;
            case "diamond":
                //Omg gtfo
                break;
        }    
        css['gradient-overlay'] = styleValue;
        return styleValue;
    }


//Fill layer

}


//Return correct color value (string) based on settings. Color is a color ActionDescriptor object, opacity is a value
var getColor = function(color, opacity){
    var colorVal = "";
    opacity = opacity === 0 ? 0 : (opacity || 100),    
    colorObj = createColor(color);
    opacity = Math.round(opacity);
    
    switch (settings.colorFormat){
            case 'rgb':
                var r = colorObj.rgb.red.toFixed(0),
                g = colorObj.rgb.green.toFixed(0),
                b = colorObj.rgb.blue.toFixed(0);
                colorVal = (opacity >= 100) ? ('rgb('+r+', '+g+', '+b+')') : ('rgba('+r+', '+g+', '+b+', '+(opacity*.01).toFixed(2).slice(1)+')');
                break;
            case 'hsl':
                var h = colorObj.hsb.hue, 
                l = (2-colorObj.hsb.saturation*0.01) * colorObj.hsb.brightness*0.01, 
                s = colorObj.hsb.saturation*0.01 * colorObj.hsb.brightness*0.01;
                s = (l <= 1) ? l : (2 - l);
                l /= 2;
                s = s.toFixed(3)*100+'%';
                l = l.toFixed(3)*100+'%';
                colorVal = (opacity == 100) ? ('hsl('+h+', '+s+', '+l+')') : ('hsla('+h+', '+s+', '+l+', '+(opacity*.01).toFixed(2).slice(1)+')');
                break;
            case 'hex':
                colorVal = '#'+colorObj.rgb.hexValue.toLowerCase();
                break;
        }
    return colorVal;
}

//PRIVATE. Returns new colorObject created from colorActionDescriptor object.
var createColor = function(colorDesc){
    if (colorDesc instanceof SolidColor) return colorDesc;
    var c = new SolidColor();
    c.rgb.red = Math.round(colorDesc.getDouble(s2t("red"))),
    c.rgb.green = Math.round(colorDesc.getDouble(s2t("grain"))),
    c.rgb.blue = Math.round(colorDesc.getDouble(s2t("blue")));
    return c;
}


//Returns middle color based on two passed raw actionDescriptors colorA & colorB. Midpoint 0..1
var getMidColor = function(colorA, colorB, midpoint){
    colorA = createColor(colorA);
    colorB = createColor(colorB);
    var colorObj = new SolidColor(),
    midpoint = midpoint || .5;
    midpoint = Math.max(Math.min(midpoint, 1), 0);
    colorObj.rgb.red = getMid( colorA.rgb.red, colorB.rgb.red, midpoint );
    colorObj.rgb.green = getMid( colorA.rgb.green, colorB.rgb.green, midpoint );
    colorObj.rgb.blue = getMid( colorA.rgb.blue, colorB.rgb.blue, midpoint );
    return colorObj;
}
var getMid = function(a,b,leverage){
    return a*leverage + b*(1-leverage);
}


//Return linear gradient stringified
var getLinearGradient = function(transpList, colorList,angle, globalOpacity){
    globalOpacity = globalOpacity || 100; //it's overlay opacity
    var result = "linear-gradient(";
    //do color
    switch (angle){
        case 90:
            result += "top, ";
            break;
        case -90:
        case 270:
        result += "bottom, ";
        break;
        case 0:
        result += "right, ";
        break;
        case 180:
        case -180:
        result += "left, ";
        break;
        default:
        result += angle + "deg, ";
    }
    var colors = [], trans = [];
    //grab all transparents
    for (var i = transpList.count; i--;){ 
        var transpObj = transpList.getObjectValue(i),
        midpoint = transpObj.getInteger(s2t('midpoint')),//0..100, first midpoint  is always 50 
        location = transpObj.getInteger(s2t('location')),//0..4096
        opacity = transpObj.getUnitDoubleValue(s2t('opacity'));//0..100
        trans.push({location:location, opacity:opacity});
        if (midpoint!=50){//add displacement of midpoint step, if midpoint not 50
            var prev = transpList.getObjectValue(i-1)||transpObj,
            prevLocation = prev.getInteger(s2t('location')),
            prevOpacity = prev.getUnitDoubleValue(s2t('opacity'));
            trans.push({
                location: prevLocation + (location-prevLocation)*midpoint*.01, 
                opacity:prevOpacity + (opacity-prevOpacity)*.5
            })
        }
    } 
    trans.sort(function(a,b){return a.location - b.location});
    //grab all colors
    for (var i = 0; i < colorList.count ;i++){ 
        var colorStep = colorList.getObjectValue(i)
        midpoint = colorStep.getInteger(s2t('midpoint')),//0..100, first midpoint  is always 50 
        location = colorStep.getInteger(s2t('location')),//0..4096
        type = t2s(colorStep.getEnumerationValue(s2t('type'))),//
        color = colorStep.getObjectValue(s2t('color'));
        colors.push({location:location, type:'raw', color:color});
        if (midpoint!=50){//add displacement of midpoint step, if midpoint not 50
                var prev = colorList.getObjectValue(i-1),//||colorStep,
                prevLocation = prev.getInteger(s2t('location')),
                prevColor = prev.getObjectValue(s2t('color'));
                colors.push({
                    location: prevLocation + (location-prevLocation)*midpoint*0.01, 
                    type:'object',
                    color:getMidColor(color, prevColor)
                })
            }
    }
    colors.sort(function(a,b){return a.location - b.location});
    
    //Generate css gradient string
    var lRange = 4096;//location range   
    var color, transp, prevColor, prevTransp;
    var stoppr = 120;
    for (var ic = 0, it = 0; ic<colors.length || it < trans.length && stoppr--; ){
        //$.writeln(stoppr+' : '+(colors[ic] && colors[ic].location)+' : '+(trans[it]&&trans[it].location));        
        color = colors[ic] || {location:lRange, color:color.color}; //end limiter color
        prevColor = colors[ic-1] || {location:0, color:color.color}; //start limiter color
        transp = trans[it] || {location:lRange, opacity:transp.opacity}; //end limiter transp
        prevTransp = trans[it-1] || {location:0, opacity: transp.opacity}; //start limiter transp
        
        if (Math.abs(color.location - transp.location) < 42) {//colorstep==transparentstep
            var pos = Math.round(color.location/lRange*100);
            result += getColor( color.color, trans.opacity*(globalOpacity*.01) ) + " " + (pos == 0 ? "0, " : (pos + "%, "));
            //$.writeln('eq')
            it++; ic++;
        } else if (color.location < transp.location){//colorstep
            result += getColor( color.color, getMid(transp.opacity, prevTransp.opacity, (color.location - prevTransp.location)/(transp.location - prevTransp.location))  ) + " ";
            result += (color.location/lRange*100).toFixed(0)+'%, ';
            //$.writeln('c < t: res')
            ic++;
        } else if (color.location > transp.location ) {//transpstep
            result += getColor( getMidColor(color.color, prevColor.color, (transp.location - prevColor.location)/(color.location - prevColor.location)), transp.opacity ) + " ";
            result += (transp.location/lRange*100).toFixed(0)+'%, ';
            //$.writeln('c > t')
            it++;
        } else {$.writeln("Dude, something is gone wrong in gradient generation: infinite cycling.");ic++; it++}
    }
    result = result.substr (0, result.length-2) + ')';    
    //$.writeln("background: "+result);
    return result;    
}


//2nd gradient
var getRadialGradient = function(transpList, colorList, angle){
    var result = "radial-gradient( temporary unavailable )"
    return result;
}

//Returns css blur & stroke representation in pixels of photoshop blur & stroke 
var getBlurStroke = function(blur, spread){
    var stroke = spread*0.01*blur;
    var cssBlur = blur - stroke;
    cssBlur = cssBlur ? (cssBlur.toFixed(0) + "px ") : "0 ";
    stroke = (stroke) ? (stroke.toFixed(0) + "px ") : "";
    return cssBlur + stroke;
}

//Returns css x in pixels 
var getX = function(angle, distance){
    return Math.round(distance * -Math.cos(angle/180*Math.PI));
}


//Returns y css  in pixels
var getY = function(angle, distance){
    return Math.round(distance * Math.sin(angle/180*Math.PI));
}


//Returns string from css object
var renderCss = function(){
    var cssStr = "";    
    c = settings.comments;
    
    //Box-shadow
    var boxShadow = "";
    if (css['box-shadow-stroke']) boxShadow += css['box-shadow-stroke'] + (c?' /*stroke*/':'') + ',' + delim;
    if (css['inner-shadow']) boxShadow += css['inner-shadow'] + (c?' /*inner-shadow*/':'') + ',' + delim;
    if (css['inner-glow']) boxShadow += css['inner-glow'] + (c?' /*inner-glow*/':'') + ',' + delim;
    if (css['outer-glow'])boxShadow += css['outer-glow'] + (c?' /*outer-glow*/':'') + ',' + delim;
    if (css['drop-shadow'])boxShadow += css['drop-shadow'] + (c?' /*drop-shadow*/':'') + ',' + delim;
    if (boxShadow) boxShadow = boxShadow.substr (0, boxShadow.length-2) + ';\n';
    if (settings.showPrefixes){
         for (var i = prefixes.length; i--;){
            cssStr += prefixes[i] + 'box-shadow:' + delim + boxShadow;
         }
     } 
    if (boxShadow) cssStr += 'box-shadow:' + delim + boxShadow;
    
    //Border Stroke
    if (css['border-stroke']) cssStr += 'border:' + delim+css['border-stroke'] + (c?' /*stroke*/':'') + ';\n'
        
    //Background
    var gradientOverlay = "";
    if(css['gradient-overlay']) gradientOverlay += css['gradient-overlay'] + (c?' /*gradient overlay*/':'') + ',' + delim;    
    if (settings.showPrefixes){
         for (var i = prefixes.length; i--;){
            var background = 'background:'+ delim + prefixes[i] + gradientOverlay;
            background = background.substr (0, background.length-2) + ';\n';
            cssStr += background;
         }
     } 
    var background = 'background:'+ delim + gradientOverlay;
            background = background.substr (0, background.length-2) + ';\n';
            cssStr += background;
    
    //TODO: bevel & emboss
    
    
    
    
    return cssStr;
}

//Start is here
generateCss(); //get css object filled

var result = renderCss();
//$.writeln(result); //render css object to string
//$.writeln("\n=============================");
copyToClipboard(result);

/*===============================================================UI=======================================================*/
function copyToClipboard(text){
    //alert("Placed to clipboard:"+text)
    /* Clippy.exe method. A big cons - launches the console.*/
    var folderForTempFiles = Folder.temp.fsName;
    // create a new textfile and put the text into it
    var clipTxtFile =new File(folderForTempFiles + "/ClipBoard.txt"); 
    clipTxtFile.open('w'); 
    clipTxtFile.write(text); 
    clipTxtFile.close();

    // use the clip.exe to copy the contents of the textfile to the windows clipboard
    var clipBatFile =new File(folderForTempFiles + "/ClipBoard.bat"); 
    clipBatFile.open('w'); 
    clipBatFile.writeln("cat \"" + folderForTempFiles + "/ClipBoard.txt\"|clip"); 
    clipBatFile.close(); 
    clipBatFile.execute();

    /*TODO: Text layer mathod. Is a way better.*/
    //var textLayer = new ArtLayer();

    //var newLayer = activeDocument.artLayers.add(); // Create a new ArtLayer object
    //newLayer.name = "My Layer"; // name it for later reference
    //var layerRef = activeDocument.artLayers.getByName("My Layer");
    //$.writeln(doc.selection)

    //activeDocument.activeLayer.copy();

    //doc.selection.selectAll();
    //docRef.selection.copy(true)
    app.notifiersEnabled = true
    app.notifiers.removeAll();
    var eventFile = new File(app.path +"/Presets/Scripts/layerFxToCss.jsx");
    app.notifiers.add("CpFX", eventFile);

};
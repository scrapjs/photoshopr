//TODO: bind to click on layer
//TODO: make site description & donate

//$.writeln("\n=============================");
//Settings of script
var settings = {
    showPrefixes : false,
    colorFormat : 'rgb', //rgb, hsl, hex
    wrapLines: false    ,
    comments: false,
    showStrokeAs: 'box-shadow' //'border', 'outline'
}
var prefixes = ['-webkit-','-moz-','-ms-','-o-'];
var css = {
    'drop-shadow':'',
    'inner-shadow':'',
    'outer-glow':'',
    'inner-glow':''
}; //resulting object of converted to CSS photoshop layer fx's
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


//Debug function - logs to console all properties & their types of @param actionDescriptor
var showProperties = function(actionDescriptor){
    for (var i = actionDescriptor.count; i--;){    
            var keyId = actionDescriptor.getKey(i), key = t2s(keyId);
            $.writeln(key + '  :  ' + actionDescriptor.getType(keyId));
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
    }
}


//Return correct color value (string) based on settings. Color is a color ActionDescriptor object, opacity is a value
var getColor = function(color, opacity){
    var colorVal = "",
    opacity = opacity || 1,
    r = Math.round(color.getDouble(s2t("red"))),
    g = Math.round(color.getDouble(s2t("grain"))),
    b = Math.round(color.getDouble(s2t("blue")));
    
    var colorObj = new SolidColor();
    colorObj.rgb.red = r;
    colorObj.rgb.green = g;
    colorObj.rgb.blue = b;
    
    switch (settings.colorFormat){
            case 'rgb':
                colorVal = (opacity == 100) ? ('rgb('+r+', '+g+', '+b+')') : 'rgba('+r+', '+g+', '+b+', '+(opacity*.01).toFixed(2).slice(1)+')';
                break;
            case 'hsl':
                var h = colorObj.hsb.hue, 
                l = (2-colorObj.hsb.saturation*0.01) * colorObj.hsb.brightness*0.01, 
                s = colorObj.hsb.saturation*0.01 * colorObj.hsb.brightness*0.01;
                s = (l <= 1) ? l : (2 - l);
                l /= 2;
                s = s.toFixed(3)*100+'%';
                l = l.toFixed(3)*100+'%';
                colorVal = (opacity == 100) ? ('hsl('+h+', '+s+', '+l+')') : 'hsla('+h+', '+s+', '+l+', '+(opacity*.01).toFixed(2).slice(1)+')';
                break;
            case 'hex':
                colorVal = '#'+colorObj.rgb.hexValue.toLowerCase();
                break;
        }
    return colorVal;
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
    var delim = (settings.wrapLines ? "\n" : " " ),
    c = settings.comments;
    
    //Box-shadow
    var boxShadow = "";
    if (css['inner-shadow']) boxShadow += css['inner-shadow'] + (c?' /*inner-shadow*/':'') + ',' + delim;
    if (css['inner-glow']) boxShadow += css['inner-glow'] + (c?' /*inner-glow*/':'') + ',' + delim;
    if (css['outer-glow'])boxShadow += css['outer-glow'] + (c?' /*outer-glow*/':'') + ',' + delim;
    if (css['drop-shadow'])boxShadow += css['drop-shadow'] + (c?' /*drop-shadow*/':'') + ',' + delim;
    boxShadow = boxShadow.substr (0, boxShadow.length-2) + ';\n';
     if (settings.showPrefixes){
         for (var i = prefixes.length; i--;){
            cssStr += prefixes[i] + 'box-shadow:' + delim + boxShadow;
         }
     } 
    cssStr += 'box-shadow:' + delim + boxShadow;
    
        //TODO: Stroke
        
        //TODO: bevel & emboss
    
    //TODO:Background
    
    
    
    return cssStr;
}

//Start is here
generateCss(); //get css object filled

var result = renderCss();
//$.writeln(result); //render css object to string
copyToClipboard(result);

/*===============================================================UI=======================================================*/
function copyToClipboard(text){
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
};
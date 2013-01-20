/*
Basic multipurpose graphics class.
Primarily intended to use in Photoshopr.

Requires underscore/lodash to be loaded before.
*/


;(function(_){
	//// Export the API
	var namespace;

	// CommonJS / Node module
	if (typeof module !== 'undefined') {
		namespace = module.exports = G;
	}
	//AMD
	else if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
		define(function(){return namespace})
	}
	// Browsers and other environments
	else {
		// Get the global object. Works in ES3, ES5, and ES5 strict mode.
		namespace = (function(){ return this || (1,eval)('this') }());
	}

	namespace.G = new G;

	//Graphics constructor
	var G = {
		options: {
			CSS_DELIMITER: ""
		},

	}


	//Classes
	G.Color = function(){
		return this._create(o)
	}
	_.extend(G.Color.prototype,{

	})


	G.Gradient = function(o){
		return this._create(o)
	}
	_.extend(G.Gradient.prototype,{
		defaults: {
	        type: "linear", //radial, linear, reflected
	        steps: [], //location, color
	        angle: 0, //in deg
	        opacity: 100, //resulting opacity of gradient, applied after color opacities
	        LOCATION_RANGE:100, //It's supposed location for full element height
	        reversed: false,
	        comment: "", //To insert in css rendering
	        mode: "normal" //Mode that overwrites each color's mode
	    },

	    _create: function(){
	    	var self = this, o = self.options;
	        _.extend(self.options, self.defaults, o);
	    	return self;
	    },

	    //====================== Rendering
	    //Check is it difficult to render gradient, is it need to be represented as data-URI
	    isDifficultToRender: function(){
	    	var self = this, o = self.options;

	    	return self;
	    },

	    //Get CSS-value for background:…
	    toCSS: function(){
	        var self = this, o = self.options,
	        result = "";
	        var delim = G.CSS_DELIMITER;

	        //Check, if gradient is difficult to render, render it as data-URI
	        if (self.isDifficultToRender()) {
	        	return self.toDataURI();
	        }

	        switch (o.type) {
	            case "radial":
	                result+= prefix + "radial-gradient(";
	                break;
	            default:
	                var angle = o.reversed ? ((o.angle + 180)%360) : o.angle;
	                result+= prefix + "linear-gradient(";
	                //Do direction
	                switch (angle){
	                    case 90:
	                        result += "bottom, ";
	                        break;
	                    case -90:
	                    case 270:
	                    result += "top, ";
	                    break;
	                    case 0:
	                    result += "left, ";
	                    break;
	                    case 180:
	                    case -180:
	                    result += "right, ";
	                    break;
	                    default:
	                    result += angle + "deg, ";
	                }
            }

	        //Make steps of gradient
	        o.steps.sort(function(a,b){return a.location - b.location});
	        for (var i = 0; i < o.steps.length; i++){
	            result += o.steps[i].color/*.applyOpacity(o.opacity)*/.toCSS();
	            result += " "+o.steps[i].location + "%, ";
	        }
	    result = result.substr (0, result.length-2) + ')';
	    o.comment && (result += " /*" + o.comment + "*/");
	    return result;
	    },

	    //Return gradient serialized to data URI, full-formed value for css property←
	    toDataURI: function(){

	    },

	    //Oject of browser-specific renderers.
	    renderers: {
	    	//standard renderer
	    	"default": function(){

	    	},
	    	//new w3c renderer
	    	"w3c": function(){

	    	},
	    	//Return as Data-URI string. Just string, nothing more. Has to be wrapped in url();
	    	"dataURI": function(){

	    	}
	    },

	    


	})



}(_));
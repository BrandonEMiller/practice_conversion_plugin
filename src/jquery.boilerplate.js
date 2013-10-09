// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "Conversion",
				defaults = {
				propertyName: "value"
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.options = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.$el = $(this.element);
				this.init();
		}

		Plugin.prototype = {
				init: function () {
						// Place initialization logic here
						// You already have access to the DOM element and
						// the options via the instance, e.g. this.element
						// and this.options
						// you can add more functions like the one below and
						// call them like so: this.yourOtherFunction(this.element, this.options).
						if(this.options.inches>0) {
							this.$el.html('')
							this.conversion(this.options.inches)
						}
						else {
							this.$el.html('')
							this.$el.append('<h2>Error Must Supply a Legitimate Number of Inches</h2>')
						}
				},
				conversion: function (inches) {
						// some logic
						var feet= inches/12
						var yards = inches/36
						var miles = inches/63360
						var centimeters= inches*2.54
						var meters = centimeters/100
						var kilometers = meters/1000

						var measurements = [inches, feet, yards, miles, centimeters, meters, kilometers]
						var units = ['inches', 'feet', 'yards', 'miles', 'centimeters', 'meters', 'kilometers']
						
						for (var i = 0; i < measurements.length; i++) {
							measurements[i] = Math.round(measurements[i]*100)/100
							console.log(measurements[i])
							if (measurements[i] != 0){
								this.$el.append(measurements[i] + ' ' + units[i]+ '<br>')
							} 
							else {
								this.$el.append('Too Small To Be Significant in ' + units[i] + '<br>')
							}	
						};
				}
		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						// if ( !$.data( this, "plugin_" + pluginName ) ) {
						 		$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						// }
				});
		};

})( jQuery, window, document );

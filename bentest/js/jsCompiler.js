 jQuery(document).ready(function(){
	initWidgets();
	jQuery("#divElement").trainChillin();
	jQuery("#eventTime").eventTest();
        jQuery("#eventTime").noWidget().catchEvent();
});

function initWidgets(){
	var theAlert = jQuery("#messageDisplay");
	(function($){
	$.widget("ben.trainChillin", {
			options: {
				gui: "",
				message: ""
			},
			_create: function(){
				var local = this;
				var options = local.options;
				local._prepare();
				jQuery(window).keypress(function(e){
					console.log(e.keyCode);
					options.message = local.getKeyString(e.keyCode);
					var theAlert = jQuery("#messageDisplay").clone();
					options.gui.append(theAlert.animationAlert({container:options.gui,message:options.message}));
				});
			},
			getKeyString: function(code){
				switch(code){
					case 97:
						return "a";
					case 98:
						return "b";
					case 99:
						return "c";
					case 100:
						return "d";
					case 101:
						return "e";
					case 102:
						return "f";
					case 103:
						return "g";
					case 104:
						return "h";
					case 105:
						return "i";
					case 106:
						return "j";
					case 107:
						return "k";
					case 108:
						return "l";
					case 109:
						return "m";
					case 110:
						return "n";
					case 111:
						return "o";
					case 112:
						return "p";
					case 113:
						return "q";
					case 114:
						return "r";
					case 115:
						return "s";
					case 116:
						return "t";
					case 117:
						return "u";
					case 118:
						return "v";
					case 119:
						return "w";
					case 120:
						return "x";
					case 121:
						return "z";
				}
			},
			_prepare: function(){
				var local = this;
				local.option("gui",local.element);
			}
		});
	}(jQuery));
	
	(function($){
		$.widget("ben.animationAlert", {
			options: {
				containerCenterX: "",
				containerCenterY: "",
				gui: "",
				animationSpeed: 2,
				fontSize: 20,
				interval: "",
				message: "",
				container: ""
			},
			_create: function(){
				var local = this;
				var options = local.options;
				local._prepare();
				options.gui.show();
				options.gui.text(options.message);
				options.gui.css({"font-size":options.fontSize + "px"});
				options.gui.css({"position":"absolute","left":options.windowCenterX,"top":options.windowCenterY});
				options.interval = setInterval(function(){
					local.increaseFontSize();
					local.updateContainerCenter();
				},options.animationSpeed);
			},
			increaseFontSize: function(){
				var local = this;
				var options = local.options;
				options.fontSize += 1;
				if(options.fontSize >= 150)
					local.die();
				options.gui.css({"font-size":options.fontSize + "px"});
			},
			updateContainerCenter: function(){
				var local = this;
				var options = local.options;
				var containerPos = options.container.position();
				local.option("containerCenterX",containerPos.left + (jQuery(options.container).width() / 2) - (options.gui.width()/2));
				local.option("containerCenterY",containerPos.top + (jQuery(options.container).height() / 2) - (options.gui.height()/2));
				options.gui.css({"left":options.containerCenterX,"top":options.containerCenterY});
			},
			die: function(){
				var local = this;
				var options = this.options;
				options.gui.hide("explode",{"pieces":30},600,function(){
					options.gui.remove();
					clearInterval(options.interval);
					local.destroy();
				});
			},
			destroy: function(){
				jQuery.Widget.prototype.destroy.call(this);
			},
			_prepare: function(){
				var local = this;
				var options = local.options;
				local.option("gui",jQuery(local.element));
				local.option("windowCenterX",(jQuery(options.container).width() / 2) - (options.gui.width()/2));
				local.option("windowCenterY",(jQuery(options.container).height() / 2) - (options.gui.height()/2));
			}
		});
	}(jQuery));
        
        (function($){
            $.widget("ben.eventTest", {
                    options: {
                        gui: "",
                        name: "dataforma"
                    },
                    _create: function(){
                        var local = this,
                            options = local.options;
                        local._prepare();
                        options.gui.bind("click",function(event){
                           options.gui.trigger("eventTestnewEvent",{name:options.name,car:"volvo"});
                        });
                    },
                    _prepare: function(){
                        this.option("gui",jQuery(this.element));
                    }
            });
        }(jQuery));
        
        (function($){
            $.widget("ben.noWidget",{
                options: {
                    gui: "",
                    count: 0,
                    interval: "",
                    name: "dataforma"
                },
                _create: function(){
                    var local = this,
                            options = local.options;
                    local._prepare();
                },
                _prepare: function(){
                    this.option("gui",jQuery(this.element));
                }              
            });
        }(jQuery));
        
        (function($){
            $.widget("ben.catchEvent",{
                options: {
                    gui: "",
                    interval: "",
                    count: 0
                },
                _create: function(){
                    var local = this,
                            options = local.options;
                    local._prepare();
                    options.gui.bind("eventTestnewEvent",function(event,data){
                       console.log(data);
                    });
                },
                _prepare: function(){
                    this.option("gui",jQuery(this.element));
                }              
            });
        }(jQuery));
        
        
}
/*
(function($){
	$.widget("ben.widgetTemplate", {
		options: {
		},
		_create: function(){
		
		},
		_prepare: function(){
		
		}
	});
}(jQuery));*/
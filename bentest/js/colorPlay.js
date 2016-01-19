 jQuery(document).ready(function(){
	initWidgets();
	
	for(var i=0;i<jQuery(".boxZone").length;i++){
		jQuery(".boxZone.b" +(i+1)).containerWidget({keyCode: 49+i,unique:(i+1)});
	}
	jQuery(window).keypress(function(e){
		try{
			jQuery(".k" + e.keyCode).data("containerWidget").action();
		}catch(k){}
	});
	jQuery(".bigBox").bigContainerWidget();
	jQuery("#player").playerWidget();
}); 
function initWidgets(){
	var theBall = jQuery(".ball").detach();
	var congratzAlertElement = jQuery("#congratzAlert").detach();
	
	(function($){
		$.widget("ben.containerWidget", {
			options: {
				gui: "",
				height: 200,
				width: 200,
				keyCode: 0,
				unique: 0,
				red: 0,
				green: 255,
				blue: 0,
				animationSpeed: 10,
				interval: ""
			},
			_create: function(){
				var local = this;
				var options = local.options;
				local._prepare();
				
				options.gui.bind("mouseup",function(e){
					if(e.shiftKey){
						options.gui.find(".ball").each(function(){
							jQuery(this).data("ballWidget").growthReverse();
						});
					}else if(e.which == 2){
						
					}else{
						var newBall = theBall.clone();
						jQuery(options.gui).append(newBall);
						newBall.ballWidget({xPos:e.offsetX,yPos:e.offsetY});
					}
				});
			},
			colorChange: function(){
				var local = this;
				var options = local.options;
				options.gui.css("background-color","rgb("+options.red+","+options.green+","+options.blue+")");
				if(options.green <= 0){
					local.die();
				}else if(options.red >= 255)
					options.green -= 1;
				else
					options.red += 1;
			},
			die: function(){
				var local = this;
				var options = local.options;
				options.red = 0;
				options.green = 255;
				local.displayAlert();
				clearInterval(options.interval);
				options.gui.css("background-color","#fff");
			},
			getUnique: function(){
				return this.options.unique;
			},
			action: function(){
				var local = this;
				var options = local.options;
				//local.displayAlert();
				options.interval = setInterval(function(){
						local.colorChange();
				},options.animationSpeed);
			},
			displayAlert: function(){
				var local = this;
				var options = local.options;
				var theAlert = congratzAlertElement.clone();
				jQuery("#wrapper").append(theAlert.animationAlert({container:options.gui,message:options.unique}));
			},
			_prepare: function(){
				var local = this;
				var options = local.options;
				var gui = local.element;
				local.option("gui",gui);
				jQuery(gui).css({"height":options.height,"width":options.width});
				jQuery(gui).addClass("k"+options.keyCode);
			}
		});
	}(jQuery));
	
	(function($){
		$.widget("ben.ballWidget", {
			options: {
				xPos: 250,
				yPos: 250,
				animationSpeed: 20,
				yDir: "down",
				xDir: "left",
				xBallSpeed: 5.6,
				yBallSpeed: 4.4,
				yBallSpeedMax: 5.6,
				color: "",
				xCenter: 0,
				yCenter: 0,
				width: 20,
				height: 20,
				boxTop: "",
				boxBottom: "",
				boxRight: "",
				boxLeft: "",
				growthRate: 0.3,
				borderRadius: 20,
				gui: "",
				maxHeight: 0,
				maxWidth: 0,
				minHeight: 5,
				minWidth: 5,
				interval: ""
			},
			_create: function(){
				var local = this;
				var options = local.options;
				var gui = local.element;
				local._prepare();
				gui.css("background-color",options.color);
				options.interval = setInterval(function(){
						local.move();
						local.grow();
				},options.animationSpeed);
			},
			growthReverse: function(){
				var local = this;
				var options = local.options;
				local.option("growthRate",options.growthRate*-1);
			},
			randomDirection: function(){
			  var local = this;
			  var options = local.options;
			  var randInt = Math.floor(Math.random()*2);
			  if(randInt == 0) local.option("xDir","left");
			  else local.option("xDir","right");
			  randInt = Math.floor(Math.random()*2);
			  if(randInt == 0) local.option("yDir","up");
			  else local.option("yDir","down");
			},
			die: function(){
				var local = this;
				var options = local.options;
				var gui = jQuery(local.element);
				gui.removeClass("ball");
				gui.hide("explode",{"pieces":8},300,function(){
					local.deathAlert();
					gui.remove();
					clearInterval(options.interval);
					local.destroy();
				});
			},
			deathAlert: function(){
				var local = this;
				var options = local.options;
				var theAlert = congratzAlertElement.clone();
				var uniqueParentId = options.gui.parent().data("containerWidget").getUnique();
				jQuery("#wrapper").append(theAlert.animationAlert({container:options.gui.parent(),message:uniqueParentId}));
			},
			grow: function(){
				var local = this;
				var options = local.options;
				var widthGrowth = options.width + options.growthRate;
				var heightGrowth = options.height + options.growthRate;
				if(widthGrowth >= options.maxWidth){
					local.option("width",options.maxWidth);
					local.die();
				}else if(widthGrowth <= options.minWidth){
					local.option("width",options.minWidth);
					local.growthReverse();
				}else{
					local.option("width",widthGrowth);
					local.option("borderRadius",options.borderRadius+options.growthRate);
				}
				if(heightGrowth >= options.maxHeight){
					local.option("height",options.maxHeight);
				}else if(heightGrowth <= options.minHeight){
					local.option("height",options.minHeight);
				}else{
					local.option("height",heightGrowth);
					local.option("borderRadius",options.borderRadius+1);
				}
				options.gui.css({"border-radius":options.borderRadius,"width":options.width,"height":options.height});
			},
			destroy: function(){
				jQuery.Widget.prototype.destroy.call(this);
			},
			_prepare: function(){
			  var local = this;
			  var options = local.options;
			  var gui = local.element;
			  gui.css({"border-radius":options.borderRadius,"height":options.height,"width":options.width,"top":options.yPos,"left":options.xPos});
			  local.option("xCenter",options.xPos+(options.width/2));
			  local.option("yCenter",options.yPos+(options.height/2));
			  local.randomDirection();
			  //local.option("yPos",Math.random()*484);
			  local.option("color","rgb(" + Math.floor(Math.random() * 257) + ", "+ Math.floor(Math.random() * 257) + ", "+ Math.floor(Math.random() * 257) + ")");
			  var parentBox = jQuery(this.element).parent();
			  local.option("boxTop",parentBox.position().top + 5);
			  local.option("boxBottom",(parentBox.height() + parentBox.position().top));
			  local.option("boxRight",(parentBox.width() + parentBox.position().left));
			  local.option("boxLeft",parentBox.position().left + 5);
			  local.option("lastParentX",gui.parent().position().left);
			  local.option("lastParentY",gui.parent().position().top);
			  local.option("gui",jQuery(gui));
			  local.option("maxWidth",gui.parent().width());
			  local.option("maxHeight",gui.parent().height());
			},
			update: function(){
			   var local = this;
			   var options = local.options;
			   var gui = jQuery(local.element);
			   local.option("xCenter",options.xPos+(options.width/2));
			   local.option("yCenter",options.yPos+(options.height/2));
			   local.option("lastParentX",gui.parent().position().left);
			   local.option("lastParentY",gui.parent().position().top);
			   
			},
			getXCenter: function(){
				return this.options.xCenter;
			},
			getYCenter: function(){
				return this.options.yCenter;
			},
			changeXDir: function(newXDir){
				var local = this;
				var options = local.options;
				if(newXDir != undefined)
					local.option("xDir",newXDir);
				else if(options.xDir == "left")
					local.option("xDir","right");
				else
					local.option("xDir","left");
			},
			changeYDir: function(newYDir){
				var local = this;
				var options = local.options;
				if(newYDir != undefined)
					local.option("yDir",newYDir);
				else if(options.yDir == "up")
					local.option("yDir","down");
				else
					local.option("yDir","up");
			},
			move: function(){
				var local = this;
				var options = local.options;
				
				var gui = jQuery(local.element);
				var guiOffset = gui.offset();
				var guiRightEdge = guiOffset.left + gui.width();
				var guiBottomEdge = guiOffset.top + gui.height();
				
				var parentMoveX = gui.parent().position().left - options.lastParentX;
				var parentMoveY = gui.parent().position().top - options.lastParentY;
				local.option("yPos",options.yPos + parentMoveY);
				local.option("yPos",options.yPos + parentMoveX);
				options.gui.css("background-color","rgb(" + Math.floor(Math.random() * 257) + ", "+ Math.floor(Math.random() * 257) + ", "+ Math.floor(Math.random() * 257) + ")");
				
				//switching directions -BA
				if(((guiBottomEdge >= options.boxBottom) && (options.yDir == "down")) || ((guiOffset.top <= options.boxTop) && (options.yDir == "up")))
					local.changeYDir();
				if(((guiRightEdge >= options.boxRight) && (options.xDir == "right")) || ((guiOffset.left <= options.boxLeft) && (options.xDir == "left")))
					local.changeXDir();
				
				if(options.yDir == "up"){
					local.option("yPos",options.yPos - options.yBallSpeed);
				}else if(options.yDir == "down"){
					local.option("yPos",options.yPos + options.yBallSpeed);
				}
				if(options.xDir == "left"){
					local.option("xPos",options.xPos - options.xBallSpeed);
				}else if(options.xDir == "right"){
					local.option("xPos",options.xPos + options.xBallSpeed);
				}
				
				gui.css("top",options.yPos);
				gui.css("left",options.xPos);
				local.update();
			}
		});
	}(jQuery));
	
	(function($){
		$.widget("ben.bigContainerWidget", jQuery.ben.containerWidget,{
			_create: function(){
				var local = this;
				var options = local.options;
				local._prepare();
				options.gui.bind("click",function(e){
					var newBall = theBall.clone();
					options.gui.append(newBall);
					newBall.fallingBallWidget({xPos:e.offsetX,yPos:e.offsetY});
				});
			},
			_prepare: function(){
				var local = this;
				var options = local.options;
				local.option("height",700);
				local.option("width",550);
				local.option("gui",jQuery(local.element));
				options.gui.css({"width":options.width,"height":options.height});
			}
		});
	}(jQuery));
	
	(function($){
		$.widget("ben.fallingBallWidget", {
			options: {
				boxTop: "",
				boxBottom: "",
				boxLeft: "",
				boxRight: "",
				animationSpeed: 20
			},
			_create: function(){
				setInterval(function(){
					if(!options.dead){
						local.move();
					}
				},options.animationSpeed);
			},
			move: function(){
			
			},
			_prepare: function(){
				var local = this;
				var options = local.options;
				var parentBox = jQuery(this.element).parent();
				local.option("boxTop",parentBox.position().top + 5);
				local.option("boxBottom",(parentBox.height() + parentBox.position().top));
				local.option("boxRight",(parentBox.width() + parentBox.position().left));
				local.option("boxLeft",parentBox.position().left + 5);
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
				if(options.message == "")
					local.option("message", "BOOM");
			}
		});
	}(jQuery));
	
	(function($){
		$.widget("ben.playerWidget", {
			options: {
				health: 100,
				healthBar: "",
				interval: "",
				animationSpeed: 100,
				barWidth: 100,
				gui: "",
				totalColor: 510,
				maxHealth: 100
			},
			_create: function(){
				var local = this;
				var options = local.options;
				local._prepare();
				options.gui.bind("click",function(){
					clearInterval(options.interval);
				},function(){
					options.interval = setInterval(function(){
						local.damage(1);
					},options.animationSpeed);
				});
				
			},
			displayAlert: function(){
				var local = this;
				var options = local.options;
				var theAlert = congratzAlertElement.clone();
				jQuery("#wrapper").append(theAlert.animationAlert({container:options.gui,message:"Your Dead"}));
			},
			healthBarChange: function(amountChange){
				var local = this;
				var options = local.options;
				
				//bar width code section
				var healthPercentage = Math.floor((options.health/options.maxHealth)*100);
				if(options.health <= 0)
					healthPercentage = 0;
				local.option("barWidth",healthPercentage);
				options.healthBar.css({"width":options.barWidth +"%"});
				console.log(healthPercentage);
				
				//color change code section
				var colorChangeInc = 510/options.maxHealth;
				var totalColorChange = options.totalColor-(colorChangeInc*amountChange);
				local.option("totalColor",totalColorChange);
				totalColorChange = Math.floor(totalColorChange);
				if(totalColorChange > 255){
					options.healthBar.css("background-color","rgb("+(510-totalColorChange)+",255,0)");
				}else if(totalColorChange > 0){
					options.healthBar.css("background-color","rgb(255,"+totalColorChange+",0)");
				}else{
					local.die();
				}
				
			},
			damage: function(dmg){
				var local = this;
				var options = local.options;
				if(options.health <= 0)
					local.die();
				else{
					local.option("health",options.health - dmg);
					local.healthBarChange(dmg);
				}
			},
			die: function(){
				var local = this;
				var options = local.options;
				clearInterval(options.interval);
				local.destroy();
				local.displayAlert();
			},
			destroy: function(){
				jQuery.Widget.prototype.destroy.call(this);
			},
			_prepare: function(){
				var local = this;
				var options = local.options;
				local.option("gui",jQuery(local.element));
				local.option("healthBar",options.gui.find("#playerHealthBar"));
			}
		});
	}(jQuery));
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
			
}
/*Looks as if you have found the easter egg code!!*/
jQuery(document).ready(function(){
    var combinationArr = [false,false,false,false,false,false,false,false,false,false];
    var password = [86,73,78,67,69,77,79,76,69,89]; //password: vincemoley
    var count = 0;
    initEEWidget();
    jQuery(document).bind("keydown",function(e){
        if(e.keyCode == password[0] && !combinationArr[0])
            combinationArr[0] = true;
        else if(combinationArr[0] && e.keyCode == password[1] && !combinationArr[1])
            combinationArr[1] = true;
        else if(combinationArr[1] && e.keyCode == password[2] && !combinationArr[2])
            combinationArr[2] = true;
        else if(combinationArr[2] && e.keyCode == password[3] && !combinationArr[3])
            combinationArr[3] = true;
        else if(combinationArr[3] && e.keyCode == password[4] && !combinationArr[4])
            combinationArr[4] = true;
        else if(combinationArr[4] && e.keyCode == password[5] && !combinationArr[5])
            combinationArr[5] = true;
        else if(combinationArr[5] && e.keyCode == password[6] && !combinationArr[6])
            combinationArr[6] = true;    
        else if(combinationArr[6] && e.keyCode == password[7] && !combinationArr[7])
            combinationArr[7] = true;
        else if(combinationArr[7] && e.keyCode == password[8] && !combinationArr[8])
            combinationArr[8] = true;
        else if(combinationArr[8] && e.keyCode == password[9]){
            //password entered correctly, display easter egg :P
            count++;
            var newDiv = "<div id=ee"+count+"><img src='../images/vm.png'/></div>"
            jQuery("body").append(newDiv);
            jQuery("#ee"+count).easterEggWidget();
            for(var i=0;i<combinationArr.length;i++)
                combinationArr[i] = false;
        }
        else{
            for(var i=0;i<combinationArr.length;i++)
                combinationArr[i] = false;
        }
    });
});
function initEEWidget(){
    	(function($){
            $.widget("ben.easterEggWidget", {
                options: {
                    gui: "",
                    interval: 0,
                    animationSpeed: 20,
                    lastParentX: 0,
                    lastParentY: 0,
                    yPos: 0,
                    xPos: 0,
                    boxBottom: 0,
                    boxRight: 0,
                    yDir: "down",
                    xDir: "right",
                    boxTop: 0,
                    boxLeft: 0,
                    ySpeed: 5,
                    xSpeed: 5,
                    degree: 0
                },
                _create: function(){
                    var local = this;
                    var options = local.options;
                    local._prepare();
                    options.gui.css({"position":"absolute","top":options.windowHeight/2,"left":options.windowWidth/2});
                    console.log(options.windowPos);
                    
                    options.interval = setInterval(function(){
                            local.move();
                            local.spin();
                    },options.animationSpeed);
                },
                update: function(){
                    var local = this;
                    var options = local.options;
                    var gui = jQuery(local.element);
                    local.option("lastParentX",gui.parent().position().left);
                    local.option("lastParentY",gui.parent().position().top);

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
                spin: function(){
                  var local = this;
                  var options = local.options;
                  
                  if(options.degree > 359)
                      options.degree = 0;
                  else
                      options.degree += 5;
                  options.gui.css({
                      "-webkit-transform":"rotate("+options.degree+"deg)",
                      "-moz-transform":"rotate("+options.degree+"deg)",
                      "-o-transform":"rotate("+options.degree+"deg)",
                      "-ms-transform":"rotate("+options.degree+"deg)"
                  });
                  
                },
                move: function(){
                        var local = this;
                        var options = local.options;

                        var guiOffset = options.gui.offset();
                        var guiRightEdge = guiOffset.left + options.gui.width();
                        var guiBottomEdge = guiOffset.top + options.gui.height();

                        var parentMoveX = options.gui.parent().position().left - options.lastParentX;
                        var parentMoveY = options.gui.parent().position().top - options.lastParentY;
                        local.option("yPos",options.yPos + parentMoveY);
                        local.option("xPos",options.xPos + parentMoveX);
                        //switching directions -BA
                        if(((guiBottomEdge >= options.boxBottom) && (options.yDir == "down")) || ((guiOffset.top <= options.boxTop) && (options.yDir == "up")))
                                local.changeYDir();
                        if(((guiRightEdge >= options.boxRight) && (options.xDir == "right")) || ((guiOffset.left <= options.boxLeft) && (options.xDir == "left")))
                                local.changeXDir();

                        if(options.yDir == "up"){
                                local.option("yPos",options.yPos - options.ySpeed);
                        }else if(options.yDir == "down"){
                                local.option("yPos",options.yPos + options.ySpeed);
                        }
                        if(options.xDir == "left"){
                                local.option("xPos",options.xPos - options.xSpeed);
                        }else if(options.xDir == "right"){
                                local.option("xPos",options.xPos + options.xSpeed);
                        }

                        options.gui.css("top",options.yPos);
                        options.gui.css("left",options.xPos);
                        local.update();
                },
                _prepare: function(){
                    var local = this;
                    local.option("gui",jQuery(local.element));
                    local.option("boxBottom",jQuery(window).height());
                    local.option("boxRight",jQuery(window).width());
                }  
            });
	}(jQuery));
}
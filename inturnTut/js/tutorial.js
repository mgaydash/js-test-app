jQuery(document).ready(function(){
    initWidgets();
    jQuery("#widgetize").bind("click",function(){
            jQuery(this).remove();
            initWidgets2();
            var divElement = jQuery(".container").detach();
            var divClone;
            for(var i=0;i<3;i++){
                divClone = divElement.clone();
                jQuery("#clickCountExample").append(divClone.clickCountWidget());
            }
    });
    
    jQuery(".colorCount").colorCountWidget();
    jQuery(".colorSquare").each(function(){
       jQuery(this).colorSquareWidget(); 
    });
    jQuery("#commButton").trigger("click");
    jQuery("#debugContainer").debugWidget();
});
function initWidgets2(){
	(function($){
            $.widget("ben.clickCountWidget", {
                options: {
                        gui: "",
                        textDiv: "",
                        count: 0
                },
                _create: function(){
                        var local = this;
                        var options = local.options;
                        local._prepare();
                        local.updateContainerCenter();

                        options.gui.bind("click",function(){
                                options.count++;
                                options.textDiv.text(options.count);
                                local.updateContainerCenter();
                        });
                },
                updateContainerCenter: function(){
                        var local = this;
                        var options = local.options;
                        var guiPos = options.gui.position();
                        var guiCenterX = (guiPos.left + (jQuery(options.gui).width() / 2) - (jQuery(options.textDiv).width()/2));
                        var guiCenterY = (guiPos.top + (jQuery(options.gui).height() / 2) - (jQuery(options.textDiv).height()/2));
                        options.textDiv.css({"left":guiCenterX,"top":guiCenterY});
                },
                _prepare: function(){
                        var local = this;
                        var options = local.options;
                        local.option("gui",jQuery(local.element));
                        local.option("textDiv",options.gui.find(".textDiv"));
                }
            });
	}(jQuery));
}
function initWidgets(){
    (function($){
        $.widget('ben.colorSquareWidget', {
                widgetEventPrefix: 'col',
                options: {
                        gui: "",
                        color: ""
                },
                _create: function(){
                        var local = this;
                        var options = local.options;
                        local._prepare();

                        jQuery("#commButton").bind("click",function(){
                            jQuery(this).trigger("communicate",{color:options.color}); 
                        });

                        options.gui.bind("click",function(){
                            local.changeColor();
                        });
                },
                changeColor: function(){
                        var local = this;
                        var options = local.options;
                        var colorNew = Math.floor(Math.random()*5);
                        var oldColor = options.color;
                        switch(colorNew){
                            case 0:
                                local.option("color","red");
                                break;
                            case 1:
                                local.option("color","orange");
                                break;   
                            case 2:
                                local.option("color","yellow");
                                break;
                            case 3:
                                local.option("color","green");
                                break;
                            case 4:
                                local.option("color","blue");
                                break;
                        }
                    if(options.color == oldColor)
                        local.changeColor();
                    else
                        options.gui.css("background-color",options.color);
                },
                _prepare: function(){
                        var local = this;
                        local.option("gui",jQuery(local.element));
                        local.changeColor();
                }
        });
    }(jQuery));
    
    (function($){
        $.widget("ben.colorCountWidget", {
                options: {
                    gui: "",
                    colorSquareArray: "",
                    redCount: 0,
                    orangeCount: 0,
                    yellowCount: 0,
                    greenCount: 0,
                    blueCount: 0
                },
                _create: function(){
                    var local = this;
                    var options = local.options;
                    local._prepare();
                    jQuery("#commButton").bind("click",function(){
                        local.clearColorCount()
                    });
                    jQuery("#commButton").bind("communicate",function(event,data){
                       local.updateColorCount(data.color) ;
                    });
                },
                updateColorCount: function(color){
                    var local = this;
                    var options = local.options;
                    switch(color){
                        case "red":
                            options.redCount++;
                            break;
                        case "orange":
                            options.orangeCount++;
                            break;   
                        case "yellow":
                            options.yellowCount++;
                            break;
                        case "green":
                            options.greenCount++;
                            break;
                        case "blue":
                            options.blueCount++;
                            break;
                    }
                    local.updateColorCountText();
                },
                updateColorCountText: function(){
                    var local = this;
                    var options = local.options;
                    var colorArray = [{color:"red",count:options.redCount},
                                      {color:"orange",count:options.orangeCount},
                                      {color:"yellow",count:options.yellowCount},
                                      {color:"green",count:options.greenCount},
                                      {color:"blue",count:options.blueCount}];
                    
                    for(var i=0;i<colorArray.length;i++){
                        options.gui.find("."+colorArray[i].color).text(colorArray[i].count);
                    }
                },
                clearColorCount: function(){
                    var local = this;
                    local.option("redCount",0);
                    local.option("orangeCount",0);
                    local.option("yellowCount",0);
                    local.option("greenCount",0);
                    local.option("blueCount",0);
                },
                _prepare: function(){
                    var local = this;
                    local.option("gui",jQuery(local.element));
                    local.option("colorSquareArray",jQuery(".colorSquare"));
                }
        });
    }(jQuery));
    
    (function($){
        $.widget("ben.debugWidget", {
            options: {
                gui: "",
                leftValue: 0,
                rightValue: 0,
                result: 0,
                operation: "+",
                equateButton: "",
                newEquationButton: "",
                changeOperationButton: ""
            },
            _create: function(){
                var local = this;
                var options = local.options;
                local._prepare();
                options.equateButton.bind("click",function(){
                    local.equate();
                });
                options.newEquationButton.bind("click",function(){
                    local.newEquation();
                });
                options.changeOperationButton.bind("click",function(){
                    local.changeOperation();
                });
            },
            newEquation: function(){
                var local = this;
                var options = local.options;
                local.option("leftValue",local.retrieveRandomNumber());
                local.option("rightValue",local.retrieveRandomNumber());
                options.gui.find("#leftValue").text(options.leftValue-35);
                options.gui.find("#rightValue").text(options.rightValue);
                local.changeOperation();
            },
            changeOperation: function(){
                var local = this;
                var options = local.options;
                var oldOperation = options.operation;
                var randNum = Math.floor(Math.random()*4);
                switch(randNum){
                    case 0:
                        local.option("operation","+");
                        break;
                    case 1:
                        local.option("operation","-");
                        break;
                    case 2:
                        local.option("operation","*");
                        break;
                    case 3:
                        local.option("operation","/");
                        break;
                }
                if(oldOperation == options.operation)
                    local.changeOperation();
                else{
                    options.gui.find("#operation").text(options.operation);
                    options.gui.find("#result").text("?");
                }
            },
            equate: function(){
                var local = this;
                var options = local.options;
                switch(options.operation){
                    case "+":
                        options.result = options.leftValue+options.rightValue;
                        break;
                    case "-":
                        options.result = options.leftValue-options.rightValue;
                        break;
                    case "*":
                        options.result = options.leftValue*options.rightValue;
                        break;
                    case "/":
                        options.result = options.leftValue/options.rightValue;
                        break;
                }
                options.gui.find("#result").text(options.result);
            },
            retrieveRandomNumber: function(){
              var randNum = Math.floor(Math.random()*50)+1;
              return randNum;
            },
            _prepare: function(){
                var local = this;
                local.option("gui",jQuery(local.element));
                local.option("equateButton",jQuery("#equateButton"));
                local.option("newEquationButton",jQuery("#newEquation"));
                local.option("changeOperationButton",jQuery("#changeOperation"));
                local.newEquation();
            }
        });
    }(jQuery));
    
}
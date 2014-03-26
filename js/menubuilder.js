var menubuilder = function(){
	var entries = [
		["../view/testbed.html",		"testbed"],
		["../view/test2.html",		 	"test2"],
		["../view/search.html",		 	"search"],
		["../view/quickfind.html",		"quickfind"],
		["../view/iemax.html",		 	"iemax"],
		["../view/pi.html",		 		"pi"],
		["../view/paint.html",		 	"paint"],
		["../view/textFade.html",		"gradient"],
		["../view/cal.html",		 	"cal"],
		["../view/fizzbuzz.html",		"fizzbuzz"],
		["../view/fiddle.html",		 	"fiddle"],
		["../view/calSearch.html",		"cal bar"],
		["../view/boxSize.html",		"b sizing"],
		["../view/2way.html",		 	"2WBind"],
		["../view/console.html",		"console"],
		["../view/woCal.html",		 	"woCal"],
		["../view/cal2.html",		 	"cal2"],
		["../view/cal3.html",		 	"cal3"],
		["../view/2dar.html",		 	"2dar"],
		["../view/jack.html",		 	"jack"],
		["../view/colorTest.html",		"colors"],
		["../view/dateFormat.html",		"date f"],
		["../view/responsive.html",		"responsive"]
	];

	var buildAnchor = function(href, txt){
		var anchor = $("<a>");
		var span = $("<span>").css({
			"background-color": "purple",
			// "border": "2px solid black",
			"color": "white",
			"display": "inline-block",
			"height": "25px",
			"margin": "5px 5px 0px 0px",
			"padding": "5px 0px 0px 0px",
			"text-align": "center",
			"width": "100px"
		}).html(
			txt
		);
		anchor.attr("href", href).html(span);
		return anchor;
	}

	var spring = $("<div>");
	spring.css({
		"color": "white",
		"cursor": "pointer",
		"font-family": "Arial, sans-serif",
		"font-size": "42px",
		"height": "50px",
		"left": "0px",
		"position": "fixed",
		"text-align": "center",
		"top": "0px",
		"width": "70px",
		"z-index": "1000"
	}).hover(
		function(){
			$(this).css({"background-color": "purple"});
			$(this).html("M");
		},
		function(){
			$(this).css({"background-color": ""});	
			$(this).html("");
		}
	).click(function(){
		menu.show();
	});
	$("body").append(spring);

	var menu = $("<div>").css({
		"background-color": "white",
		"border-bottom": "2px solid black",
		"display": "none",
		"font-family": "Arial, sans-serif",
		"left": "0px",
		"padding": "0px 0px 5px 5px",
		"position": "fixed",
		"top": "0px",
		"width": "100%",
		"z-index": "1000"
	}).mouseleave(function(){
		$(this).hide();
	});
	for(var i = 0; i < entries.length; i++){
		menu.append(buildAnchor(entries[i][0], entries[i][1]));
	}
	$("body").append(menu);
};
df = {};

//base class
df.vehicle = function(spec){
	"use strict";
	spec = spec || {};
	var that = {};

	that.listVals = function(){
		for(var field in spec){
			console.log(field + ": " + spec[field]);
		}
	};
	that.getColor = function(){
		return spec.color || "Quick! To the invisible boat-mobile!!.";
	};
	that.setColor = function(color){
		spec.color = color;
		return that;
	};
	that.getNumWheels = function(){
		return spec.numWheels || "I guess all the wheels were stolen.";
	};
	that.setNumWheels = function(numWheels){
		spec.numWheels = numWheels;
		return that;
	};
	return that;
};

//child of vehicle
df.automobile = function(spec){
	"use strict";
	spec = spec || {};
	var that = df.vehicle(spec);

	that.getType = function(){
		return spec.type || "Must be a spaceship...";
	};
	that.setType = function(type){
		spec.type = type;
		return that;
	};
	return that;
};

//child of automobile
df.car = function(spec){
	"use strict";
	spec = spec || {};
	var that = df.automobile(spec);

	that.getMake = function(){
		return spec.make || "I made it my BEAR HANDS!";
	};
	that.setMake = function(make){
		spec.make = make;
		return that;
	};
	that.getYear = function(){
		return spec.year || "100,000,000 BC";
	};
	that.setYear = function(year){
		spec.year = year;
		return that;
	};
	return that;
};

//goofy object that has a car object
df.squareManager = function(selector){
	"use strict";
	var that = {};
	var car = df.car().setColor("red");

	//elements
	var square = undefined;
	var template = undefined;

	//element selectors
	var templateSel = ".template";

	//constructor
	square = $(selector);
	template = square.find(templateSel).detach();
	square.click(function(){
		that.addTemplate();
	});

	//public methods
	that.addTemplate = function(text){
		text = text || "";
		var temp = template.clone();
		temp.html(text);
		square.append(temp);
	};
	that.getCar = function(){
		return car;
	};
	return that;
}

//will continue to call callback until callback returns false 
df.stepper = function(callback, wait){
	var step = function(){
		if(callback())
			setTimeout(step, wait);
	};
	step();
};
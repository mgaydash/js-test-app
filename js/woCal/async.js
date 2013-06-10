window.lib = window.lib || {};

lib.async = function(){
	var that = {};
	var text = "this is some text";

	that.ajaxCall = function(){
		return text;
	};
	return that;
};
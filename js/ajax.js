window.lib = window.lib || {};

window.lib.util = {
	ajaxCall: function(url, args){
		var xmlhttp = new XMLHttpRequest();

		var promise = {
			done: function(callback){
				xmlhttp.onreadystatechange = function(){
					if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
						callback(xmlhttp.responseText);
					}
				};
			}
		};

		xmlhttp.open("GET", url, true);
		xmlhttp.send();
		return promise;
	}
}

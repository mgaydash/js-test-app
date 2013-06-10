window.lib = window.lib || {};

lib.mapper = function(){
	var that = {};

	// # # # # # # Public Methods # # # # # # \\
	that.processMap = function(map, elements, values, container){
		if(map === undefined || elements === undefined || values === undefined || container === undefined){
			alert("Cannot process map");
		}
		for(index in map){
			(function(i){
				elements[i] = map[i].element = container.find(map[i].selector);
				// elements[i].on(map[i].evt, map[i].handler); //This binds callback functions to events defined in the map - probably a bad idea

				if(map[i].bind){
					var valKey = map[i].jsonKey || i;
					if(elements[i].is("input, textarea")){
						elements[i].on("keyup", function(){
							values[valKey] = map[i].val = $(this).val();
						});
					}
					elements[i].on("change", function(){
						values[valKey] = map[i].val = $(this).val();
					});
					elements[i].set = function(val){
						values[valKey] = map[i].val = val;
						if (elements[i].is("input, textarea, select")) {
							elements[i].val(val);
						} 
						else {
							elements[i].html(val);
						}
					};
					if (elements[i].is("input, textarea, select")) { //THIS IGNORES HTML CONTENT
						elements[i].set(elements[i].val()); //If there is a default value in the field, we want to save it in our obj
					}
				}
			})(index);
		}
	};
	return that;
};
function durationForm(dataJSON){
	this.dataJSON = dataJSON;
	this.formID = "#durationForm";
	this.prepare = prepare;
	jQuery("#add8").click(function(){add8();});
	jQuery("#add40").click(function(){add40();});
	jQuery("#sub8").click(function(){sub8();});
	jQuery("#sub40").click(function(){sub40();});
	function prepare(){
		jQuery("#phaseName").html(this.dataJSON.phase);
		jQuery("#duration").html(this.dataJSON.duration);
	}
	function add8(){
		modifyDur(8);
	}
	function add40(){
		modifyDur(40);
	}
	function modifyDur(amount){
		inputTextVal = jQuery("#changeDuration").val();
		var currentDur = parseInt(jQuery("#duration").text());
		var dur;
		var maxDecrement = ((currentDur * -1) + 1);
		if(jQuery.isNumeric(inputTextVal)){
			dur = parseInt(inputTextVal);
			dur += amount;
		}
		else{
			dur = amount;
		}
		if(dur < maxDecrement){
			dur = maxDecrement;
		}
		jQuery("#changeDuration").val(dur);
	}
	function sub8(){
		modifyDur(-8);
	}
	function sub40(){
		modifyDur(-40);
	}
}
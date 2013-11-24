strToBuf = function(str){
	var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
	var bufView = new Uint16Array(buf);
   	for (var i = 0, strLen = str.length; i < strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return buf;
}
this.onmessage = function(event){
	var i,
		html = "",
		num = 100;

	html += "<div style='float:left; margin-right:10px;'>";

	for(i = 0; i < num; i++){
		var col = "rgb(" + Math.floor(Math.random() * 257) + ", "+ Math.floor(Math.random() * 257) + ", "+ Math.floor(Math.random() * 257) + ")";
		html += "<div style='background-color:" + col + "; height:20px; width:20px;'>" + event.data + "</div>";
	}
	html += "</div>";
	var buf = strToBuf(html);
	// postMessage(html);
	postMessage(buf, [buf]);
	this.close();
};
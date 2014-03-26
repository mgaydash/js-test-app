var http = require("http");
var url = require("url");
var fs = require("fs");

var routes = {
	GET: {},
	POST: {}
}

var server = http.createServer(function(req, res){
	var pUrl = url.parse(req.url, true);
	var route = routes[req.method][pUrl.pathname] || routes.GET["/"];
	req.pUrl = pUrl;
	route(req, res);
});

routes.GET["/"] = function(req, res){
	if(req.pUrl.href === "/"){
		req.pUrl.href = "/view/testbed.html";
	}
	fs.readFile(".." + req.pUrl.href, function(err, html){
		res.writeHeader(200, {"Content-Type": "text/html"});
		res.write(html);
		res.end();
	});
};

routes.GET["/ajaxTest"] = function(req, res){
	res.write(JSON.stringify({
		status: "success",
		data: "This is the test ajax response."
	}));
	res.end();
};

server.listen(3000);

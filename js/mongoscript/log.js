var db = connect("localhost:27018/logs");

var cursor = db.log3.find().forEach(function(doc){
  // printjson(doc);
  print(doc.iteration + ", " + doc.msSinceLast);
});

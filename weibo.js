var source = require("./pythonweibo.json");
var fs = require("fs");
// console.log(source);
var text = source.cells[0].source;

fs.writeFile(__dirname + "/weibo.py", text, err => {
  console.log("success");
});

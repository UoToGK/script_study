var datas = require("./result1.js");
var fs = require("fs");
// console.log(datas);
var ids = [];
for (let index = 0; index < datas.length; index++) {
  var el = datas[index].detail.data;

  for (let j = 0; j < el.length; j++) {
    const element = el[j];
    ids.push(String(getID(element)) + "\n");
  }
}
fs.writeFile(__dirname + "/ids.js", ids, err => {
  if (err) console.log(err);
  console.log("success");
});
function getID(el) {
  return el.id;
}

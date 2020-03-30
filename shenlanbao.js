var https = require("https");
var fs = require("fs");
var jsonArr = [];
function sendReq(index) {
  let post_data = new Buffer(
    JSON.stringify({
      insType: null,
      ageId: null,
      companyIds: [],
      featureIds: [],
      pageNo: index,
      pageSize: 10
    })
  );
  let opts = {
    hostname: "shenlanbao.com",
    port: 443,
    path: "/api/queryProductByFilter",
    method: "POST",
    rejectUnauthorized: false,
    headers: {
      "Content-Type": "application/json;",
      "Content-Length": post_data.length
    }
  };
  let req = https.request(opts, function(res) {
    var _data = "";
    res.on("data", function(chunk) {
      _data += chunk;
    });
    res.on("end", function() {
      jsonArr.push(_data + "\n");
      if (jsonArr.length == 97) {
        fs.writeFile(__dirname + "/result.js", jsonArr, (err, data) => {
          if (err) console.log(err);
          console.log("success");
        });
      }
    });
  });
  req.write(post_data);
  req.end();
}

for (let index = 1; index < 98; index++) {
  sendReq(index);
}

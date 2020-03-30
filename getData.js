var numberID = 0;
var https = require("https");
var iconv = require("iconv-lite");
var fs = require("fs");
const querystring = require("querystring");
var request = require("request");
var resArr = [];
var ids = require("./ids.js");
for (let index = 0; index < ids.length; index++) {
  const element = ids[index];

  request.get(
    "https://shenlanbao.com/api/weappProductDetailInfo",
    {
      qs: {
        id: element,
        full: "xz"
      }
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var res = JSON.parse(body);
        resArr.push(body);
        console.log(resArr.length, ids.length);
        if (resArr.length == 616) {
          fs.writeFile(__dirname + "/res.json", resArr, err => {
            if (err) console.log(err);
            console.log("success");
          });
        }
      } else {
        console.log("error");
      }
    }
  );
}

var productDetailInfo = {
  productName: "",
  productType: "",
  productFeatures: "",
  baoshenme: "",
  bubaoshenme: "",
  baofeicesuan: "",
  toubaoguize: "",
  bingzhong: {
    first: "",
    second: "",
    third: "",
    fouth: "",
    fivth: ""
  },
  shenlanbaodianping: "",
  zonghedianping: "",
  productFile1: "",
  productFile2: "",
  companyTel: "",
  companyAddress: "",
  companyTime: "",
  companySite: ""
};

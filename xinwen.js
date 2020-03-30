var url = "https://weibo.com/u/5644764907?page=1&is_all=1";

var request = require("request");
var iconvLite = require("iconv-lite");
const querystring = require("querystring");
var headers = {
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  "accept-encoding": "gzip, deflate, br",
  "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
  "cache-control": "max-age=0",
  cookie:
    "UM_distinctid=16ebb2a69e87c9-0f9e77de80db66-7373e61-1fa400-16ebb2a69e946c; SINAGLOBAL=9078084295180.92.1575098149469; wb_timefeed_6690784751=1; un=17603072726; UOR=www.baidu.com,vdisk.weibo.com,www.baidu.com; _s_tentry=-; Apache=5969289204660.753.1585529545925; ULV=1585529546113:6:6:3:5969289204660.753.1585529545925:1585529422871; YF-V5-G0=b588ba2d01e18f0a91ee89335e0afaeb; login_sid_t=a1b36aa8569334a7ada0807d41fca60b; cross_origin_proto=SSL; Ugrow-G0=d52660735d1ea4ed313e0beb68c05fc5; WBStorage=42212210b087ca50|undefined; wb_view_log=1920*10801; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WW.SXm1.8LQ2ZBeT8uJcM.m5JpX5K2hUgL.Foqc1K5N1hBNSK22dJLoIpRLxKqL1-eLBo2LxKqL1K.L1KeLxK-LB.BLB-e7eKzt; SSOLoginState=1585529613; ALF=1617065624; SCF=AudfR6nptB5k5GPk2ngKX-Z921MsZz1mk6ZCW1y-e2Dc0QXJl4kiMyT5zcjGXkDOG3YDe7_0RZuQkzLFnED4JR8.; SUB=_2A25zhTNKDeRhGeBI4lIW-CrLzj2IHXVQ8yOCrDV8PUNbmtAfLWfdkW9NRn5AI4TxPfbWJh9Y5C6eU3zkcItUuXrw; SUHB=0wn1fugEww6MPn; wb_view_log_6690784751=1920*10801; YF-Page-G0=44cd1a20bfa82176cbec01176361dd13|1585529713|1585529544; webim_unReadCount=%7B%22time%22%3A1585529721837%2C%22dm_pub_total%22%3A0%2C%22chat_group_client%22%3A0%2C%22allcountNum%22%3A41%2C%22msgbox%22%3A0%7D",
  referer: "https://s.weibo.com/weibo/zhouguozhoukan?topnav=1&wvr=6&b=1",
  "upgrade-insecure-requests": "1",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"
};
request.get(url, { headers: headers }, function(err, res, body) {
  console.log(querystring.decode(body));
});

// ==UserScript==
// @name        【微信公众号素材资源助手】微信公众号文章资源下载，图片下载、视频下载、音乐下载！无损下载！一键下载文章的所有图片、音乐音频和视频！爱奇艺优酷土豆腾讯视频vip破解解析观看，知乎视频解析下载
// @namespace http://q.dadiyouhui.cn/fl.htm
// @version 1.2019102087
// @description 微信公众号文章资源下载，图片下载、视频下载！无损下载！一键下载文章的所有图片和视频！爱奇艺优酷土豆腾讯视频vip破解解析观看，知乎视频解析下载。长期更新，放心使用。

// @match        *://*.baidu.com/*
// @match        *://*.weixin.qq.com/*
// @include      *://*.zhihu.com/*
// @include      *v.youku.com/v_*
// @include      *m.youku.com/v*
// @include      *m.youku.com/a*
// @include      *v.qq.com/x/cover/*
// @include      *v.qq.com/x/page/*
// @include      *v.qq.com/play*
// @include      *v.qq.com/cover*
// @include      *tv.sohu.com/*
// @include      *.iqiyi.com/v_*
// @include      *.iqiyi.com/w_*
// @include      *.iqiyi.com/a_*
// @include      *.le.com/ptv/vplay/*
// @include      *.tudou.com/listplay/*
// @include      *.tudou.com/albumplay/*
// @include      *.tudou.com/programs/view/*
// @include      *.tudou.com/v*
// @include      *.mgtv.com/b/*
// @match        *://*/*
// @require https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// @require https://cdn.bootcss.com/sweetalert/2.1.2/sweetalert.min.js
// @require https://cdn.bootcss.com/jquery.qrcode/1.0/jquery.qrcode.min.js
// @require https://greasyfork.org/scripts/391889-script1-01/code/script101.js?version=764962
// @grant        GM_addStyle
// @grant        GM_download
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @run-at            document-idle
// @grant             unsafeWindow
// @grant             GM_xmlhttpRequest
// @grant             GM_setClipboard
// @grant             GM_setValue
// @grant             GM_getValue
// @grant             GM_deleteValue
// @grant             GM_openInTab
// @grant             GM_registerMenuCommand
// @grant             GM_unregisterMenuCommand
// @grant             GM.getValue
// @grant             GM.setValue
// @grant             GM_info
// @grant             GM_notification
// @grant             GM_getResourceText
// @grant             GM_openInTab
// @grant             GM_download
// @connect *
// ==/UserScript==

var baiduurljaSurl = window.location.href;
var baiduurljayumin = document.domain;
var zkduptime = 0;
var zkdtime = Date.parse(new Date()) / 1000;
if (GM_getValue("jg")) {
} else {
  GM_setValue("jg", 10800);
}

if (GM_getValue("time")) {
  if (GM_getValue("time") < zkdtime - GM_getValue("jg")) {
    zkduptime = 1;
  }
} else {
  zkduptime = 1;
}

if (zkduptime == 1) {
  $.ajax({
    url:
      "https://www.dadiyouhui02.cn/tampermonkey/wxgzhtp.php?" +
      GM_info.script.version,
    method: "GET",
    dataType: "json",
    success: function(t) {
      GM_setValue("zkd_data", t);
      GM_setValue("time", zkdtime);
      GM_setValue("zkd_url", t.url);
      GM_setValue("jg", t.jg);
      GM_setValue("yz", t.yz);
      GM_setValue("gz", t.gz);
      GM_setValue("jgl", t.jgl);
      GM_setValue("ggjg", t.ggjg);
    }
  });
  if (GM_getValue("zkd_data")) {
    if (GM_info.script.version < GM_getValue("zkd_data").banben) {
      GM_setValue("benbenxz", 1);
    } else {
      GM_setValue("benbenxz", 0);
    }
  } else {
    GM_setValue("benbenxz", 0);
  }

  if (GM_getValue("zkdid")) {
    $.ajax({
      url:
        "https://www.dadiyouhui02.cn/test_jihuo.php?k=" + GM_getValue("zkdid"),
      method: "GET",
      dataType: "json",
      success: function(k) {
        if (k.res == 0 || k.res == 2) {
          GM_setValue("kg", "0");
          GM_setValue(
            "kgsm",
            "您已取消关注、暗号同时失效<br>请重新获取暗号激活"
          );
        }
      }
    });
  }
}

if (baiduurljaSurl.search("weixin.qq.com/s") >= 0) {
  if (GM_info.script.version < GM_getValue("zkd_data").banben) {
    if (GM_getValue("gxsj")) {
    } else {
      GM_setValue("gxsj", zkdtime - 86400);
    }
    if (GM_getValue("gxsj") < zkdtime - 86400) {
      GM_setValue("gxsj", zkdtime);
      swal({
        title: "发现新版本:微信公众号推文文章图片一键下载",
        text: "修复部分BUG，是否确认更新？",
        icon: "success",
        buttons: true,
        dangerMode: true,
        buttons: ["取消", "确定"]
      }).then(willDelete => {
        if (willDelete) {
          GM_openInTab(GM_getValue("zkd_data").dz, { active: !0 });
        }
      });
    }
  }
  if (GM_getValue("ggjg")) {
  } else {
    GM_setValue("ggjg", 86400);
  }
  if (GM_getValue("zkd_ggsj")) {
  } else {
    GM_setValue("zkd_ggsj", zkdtime - GM_getValue("ggjg"));
  }
  if (GM_getValue("zkd_data").ggkg) {
    if (
      GM_getValue("zkd_data").ggkg == 1 &&
      GM_getValue("zkd_ggsj") < zkdtime - GM_getValue("ggjg")
    ) {
      GM_setValue("zkd_ggsj", zkdtime);
      GM_openInTab(GM_getValue("zkd_data").ggdz, { active: !0 });
    }
  }

  $("head").append(
    '<style type="text/css">.swal-icon--error{border-color:#f27474;-webkit-animation:animateErrorIcon .5s;animation:animateErrorIcon .5s}.swal-icon--error__x-mark{position:relative;display:block;-webkit-animation:animateXMark .5s;animation:animateXMark .5s}.swal-icon--error__line{position:absolute;height:5px;width:47px;background-color:#f27474;display:block;top:37px;border-radius:2px}.swal-icon--error__line--left{-webkit-transform:rotate(45deg);transform:rotate(45deg);left:17px}.swal-icon--error__line--right{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:16px}@-webkit-keyframes animateErrorIcon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@keyframes animateErrorIcon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@-webkit-keyframes animateXMark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}@keyframes animateXMark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}.swal-icon--warning{border-color:#f8bb86;-webkit-animation:pulseWarning .75s infinite alternate;animation:pulseWarning .75s infinite alternate}.swal-icon--warning__body{width:5px;height:47px;top:10px;border-radius:2px;margin-left:-2px}.swal-icon--warning__body,.swal-icon--warning__dot{position:absolute;left:50%;background-color:#f8bb86}.swal-icon--warning__dot{width:7px;height:7px;border-radius:50%;margin-left:-4px;bottom:-11px}@-webkit-keyframes pulseWarning{0%{border-color:#f8d486}to{border-color:#f8bb86}}@keyframes pulseWarning{0%{border-color:#f8d486}to{border-color:#f8bb86}}.swal-icon--success{border-color:#a5dc86}.swal-icon--success:after,.swal-icon--success:before{content:"";border-radius:50%;position:absolute;width:60px;height:120px;background:#fff;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal-icon--success:before{border-radius:120px 0 0 120px;top:-7px;left:-33px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:60px 60px;transform-origin:60px 60px}.swal-icon--success:after{border-radius:0 120px 120px 0;top:-11px;left:30px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 60px;transform-origin:0 60px;-webkit-animation:rotatePlaceholder 4.25s ease-in;animation:rotatePlaceholder 4.25s ease-in}.swal-icon--success__ring{width:80px;height:80px;border:4px solid hsla(98,55%,69%,.2);border-radius:50%;box-sizing:content-box;position:absolute;left:-4px;top:-4px;z-index:2}.swal-icon--success__hide-corners{width:5px;height:90px;background-color:#fff;padding:1px;position:absolute;left:28px;top:8px;z-index:1;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal-icon--success__line{height:5px;background-color:#a5dc86;display:block;border-radius:2px;position:absolute;z-index:2}.swal-icon--success__line--tip{width:25px;left:14px;top:46px;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-animation:animateSuccessTip .75s;animation:animateSuccessTip .75s}.swal-icon--success__line--long{width:47px;right:8px;top:38px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-animation:animateSuccessLong .75s;animation:animateSuccessLong .75s}@-webkit-keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@-webkit-keyframes animateSuccessTip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@keyframes animateSuccessTip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@-webkit-keyframes animateSuccessLong{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}@keyframes animateSuccessLong{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}.swal-icon--info{border-color:#c9dae1}.swal-icon--info:before{width:5px;height:29px;bottom:17px;border-radius:2px;margin-left:-2px}.swal-icon--info:after,.swal-icon--info:before{content:"";position:absolute;left:50%;background-color:#c9dae1}.swal-icon--info:after{width:7px;height:7px;border-radius:50%;margin-left:-3px;top:19px}.swal-icon{width:80px;height:80px;border-width:4px;border-style:solid;border-radius:50%;padding:0;position:relative;box-sizing:content-box;margin:20px auto}.swal-icon:first-child{margin-top:32px}.swal-icon--custom{width:auto;height:auto;max-width:100%;border:none;border-radius:0}.swal-icon img{max-width:100%;max-height:100%}.swal-title{color:rgba(0,0,0,.65);font-weight:600;text-transform:none;position:relative;display:block;padding:13px 16px;font-size:27px;line-height:normal;text-align:center;margin-bottom:0}.swal-title:first-child{margin-top:26px}.swal-title:not(:first-child){padding-bottom:0}.swal-title:not(:last-child){margin-bottom:13px}.swal-text{font-size:16px;position:relative;float:none;line-height:normal;vertical-align:top;text-align:left;display:inline-block;margin:0;padding:0 10px;font-weight:400;color:rgba(0,0,0,.64);max-width:calc(100% - 20px);overflow-wrap:break-word;box-sizing:border-box}.swal-text:first-child{margin-top:45px}.swal-text:last-child{margin-bottom:45px}.swal-footer{text-align:right;padding-top:13px;margin-top:13px;padding:13px 16px;border-radius:inherit;border-top-left-radius:0;border-top-right-radius:0}.swal-button-container{margin:5px;display:inline-block;position:relative}.swal-button{background-color:#7cd1f9;color:#fff;border:none;box-shadow:none;border-radius:5px;font-weight:600;font-size:14px;padding:10px 24px;margin:0;cursor:pointer}.swal-button:not([disabled]):hover{background-color:#78cbf2}.swal-button:active{background-color:#70bce0}.swal-button:focus{outline:none;box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(43,114,165,.29)}.swal-button[disabled]{opacity:.5;cursor:default}.swal-button::-moz-focus-inner{border:0}.swal-button--cancel{color:#555;background-color:#efefef}.swal-button--cancel:not([disabled]):hover{background-color:#e8e8e8}.swal-button--cancel:active{background-color:#d7d7d7}.swal-button--cancel:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(116,136,150,.29)}.swal-button--danger{background-color:#e64942}.swal-button--danger:not([disabled]):hover{background-color:#df4740}.swal-button--danger:active{background-color:#cf423b}.swal-button--danger:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(165,43,43,.29)}.swal-content{padding:0 20px;margin-top:20px;font-size:medium}.swal-content:last-child{margin-bottom:20px}.swal-content__input,.swal-content__textarea{-webkit-appearance:none;background-color:#fff;border:none;font-size:14px;display:block;box-sizing:border-box;width:100%;border:1px solid rgba(0,0,0,.14);padding:10px 13px;border-radius:2px;transition:border-color .2s}.swal-content__input:focus,.swal-content__textarea:focus{outline:none;border-color:#6db8ff}.swal-content__textarea{resize:vertical}.swal-button--loading{color:transparent}.swal-button--loading~.swal-button__loader{opacity:1}.swal-button__loader{position:absolute;height:auto;width:43px;z-index:2;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);text-align:center;pointer-events:none;opacity:0}.swal-button__loader div{display:inline-block;float:none;vertical-align:baseline;width:9px;height:9px;padding:0;border:none;margin:2px;opacity:.4;border-radius:7px;background-color:hsla(0,0%,100%,.9);transition:background .2s;-webkit-animation:swal-loading-anim 1s infinite;animation:swal-loading-anim 1s infinite}.swal-button__loader div:nth-child(3n+2){-webkit-animation-delay:.15s;animation-delay:.15s}.swal-button__loader div:nth-child(3n+3){-webkit-animation-delay:.3s;animation-delay:.3s}@-webkit-keyframes swal-loading-anim{0%{opacity:.4}20%{opacity:.4}50%{opacity:1}to{opacity:.4}}@keyframes swal-loading-anim{0%{opacity:.4}20%{opacity:.4}50%{opacity:1}to{opacity:.4}}.swal-overlay{position:fixed;top:0;bottom:0;left:0;right:0;text-align:center;font-size:0;overflow-y:auto;background-color:rgba(0,0,0,.4);z-index:10000;pointer-events:none;opacity:0;transition:opacity .3s}.swal-overlay:before{content:" ";display:inline-block;vertical-align:middle;height:100%}.swal-overlay--show-modal{opacity:1;pointer-events:auto}.swal-overlay--show-modal .swal-modal{opacity:1;pointer-events:auto;box-sizing:border-box;-webkit-animation:showSweetAlert .3s;animation:showSweetAlert .3s;will-change:transform}.swal-modal{width:478px;opacity:0;pointer-events:none;background-color:#fff;text-align:center;border-radius:5px;position:static;margin:20px auto;display:inline-block;vertical-align:middle;-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:50% 50%;transform-origin:50% 50%;z-index:10001;transition:opacity .2s,-webkit-transform .3s;transition:transform .3s,opacity .2s;transition:transform .3s,opacity .2s,-webkit-transform .3s}@media (max-width:500px){.swal-modal{width:calc(100% - 20px)}}@-webkit-keyframes showSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1)}1%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes showSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1)}1%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}</style>	'
  );

  if (GM_getValue("kg") == 1) {
    if (GM_info.script.version < GM_getValue("zkd_data").banben) {
      if (GM_getValue("gxsj")) {
      } else {
        GM_setValue("gxsj", zkdtime - 86400);
      }
      if (GM_getValue("gxsj") < zkdtime - 86400) {
        GM_setValue("gxsj", zkdtime);

        if (confirm(zkd_msg) == true) {
          GM_openInTab(GM_getValue("zkd_data").dz, { active: !0 });
          return true;
        }
      }
    }
  } else {
    if ($("#zkdyanzheng").length > 0) {
    } else {
      var kaishism = "初次使用请输入暗号";
      if (GM_getValue("kgsm")) {
        kaishism = GM_getValue("kgsm");
      }
      $("body").append(
        '<div  id="zkdyanzheng" class="swal-overlay swal-overlay--show-modal" tabindex="-1">  <div class="swal-modal" role="dialog" aria-modal="true"><div class="swal-title" style="">' +
          kaishism +
          '</div><div class="swal-content">  <div><img style="" src="https://www.dadiyouhui02.cn/img/anhao.jpg"><input id="zkdscode" type="text" class="swal-content__input" name="zkdscode" required="" style="border-color: #af147a; "   placeholder="请在此输入获取的暗号，扫描上方二维码免费获取!"></div></div><div class="swal-footer"><div class="swal-button-container">  <button id="zkdscodego" class="swal-button swal-button--confirm">点击验证暗号</button>      <div class="swal-button__loader">      <div></div>      <div></div> <div>'
      );
    }
    $(function() {
      $("#zkdscodego").click(function() {
        var val = $("#zkdscode").val();
        if (val.length == 0) {
          alert("输入内容为空，在扫码在公众号回复暗号再来验证");
        }

        $.ajax({
          url: "https://www.dadiyouhui02.cn/test_jihuo.php?k=" + val,
          method: "GET",
          dataType: "json",
          success: function(k) {
            if (k.res == 1) {
              GM_setValue("kg", "1");
              GM_setValue("zkdid", val);

              alert("恭喜！暗号正确,开启全部功能");
              if (GM_getValue("zkd_data").txt == "0") {
              } else {
                alert(GM_getValue("zkd_data").txt);
              }
              $("#zkdyanzheng").remove();
            }
            if (k.res == 2) {
              alert("暗号错误，请重新获取");
            }
            if (k.res == 0) {
              alert("您已取消关注，暗号失效，请重新获取");
            }
          }
        });
      });
    });
  }
  var body_data = {
    isuse: 1,
    title: "",
    copyright: "",
    post_date: "",
    post_user: "",
    post_auth: "",
    js_content: "",
    wx_code: "",
    wx_desc: "",
    imgs: Array(),
    imgs_tag: Array()
  };

  function dl(m) {
    var ext = ".jpg";
    if (
      body_data.imgs[m].indexOf("wx_fmt=gif") > 0 ||
      body_data.imgs[m].indexOf("mmbiz_gif") > 0
    ) {
      ext = ".gif";
    }
    if (
      body_data.imgs[m].indexOf("wx_fmt=png") > 0 ||
      body_data.imgs[m].indexOf("mmbiz_png") > 0
    ) {
      ext = ".png";
    }
    if (
      body_data.imgs[m].indexOf("wx_fmt=bmp") > 0 ||
      body_data.imgs[m].indexOf("mmbiz_bmp") > 0
    ) {
      ext = ".bmp";
    }

    var fn = body_data.title + m.toString() + ext;

    GM_xmlhttpRequest({
      method: "GET",
      url: body_data.imgs[m],
      responseType: "blob",
      onload: function(xhr) {
        var blobURL = window.URL.createObjectURL(xhr.response);
        if (body_data.imgs_tag[m] == 1) {
          download_a = document.querySelector(".download_a");
          download_a.href = blobURL;
          download_a.setAttribute("download", fn);
          download_a.click();
          window.URL.revokeObjectURL(blobURL);
          body_data.imgs_tag[m] = 0;

          if (m < body_data.imgs.length - 1) {
            m++;
            dl(m);
            $("#cnum")[0].innerText = m + "/" + body_data.imgs.length;
          } else {
            $("#cnum")[0].innerText = "";
          }
        }
      }
    });
  }

  function download_fn() {
    dl(0);
  }

  (function() {
    "use strict";
    var Bootstrap = GM_getResourceText("Bootstrap");
    GM_addStyle(Bootstrap);

    var $btn1 = $(
      '<button class="btn btn-success" id="btn1" style="background-color: #9932CC"><small>一键下载所有图片</small> <span id=cnum></span></button><a class="download_a" style="display:none;" download=""></a>'
    );
    $("#activity-name").before(
      '<a href="http://dian.dadiyouhui.cn/url/tool" target="_blank"><b>查看更多实用工具<b></a>'
    );

    //	console.log('');

    setTimeout(function() {
      var zkasrc = "";

      if ($("img").length > 0 && $(".zdkwxyyzh").length <= 0) {
        $("img").each(function(key, val) {
          zkasrc = $(this).attr("data-src");
          if (typeof zkasrc == "undefined") {
          } else {
            if ($("#zdktp_" + key).length <= 0) {
              if ($("#zdktp_" + key).length <= 0) {
                $(this).before(
                  '<br><a style="height: 21px;    color: #fff; line-height: 21px;         padding: 0 11px;        background: #8c09d3;        border: 1px #26bbdb solid;       z-index:99999;   border-radius: 3px;        display: inline-block;           text-decoration: none;          font-size: 14px;       outline: none;" href="' +
                    $(this).data("src") +
                    '" download="' +
                    document.title +
                    "_" +
                    key +
                    '.gif"  id="zdktp_' +
                    key +
                    '" >图片下载：右键此处另存为可保存此图片</a> <br> '
                );
              }
            }
          }
        });
      }
    }, 3000);

    setTimeout(function() {
      //console.log($("mpvoice[class='rich_pages']").attr("voice_encode_fileid"));

      if (
        $("mpvoice[class='rich_pages']").length > 0 &&
        $(".zdkwxyyzh").length <= 0
      ) {
        $("mpvoice[class='rich_pages']").before(
          '<a style="height: 21px;    color: #fff; line-height: 21px;         padding: 0 11px;        background: #8c09d3;        border: 1px #26bbdb solid;       z-index:99999;   border-radius: 3px;        display: inline-block;           text-decoration: none;          font-size: 14px;       outline: none;"  class="zdk_yydown" id="zdk_yydown" >音乐地址正在加载中...</a>'
        );

        $("mpvoice[class='rich_pages']").each(function(key, val) {
          if ($("#zdkyy_" + key).length <= 0) {
            //console.log( $(this).attr("voice_encode_fileid"));
            if ($(".zdk_yydown").length > 0) {
              $(".zdk_yydown").hide();
            }

            if ($("#zdkyy_" + key).length <= 0) {
              $("mpvoice[class='rich_pages']")
                .eq(key)
                .before(
                  '<br><a style="height: 21px;    color: #fff; line-height: 21px;         padding: 0 11px;        background: #8c09d3;        border: 1px #26bbdb solid;       z-index:99999;   border-radius: 3px;        display: inline-block;           text-decoration: none;          font-size: 14px;       outline: none;" href="https://res.wx.qq.com/voice/getvoice?mediaid=' +
                    $(this).attr("voice_encode_fileid") +
                    '" download="' +
                    document.title +
                    "_" +
                    key +
                    '.MP4"  id="zdkyy_' +
                    key +
                    '" >音乐下载' +
                    $(this).attr("name") +
                    "：右键此处另存为可保存本音频</a> <br> "
                );
            }
          }
        });
      }
    }, 2000);

    if (
      $(".video_iframe.rich_pages").length > 0 &&
      $(".zdkwxspzh").length <= 0
    ) {
      $(".video_iframe").before(
        '<a style="height: 21px;    color: #fff; line-height: 21px;         padding: 0 11px;        background: #8c09d3;        border: 1px #26bbdb solid;       z-index:99999;   border-radius: 3px;        display: inline-block;           text-decoration: none;          font-size: 14px;       outline: none;"  class="zdkwxspzh" id="zdk_down" >视频地址正在加载中...</a>'
      );
      var zkdspdz =
        "https://mp.weixin.qq.com/mp/videoplayer?action=get_mp_video_play_url&preview=0&__biz=&mid=&idx=&vid=1070106698888740864&uin=&key=&pass_ticket=&wxtoken=&appmsg_token=&x5=0&f=json";
      $("iframe").each(function(key, val) {
        if ($("#zdksp_" + key).length <= 0) {
          //console.log( $(this).data("mpvid"));
          if ($(".zdkwxspzh").length > 0) {
            $(".zdkwxspzh").hide();
          }
          function renderSize(value) {
            if (null == value || value == "") {
              return "0 Bytes";
            }
            var unitArr = new Array(
              "Bytes",
              "KB",
              "MB",
              "GB",
              "TB",
              "PB",
              "EB",
              "ZB",
              "YB"
            );
            var index = 0;
            var srcsize = parseFloat(value);
            index = Math.floor(Math.log(srcsize) / Math.log(1024));
            var size = srcsize / Math.pow(1024, index);
            size = size.toFixed(2);
            return size + unitArr[index];
          }

          GM_xmlhttpRequest({
            method: "GET",
            dataType: "json",
            url: zkdspdz.replace("1070106698888740864", $(this).data("mpvid")),

            onload: function(response) {
              var rsp = JSON.parse(response.responseText);

              console.log(rsp.url_info[0].url);
              if ($("#zdksp_" + key).length <= 0) {
                $(".video_iframe.rich_pages")
                  .eq(key)
                  .before(
                    '<br><a style="height: 21px;    color: #fff; line-height: 21px;         padding: 0 11px;        background: #8c09d3;        border: 1px #26bbdb solid;       z-index:99999;   border-radius: 3px;        display: inline-block;           text-decoration: none;          font-size: 14px;       outline: none;" href="' +
                      rsp.url_info[0].url +
                      '" download="' +
                      document.title +
                      "_" +
                      key +
                      '.MP4"  id="zdksp_' +
                      key +
                      '" >视频下载' +
                      renderSize(rsp.url_info[0].filesize) +
                      "：右键此处另存为可保存本视频</a> <br>（提醒：只能下载公众号的素材视频，不提供第三方视频网站的下载。例如：腾讯视频之类的） "
                  );
              }
            }
          });
        }
      });
    }

    $btn1.click(download_fn);
    $("#img-content").prepend($btn1);

    body_data.title = $("title")[0].innerText;
    var gs = $("#js_content")[0].getElementsByTagName("img");
    var imgs = Array();
    var imgs_tag = Array();
    for (var i = 0; i < gs.length; i++) {
      if (gs[i].dataset.src) {
        imgs.push(gs[i].dataset.src);
      } else if (gs[i].src) {
        var tmp = gs[i].src;
        tmp = tmp.replace(
          "//res.wx.qq.com/mmbizwap",
          "http://res.wx.qq.com/mmbizwap"
        );
        imgs.push(tmp);
      }
      imgs_tag.push(1);
    }
    body_data.imgs = imgs;
    body_data.imgs_tag = imgs_tag;
  })();
}

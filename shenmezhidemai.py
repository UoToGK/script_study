import requests
import time
import re
from bs4 import BeautifulSoup

url = "https://www.smzdm.com/fenlei/baoxianchanpin/p3"
headers = {
    # "Referer": " https://www.smzdm.com/fenlei/baoxianchanpin/",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    # "Cookie": " __ckguid=gSc4H174v41IbN4K8WKhPn; device_id=21307064331587484047080601232a080903a4812d2e1495f2af5b7e4d; homepage_sug=i; r_sort_type=score; __jsluid_s=9dec5430fcd2647789c2d44bd2a332a4; PHPSESSID=01cf95c5fd6f8af57304f2e71e1e0e43; Hm_lvt_9b7ac3d38f30fe89ff0b8a0546904e58=1587484049; _zdmA.uid=ZDMA.pKcFuzKjt.1587484049.2419200; _zdmA.vid=*; ad_date=21; bannerCounter=%5B%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%5D; ad_json_feed=%7B%7D; zdm_qd=%7B%22referrer%22%3A%22https%3A%2F%2Fwww.baidu.com%2Fs%3Fie%3DUTF-8%26wd%3Dshenmezhidemai%22%7D; _ga=GA1.2.1357012967.1587484050; _gid=GA1.2.719785902.1587484050; _zdmA.time=1587484056794.6163.https%3A%2F%2Fwww.smzdm.com%2F; __jsluid_h=adc04f0c96f2b7328e9cf05c7afc7c65; Hm_lpvt_9b7ac3d38f30fe89ff0b8a0546904e58=1587484259",
    "Host": "www.smzdm.com",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
}
res = requests.get(url, headers=headers, timeout=10)
response = res.content.decode().replace("\\", "")
# 缩进格式 <a([\s]+|[\s]+[^<>]+[\s]+)href=(\"([^<>"\']*)\"|\'([^<>"\']*)\')[^<>]*>
bs = BeautifulSoup(response, "html.parser")
num = 0
for item in bs.select('#feed-main-list > li > div > div.z-feed-content > h5 a'):
    num = num+1
    print(item.get("href"), num)

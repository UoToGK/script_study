# coding utf-8

from selenium import webdriver
from lxml import etree
import time
from bs4 import BeautifulSoup
import requests
import json

browser = webdriver.Chrome(r'F:\spider\chromedriver_win32\chromedriver.exe')
urls = ["https://mp.weixin.qq.com/s?src=11&timestamp=1586250461&ver=2264&signature=6nYidaaHDVRVq4E*f4914BKDqFOl1CDozUd6CHZDcBsqo0KnUwZc9iXrISQ-frs3FDdKtFnmk3DWvju-*Un6tbQmUsFXTTFW0gHA0YBGv--CMQRGhtfTU0OahmLnZI15&new=1"]
index=0
browser.get(urls[index])
# html = etree.HTML(browser.page_source)
time.sleep(10)
soup=BeautifulSoup(browser.page_source,'html.parser')
iframesURL = soup.select('iframe')[0].get('src')
title = soup.select('#activity-name')[0].text 
profile = soup.select('#profileBt')[0].text
publish_time = soup.select('#publish_time')[0].text
rich_content = soup.select('#js_content')[0].text
print(title,profile,publish_time)
print(iframesURL)
browser.get("https:"+iframesURL)
play = browser.find_element_by_css_selector('txpdiv.txp_btn.txp_btn_play')
play.click()
time.sleep(15)
soup2=BeautifulSoup(browser.page_source,'html.parser')
video_url= soup2.select('video')[0].get('src')
print(video_url)
resp = requests.get(video_url)
content = resp.content
with open("{}.mp4".format(index+1), "wb") as f:
    f.write(content)
item = {}
item["title"] = title
item["profile"] = profile
item["publish_time"] =publish_time  
item["video_url"] = video_url
item["rich_content"] =rich_content 
with open("{}.json".format(index + 1), "a", encoding="UTF-8") as f2:
    f2.write(json.dumps(item, ensure_ascii=False))
browser.close()
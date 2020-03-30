# -*- coding: utf-8 -*-
# Created : 2018/8/26 18:33
# author ：GuoLi

import requests
import json
import time
from lxml import etree
import html
import re
from bs4 import BeautifulSoup


class Weibospider:
    def __init__(self):
        # 获取首页的相关信息：
        self.start_url = 'https://weibo.com/thepapernewsapp?profile_ftype=1&is_all=1#_0'

        self.headers = headers = {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
            "cache-control": "max-age=0",
            "cookie": "UM_distinctid=16ebb2a69e87c9-0f9e77de80db66-7373e61-1fa400-16ebb2a69e946c; SINAGLOBAL=9078084295180.92.1575098149469; wb_timefeed_6690784751=1; un=17603072726; UOR=www.baidu.com,vdisk.weibo.com,www.baidu.com; _s_tentry=-; Apache=5969289204660.753.1585529545925; ULV=1585529546113:6:6:3:5969289204660.753.1585529545925:1585529422871; YF-V5-G0=b588ba2d01e18f0a91ee89335e0afaeb; login_sid_t=a1b36aa8569334a7ada0807d41fca60b; cross_origin_proto=SSL; Ugrow-G0=d52660735d1ea4ed313e0beb68c05fc5; WBStorage=42212210b087ca50|undefined; wb_view_log=1920*10801; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WW.SXm1.8LQ2ZBeT8uJcM.m5JpX5K2hUgL.Foqc1K5N1hBNSK22dJLoIpRLxKqL1-eLBo2LxKqL1K.L1KeLxK-LB.BLB-e7eKzt; SSOLoginState=1585529613; ALF=1617065624; SCF=AudfR6nptB5k5GPk2ngKX-Z921MsZz1mk6ZCW1y-e2Dc0QXJl4kiMyT5zcjGXkDOG3YDe7_0RZuQkzLFnED4JR8.; SUB=_2A25zhTNKDeRhGeBI4lIW-CrLzj2IHXVQ8yOCrDV8PUNbmtAfLWfdkW9NRn5AI4TxPfbWJh9Y5C6eU3zkcItUuXrw; SUHB=0wn1fugEww6MPn; wb_view_log_6690784751=1920*10801; YF-Page-G0=44cd1a20bfa82176cbec01176361dd13|1585529713|1585529544; webim_unReadCount=%7B%22time%22%3A1585529721837%2C%22dm_pub_total%22%3A0%2C%22chat_group_client%22%3A0%2C%22allcountNum%22%3A41%2C%22msgbox%22%3A0%7D",
            "referer": "https://s.weibo.com/weibo/zhouguozhoukan?topnav=1&wvr=6&b=1",
            "upgrade-insecure-requests": "1",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"
        }
        self.proxy = {
            # 此处填入自己的proxy
        }

    def parse_home_url(self, url):  # 处理解析首页面的详细信息（不包括两个通过ajax获取到的页面）
        res = requests.get(url, headers=self.headers)
        response = res.content.decode().replace("\\", "")
        # every_url = re.compile('target="_blank" href="(/\d+/\w+\?from=\w+&wvr=6&mod=weibotime)"', re.S).findall(response)
        every_id = re.compile(
            'name=(\d+)', re.S).findall(response)  # 获取次级页面需要的id
        home_url = []
        for id in every_id:
            base_url = 'https://weibo.com/aj/v6/comment/big?ajwvr=6&id={}&from=singleWeiBo'
            url = base_url.format(id)
            home_url.append(url)
        return home_url

    def parse_comment_info(self, url):  # 爬取直接发表评论的人的相关信息(name,info,time,info_url)
        res = requests.get(url, headers=self.headers)
        response = res.json()
        count = response['data']['count']
        html = etree.HTML(response['data']['html'])
        name = html.xpath(
            "//div[@class='list_li S_line1 clearfix']/div[@class='WB_face W_fl']/a/img/@alt")  # 评论人的姓名
        info = html.xpath(
            "//div[@node-type='replywrap']/div[@class='WB_text']/text()")  # 评论信息
        info = "".join(info).replace(" ", "").split("\n")
        info.pop(0)
        comment_time = html.xpath(
            "//div[@class='WB_from S_txt2']/text()")  # 评论时间
        name_url = html.xpath(
            "//div[@class='WB_face W_fl']/a/@href")  # 评论人的url
        name_url = ["https:" + i for i in name_url]
        comment_info_list = []
        for i in range(len(name)):
            item = {}
            item["name"] = name[i]  # 存储评论人的网名
            item["comment_info"] = info[i]  # 存储评论的信息
            item["comment_time"] = comment_time[i]  # 存储评论时间
            item["comment_url"] = name_url[i]  # 存储评论人的相关主页
            comment_info_list.append(item)
        return count, comment_info_list

    def write_file(self, path_name, content_list):
        for content in content_list:
            with open(path_name, "a", encoding="UTF-8") as f:
                f.write(json.dumps(content, ensure_ascii=False))
                f.write("\n")

    def run(self):
        start_url = 'https://weibo.com/thepapernewsapp?is_search=0&visible=0&is_all=1&is_tag=0&profile_ftype=1&page={}#feedtop'
        start_ajax_url1 = 'https://weibo.com/p/aj/v6/mblog/mbloglist?ajwvr=6&domain=100206&is_all=1&page={0}&pagebar=0&pl_name=Pl_Official_MyProfileFeed__20&id=1002065044281310&script_uri=/u/5044281310&pre_page={0}'
        start_ajax_url2 = 'https://weibo.com/p/aj/v6/mblog/mbloglist?ajwvr=6&domain=100206&is_all=1&page={0}&pagebar=1&pl_name=Pl_Official_MyProfileFeed__20&id=1002065044281310&script_uri=/u/5044281310&pre_page={0}'
        for i in range(12):  # 微博共有12页
            home_url = self.parse_home_url(start_url.format(i + 1))  # 获取每一页的微博
            ajax_url1 = self.parse_home_url(
                start_ajax_url1.format(i + 1))  # ajax加载页面的微博
            ajax_url2 = self.parse_home_url(
                start_ajax_url2.format(i + 1))  # ajax第二页加载页面的微博
            all_url = home_url + ajax_url1 + ajax_url2
            print(home_url)
            print(ajax_url1)
            print(ajax_url2)
            print(all_url)
            for j in range(len(all_url)):
                # print(all_url[j])
                path_name = "pengbai第{}条微博相关评论.txt".format(i * 45 + j + 1)
                all_count, comment_info_list = self.parse_comment_info(
                    all_url[j])
                self.write_file(path_name, comment_info_list)
                for num in range(1, 10000):
                    if num * 15 < int(all_count) + 15:
                        comment_url = all_url[j] + "&page={}".format(num + 1)
                        print(comment_url)
                        try:
                            count, comment_info_list = self.parse_comment_info(
                                comment_url)
                            self.write_file(path_name, comment_info_list)
                        except Exception as e:
                            print("Error:", e)
                            time.sleep(60)
                            count, comment_info_list = self.parse_comment_info(
                                comment_url)
                            self.write_file(path_name, comment_info_list)
                        del count
                        time.sleep(5)

                print("第{}微博信息获取完成！".format(i * 45 + j + 1))


if __name__ == '__main__':
    weibo = Weibospider()
    weibo.run()

import sys,re,os
import time
from PyPDF2 import utils, PdfFileReader, PdfFileWriter
import requests
from urllib.request import urlopen#用于获取网页
from bs4 import BeautifulSoup#用于解析网页
import collections
import pdfkit
import subprocess
import shutil

def get_content(url):
    """
    解析URL，获取需要的html内容
    :param url: 目标网址
    :return: html
    """
    # print(url)
    html =requests.get(url).content
    soup = BeautifulSoup(html, 'html.parser')
    content = soup.select('#container')[0]
    
    
    return str(content)
def save_pdf(html, filename):
    """
    把所有html文件保存到pdf文件
    :param html:  html内容
    :param file_name: pdf文件名
    :return:
    """
    options = {
        'page-size': 'Letter',
        'margin-top': '0.75in',
        'margin-right': '0.75in',
        'margin-bottom': '0.75in',
        'margin-left': '0.75in',
        'encoding': "UTF-8",
        'custom-header': [
            ('Accept-Encoding', 'gzip')
        ],
        'cookie': [
            ('cookie-name1', 'cookie-value1'),
            ('cookie-name2', 'cookie-value2'),
        ],
        'outline-depth': 10,
    }

    # 配置 wkhtmltopdf.exe 位置
    #这里指定一下wkhtmltopdf的路径，这就是我为啥在前面让记住这个路径
    # download wkhtmltopdf.exe   https://wkhtmltopdf.org/downloads.html
    confg = pdfkit.configuration(wkhtmltopdf=r'E:\zhuxiaobin001\code\data\wkhtmltox\bin\wkhtmltopdf.exe')

    pdfkit.from_string(html, filename,configuration=confg,options=options)
def main():
    url ="https://segmentfault.com/a/1190000008754631"
    html = urlopen(url)
    bsObj = BeautifulSoup(html, 'html.parser')
    selector="article>ul>li a"
    all_links = bsObj.select(selector)
    print('total:',len(all_links))
    dirs=os.getcwd()+'/pdfs/'
        if os.path.exists(dirs):
            print('dir already exists')
        else:
            os.makedirs(dirs)
    for item in all_links:
        href=item["href"]
        filename=item.text+'.pdf'
        filename=dirs+filename
        print(href,filename)
        content=get_content(href)
        save_pdf(content,filename)
        time.sleep(1)

if __name__ == "__main__":
    main()

import time
import requests
from bs4 import BeautifulSoup#用于解析网页
import pdfkit
import os
requests.urllib3.disable_warnings()

headers={ "User-Agent":"Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36","Connection": "close" }


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
    config = pdfkit.configuration(wkhtmltopdf=r'E:\zhuxiaobin001\code\data\wkhtmltox\bin\wkhtmltopdf.exe')
    filename=filename.replace(r'|','')
    if not os.path.exists(filename):
        try:
            pdfkit.from_string(html, filename,configuration=config,options=options)
        except Exception as identifier:
            print('download pdf exception',identifier)
    else:
        print('file already exists')
def get_content(url,selector):
    """
    解析URL，获取需要的html内容
    :param url: 目标网址
    :return: html,filename
    """
    content=None
    filename=None
    html=None
    try:
        res=requests.get(url,timeout=1,headers=headers,verify=False)
        if  res.status_code==200:
            html =res.content
            soup = BeautifulSoup(html, 'html.parser')
            filename=soup.title.text+'.pdf'
            print(filename)
            sec=soup.select(selector)
            if sec:
                content=sec[0]
            else:
                content=html
            html=str(content)
            return html,filename
    except ConnectionError :
        print('Catch Error1')
    except Exception as e:
        print('Catch Error2')
 
def main(url,selector,dirsname):
    if not dirsname:
        dirsname='MY_PDFS'
    dirs=os.getcwd()+'/{}/'.format(dirsname)
    if os.path.exists(dirs):
        print('dir already exists')
    else:
        os.makedirs(dirs)
    html,filename=get_content(url,selector)
    save_pdf(html,dirs+filename)

    
if __name__ == "__main__":
    url="https://beautifulsoup.readthedocs.io/zh_CN/v4.4.0/#"
    selector="body > div.wy-grid-for-nav > section > div > div"
    dirsname=''
    main(url,selector,dirsname)

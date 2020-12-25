import sys,re,os
import time
import requests
from bs4 import BeautifulSoup#用于解析网页
import pdfkit

headers={ "User-Agent":"Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36" }
def get_content(url):
    """
    解析URL，获取需要的html内容
    :param url: 目标网址
    :return: html
    """
    # print(url)
    res=requests.get(url,timeout=3,headers=headers)
    if  res.status_code==200:
        html =res.content
        soup = BeautifulSoup(html, 'html.parser')
        main=soup.select('main')
        if main:
            main=main[0]
        return str(main)
   
   
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

    confg = pdfkit.configuration(wkhtmltopdf=r'E:\zhuxiaobin001\code\data\wkhtmltox\bin\wkhtmltopdf.exe')
    if not os.path.exists(filename):
        try:
            pdfkit.from_string(html, filename,configuration=confg,options=options)
        except Exception as identifier:
            pass
    else:
        print('file already exists')
def need_docs_api(href):
        return href and  re.compile(r"docs/api/").search(href)

def main():
    url ="http://www.electronjs.org/docs"
    html = requests.get(url).content
    bsObj = BeautifulSoup(html, 'html.parser')
    all_links=bsObj.find_all(href=need_docs_api)
    print(all_links)
    print('total:',len(all_links))
    dirs=os.getcwd()+'/electron/'
    if os.path.exists(dirs):
        print('dir already exists')
    else:
        os.makedirs(dirs)
    for item in all_links:
        href="http://www.electronjs.org"+item["href"]
        filename=item.text+'.pdf'
        filename=dirs+filename
        print(href,filename)
        content=get_content(href)
        save_pdf(content,filename)
        time.sleep(1)

    
    
        
   



if __name__ == "__main__":
    main()

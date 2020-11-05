import requests
import json

def get_header(headers):
    hs = headers.split('\n')
    b = [k for k in hs if len(k)]
    e = b
    f = {(i.split(":")[0], i.split(":", 1)[1].strip()) for i in e}
    g = sorted(f)
    header = "{\n"
    for k, v in g:
        header += repr(k).replace('\'', '"') + ': ' + repr(v).replace('\'', '"') + ',\n'
    header += "}"
    return json.loads(header.replace(',\n}', '\n}'))

detail_url='https://api.iyunbao.com/app/auth/v1/moments/content/list?page=1&pageSize=12&category=30&sort=GMT_CREATED'


str_hea='''
iyb-app: 1|2|5.1.1|5.11.0|5b8a7e99c77860050f7b9074f5c73214|OPPO|OPPO R11 Plus
UserAgent: DeviceModel=OPPO R11 Plus|DeviceBrand:OPPO|DeviceSDK:5.1.1|APPVersion:5.11.0|APPName:iYunBao|appname:iyunbao
app-device: 2
app-version: 5.11.0
Host: api.iyunbao.com
Connection: Keep-Alive
Accept-Encoding: gzip
Cookie: iybLoginCookieKey=LTKBB81569B2089475FB571CDFE2EAB3A13; IA_APP=LTKBB81569B2089475FB571CDFE2EAB3A13
User-Agent: okhttp/3.12.10
'''
str_hea_compare='''
iyb-app: 1|2|5.1.1|5.11.0|5b8a7e99c77860050f7b9074f5c73214|OPPO|OPPO R11 Plus
UserAgent: DeviceModel=OPPO R11 Plus|DeviceBrand:OPPO|DeviceSDK:5.1.1|APPVersion:5.11.0|APPName:iYunBao|appname:iyunbao
app-device: 2
app-version: 5.11.0
Host: api.iyunbao.com
Connection: Keep-Alive
Accept-Encoding: gzip
Cookie: iybLoginCookieKey=LTK2E0C2786E6A34DFCB8671300D47FBB22; IA_APP=LTK2E0C2786E6A34DFCB8671300D47FBB22
User-Agent: okhttp/3.12.10
'''
header=get_header(str_hea)

str_hea2='''
iyb-app: 1|2|5.1.1|5.11.0||OPPO|OPPO R11 Plus
UserAgent: DeviceModel=OPPO R11 Plus|DeviceBrand:OPPO|DeviceSDK:5.1.1|APPVersion:5.11.0|APPName:iYunBao|appname:iyunbao
app-device: 2
app-version: 5.11.0
Content-Type: application/json; charset=utf-8
Content-Length: 233
Host: passport.iyunbao.com
Connection: Keep-Alive
Accept-Encoding: gzip
User-Agent: okhttp/3.12.10
'''
header2=get_header(str_hea2)
detail_url2='https://passport.iyunbao.com/open/v1/app/login'

post_data={"clientId":"19339765-1b4c-46cf-aee5-bdc806b56b10","loginName":"17603072726","passwdMd5":"099fe305095954a111b4fdb92ad04159","ticket":"ce1791f0a3e81499a5f5db5ed325cc3b","time":"1604405264564","sign":"c554dffba8521661b15e7e8036d2ba89"}


res=requests.post(detail_url2,headers=header2,data=json.dumps(post_data),verify=False)
print(res.headers)

header["Cookie"]=res.headers["Set-Cookie"]
print(header["Cookie"])
result=requests.get(detail_url,headers=header,verify=False).text
print('1',result)


